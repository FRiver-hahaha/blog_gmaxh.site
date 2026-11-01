---
title: MIT 6.S081——syscall
date: 2026-10-30 19:26:09
categories:
    - Linux
    - MIT 6.S081
tags:
    - Linux
    - MIT 6.S081
---

## 前言

最近一直非常忙，但细数过来，其实也是自找的。先是和自己专业的两个好兄弟报名了中国电子杯，参加的是赛题四，关于服务器调优的。也是第一次接手由企业下发的云服务器，并且操作系统就是linux。由于自己就在linux兴趣小组，自然也扮演起了调优的执行者的角色。之后还报名了oceanbase数据库大赛，起初只是想以赛促学，让自己学一点数据库的知识，但发现也是在比比谁家的agent能力强，只是想不拖队友后腿就行，让我的agent继续跑着(甚至在我写博客的时候，Qoder CN就在跑)。还打算参加华为ICT大赛，昇腾AI算子赛道，但是由于自己的疏忽，没报上名，非常对不起我的两个好兄弟。除去大大小小的比赛，还有12月的四级考试，期末考试。现在想想确实是自己想学的太多，但无从下手。于是今天开始打算逐步攻破MIT 6.S081的各项lab。先从syscall开始。

前置知识：默认读者了解一个系统调用真实的代码流程、位图、进程、寄存器，xv6。

## 追踪一个系统调用

系统调用其实是一个老生常谈的词，用户态陷入内核态，内核态处理请求，内核态再返回用户态。但具体的流程是什么样的？也就是本次的lab：实现一个系统调用——trace，来追踪系统调用的过程。

任务要求是：实现trace系统调用函数，接受mask参数，返回是否成功。

mask:为位图。每个系统调用在定义的时候有自己的编号，然后通过位运算(1 << SYS_)来设置mask的位，比如1 << SYS_fork，就把fork这个系统调用参数，作为这次trace调用的参数。

而本次lab主要是在xv6操作系统上修改系统级源码，因此要想实现trace()，主要就在user和kernel两个文件夹内进行修改。

### 前置设置

1. 在user/user.h中声明trace函数：
```
int trace(int);
```

2. 在user/usys.pl中设置：
```
entry("trace");
```

.pl是什么：perl脚本，在make调用的时候，通过entry向.S文件输出汇编代码。作为汇编源文件参与汇编过程。

3. 在kernel/syscall.h中定义：
```
#define SYS_trace 22
```

4. 在kernel/syscall.c中设置：
```
extern uint64 sys_trace(void);

static uint64 (*syscalls[])(void) = {
  ...
  [SYS_trace] sys_trace,
};

static char *syscall_names[] = {
  ...
  [SYS_trace] "trace",
};
```

这是一个函数指针数组，前面的[]用来表示系统调用号，后面的函数指针为对应系统调用号的系统调用函数。这两个数组由syscall()实现。

5. 在kernel/proc.h内设置：
```
struct proc {
  ...
  int tracemask;   // 每个进程自己的跟踪掩码
};
```

### 完成流程

0. 在操作系统中通过终端输入命令，调用trace，并且带有trace参数，如32。
```
trace 32 grep hello README
```

1. 在user/trace.c中：
```
int mask = atoi(argv[1]);
trace(mask);                
```
执行trace()函数。

2. 在usys.S中：
```
trace:
 li a7, SYS_trace     # a7 = 22
 ecall                # 陷入内核
 ret
```

li a7, SYS_trace:把系统调用号22，存入到寄存器a7中。
ecall:为陷入内核态的指令。cpu从U-mode转入S-mode。
ret:从内核态返回到用户态之后，跟着ecall下一条继续执行。

注：这里可能有个点容易混淆，即22和32的区别。首先要分清楚，trace()本身就是一个系统调用函数，它在整个操作系统中可用的系统调用表内，排第22号，而trace()的功能是追踪一个系统调用的流程，所以它的参数是追踪由32,通过位运算算出来的对应的系统调用，1 << X = 32,X = 5。5号为SYS_read。即本次trace所追踪的系统调用为read()。

在此时寄存器a0:存储mask,32。
a7:存储22,trace本身。

3. ecall陷入内核：
U-mode转为S-mode。
从页表的角度来看，现在仍是用户态页表。

这里需要插一句：在用户态，页表可以有好多个，每个页表对应一个进程，记录数据，而内核态只有一个页表，记录内核态数据。

4. 在kernel/trap.S中的uservec：
```
uservec:
  csrw sscratch, a0        # 暂存 a0
  li a0, TRAPFRAME         # trapframe 虚拟地址
  # 保存所有用户寄存器到 trapframe
  sd ra, 40(a0)
  sd sp, 48(a0)
  sd gp, 56(a0)
  ...
  sd a0, 112(a0)           # 保存 a0（32）
  ...
  # 保存 sepc 到 trapframe->epc
  csrr t0, sepc
  sd t0, 256(a0)
  # 切换页表
  ld t0, 0(a0)             # kernel_satp
  csrw satp, t0            # ← 切到内核页表
  sfence.vma zero, zero
  # 切换栈
  ld sp, 8(a0)             # kernel_sp
  # 跳到 usertrap
  jr t1
```

简单总结也就是，由于接下来要切换至内核态，需要使用寄存器，但是寄存器当前保存了用户态进程的值，所以需要现在每个用户态进程中，开一个trapframe，用他来保存每个用户进程的寄存器的值。之后切换至内核页表，内核栈。

5. 在kernel/trap.c中的usertrap()：
```
void usertrap(void) {
  int which_dev = 0;
  struct proc *p = myproc();

  if(r_scause() == 8) {              // 8 = 用户态 ecall
    ...
    p->trapframe->epc += 4;          // ← 跳过 ecall
    intr_on();
    syscall();                       // ← 进入分发
  } else if(...) {
    ...
  }
  ...
  usertrapret();                     // 准备返回
}
```

检查以下当前陷入内核态的原因是什么，发现是ecall，准备要进入syscall()，但是epc此时指向的是ecall，如果直接返回则会无限循环的调用ecall，因此需要+4,进入syscall()进行分发。

6. kernel/syscall.c中：
```
void syscall(void) {
  int num;
  struct proc *p = myproc();

  num = p->trapframe->a7;                       // 22
  if(num > 0 && num < NELEM(syscalls) && syscalls[num]) {
    p->trapframe->a0 = syscalls[num]();          // ← 调用 sys_trace()
    if(p->tracemask & (1 << num))                // 判断是否打印
      printf("%d: syscall %s -> %d\n",
             p->pid, syscall_names[num], p->trapframe->a0);
  } else {
    printf("%d %s: unknown sys call %d\n", p->pid, p->name, num);
    p->trapframe->a0 = -1;
  }
}
```

简单总结也就是：先把寄存器a7保存到num中，syscalls通过num，调用sys_trace()，之后把返回值保存到a0寄存器中。
此时p->tracemask为32，因为和1 << num的结果不一样，所以不会打印trace函数。

至此，从ecall进入的内核态调用全部完成，下面是sys_trace的函数介绍。

7. kernel/sysproc.c中：
```
uint64 sys_trace(void) {
  int mask;
  if(argint(0, &mask) < 0)     // 从 trapframe->a0 读 32
    return -1;
  myproc()->tracemask = mask;  // 当前进程 tracemask = 32
  return 0;                    // 成功
}
```

读取mask对应的系统调用。

8. 在kernel/trap.c中：
```
void usertrapret(void) {
  struct proc *p = myproc();

  // 关中断，设 stvec = uservec
  intr_off();
  uint64 trampoline_uservec = TRAMPOLINE + (uservec - trampoline);
  w_stvec(trampoline_uservec);

  // 把内核上下文信息写回 trapframe
  p->trapframe->kernel_satp = r_satp();
  p->trapframe->kernel_sp = p->kstack + PGSIZE;
  p->trapframe->kernel_trap = (uint64)usertrap;
  p->trapframe->kernel_hartid = r_tp();

  // 设 sstatus、sepc
  unsigned long x = r_sstatus();
  x &= ~SSTATUS_SPP;             // 返回 U-mode
  x |= SSTATUS_SPIE;
  w_sstatus(x);
  w_sepc(p->trapframe->epc);     // sepc = ecall + 4

  // 切回用户页表、恢复寄存器、sret
  uint64 satp = MAKE_SATP(p->pagetable);
  uint64 trampoline_userret = TRAMPOLINE + (userret - trampoline);
  ((void (*)(uint64))trampoline_userret)(satp);
}
```

把内核上下文写入内核页表的trapframe，然后切换回用户页表，以及用户态的寄存器。

9. 在第2步的usys.S中，ret回去之后，接着在user/trace.c中：
```
int
main(int argc, char *argv[])
{
  int i;
  char *nargv[MAXARG];

  if(argc < 3 || (argv[1][0] < '0' || argv[1][0] > '9')){
    fprintf(2, "Usage: %s mask command\n", argv[0]);
    exit(1);
  }

  if (trace(atoi(argv[1])) < 0) {
    fprintf(2, "%s: trace failed\n", argv[0]);
    exit(1);
  }
  
  for(i = 2; i < argc && i < MAXARG; i++){
    nargv[i-2] = argv[i];
  }
  exec(nargv[0], nargv);    //执行这一步，grep。 
  exit(0);
}
```

10. 在grep调用read的时候，也会经历上述的一系列流程，唯一有区别的就是，由于此时的num是5,而1 << num是32，正好等于之前设置的p->trapframe，因此打印read系统调用。最后终端上输出的内容是：
```
6: syscall read -> 1023
6: syscall read -> 968
6: syscall read -> 235
6: syscall read -> 0
```

## 打印系统当前的空闲物理内存和进程数量
```
uint64
sys_sysinfo(void)
{
  uint64 addr;
  struct sysinfo info;
  struct proc *p = myproc();

  if(argaddr(0, &addr) < 0)     // 从 trapframe->a0 读用户指针
    return -1;

  info.freemem = freemem();     // 遍历全局空闲链表
  info.nproc   = nproc();       // 遍历全局进程表

  if(copyout(p->pagetable, addr, (char *)&info, sizeof(info)) < 0)  // 拷回用户空间
    return -1;

  return 0;
}
```

sysinfo系统调用就是这样的功能，其本质和刚刚的系统调用流程大差不差，唯一区别就是，由于要查询当前系统的空闲物理内存和进程数量，所以第一步，需要加锁，遍历。其次需要使用copyout，把内核数据写到该地址。

## 结语

本次lab主要是了解了用户态和内核态在代码层次上的切换，但其实这个lab之前还有一个关于进程的lab，而本次lab中的trace，也涉及到了进程替换之前，内核进程的上下文信息会被继承的特点。过程中也还有很多缺漏，如有疑问欢迎指出(1203987745@qq.com)。