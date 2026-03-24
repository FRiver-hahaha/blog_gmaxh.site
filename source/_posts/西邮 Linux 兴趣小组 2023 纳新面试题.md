---
title: 西邮 Linux 兴趣小组 2023 纳新面试题
date: 2025-10-27 22:30:23
tags: 
    - Linux
    - C
---


# 西邮 Linux 兴趣小组 2023 纳新面试题
> 学长寄语：长期以来，西邮Linux兴趣小组的面试题以难度之高名扬西邮校内。我们作为出题人也清楚的知道这份试题略有难度。请你动手敲一下代码。别担心，若有同学能完成一半的题目，就已经十分优秀。其次，相比于题目的答案，我们对你的思路和过程更感兴趣，或许你的答案略有瑕疵，但你正确的思路和对知识的理解足以为你赢得绝大多数的分数。最后，做题的过程也是学习和成长的过程，相信本试题对你更加熟悉的掌握C语言的一定有所帮助。祝你好运。我们东区逸夫楼FZ103见

- 本题目只作为西邮 Linux 兴趣小组 2023 纳新面试的有限参考。
- 为节省版面，本试题的程序源码省去了 `#include` 指令。
- 本试题中的程序源码仅用于考察 C 语言基础，不应当作为 C 语言「代码风格」的范例。
- 所有题目编译并运行于 _x86_64 GNU/Linux_ 环境。


## 0. 鼠鼠我啊，要被祸害了
有1000瓶水，其中有一瓶有毒，小白鼠只要尝一点带毒的水，24小时后就会准时死亡。至少要多少只小白鼠才能在24小时内鉴别出哪瓶水有毒？  

**题解：**
- 代码：  
```
#include<stdio.h>

int main() {
    int b;
    scanf("%d",&b);//毒药编号
    int number=0;
    while(b>0)
    {
        if(b&1)
        {
            number++;
        }
        b>>=1;
    }
    printf("%d",number);//小鼠数量
    return 0;
}

```

- 解释：  
 1. 由于有1000瓶药水，而$2^{10}$>1000，故至少需要10只小鼠。

- 考点：  
 通过数学工具来解决实际问题的能力

## 1. 先预测一下~
按照函数要求输入自己的姓名试试~  
```
char *welcome() {
    // 请你返回自己的姓名
}
int main(void) {
    char *a = welcome();
    printf("Hi, 我相信 %s 可以面试成功!\n", a);
    return 0;
}
```

**题解：**
- 代码：  
```
#include<stdio.h>

char *welcome() {
    return "FRiver";
}
int main(void) {
    char *a = welcome();
    printf("Hi, 我相信 %s 可以面试成功!\n", a);
    return 0;
}
```

- 输出结果：  
 `Hi, 我相信 FRiver 可以面试成功!`  

- 解释：  
 1. 在welcome()函数内，返回为一个字符串，这个字符串地址被保存在*a内。
 2. 之后在printf函数内打印这个字符串。

- 考点：  
 字符串

## 2. 欢迎来到Linux兴趣小组
有趣的输出，为什么会这样子呢~  
你了解 `sizeof()` 和 `strlen()` 吗？他们的区别是什么？
```
int main(void) {
    char *ptr0 = "Welcome to Xiyou Linux!";
    char ptr1[] = "Welcome to Xiyou Linux!";
    if (*ptr0 == *ptr1) {
      printf("%d\n", printf("Hello, Linux Group - 2%d", printf("")));
    }
    int diff = ptr0 - ptr1;
    printf("Pointer Difference: %d\n", diff);
}
```

**题解：**
- 输出结果：  
 `Hello, Linux Group - 2023`  
 `Pointer Difference: 473149860(随着每次编译而变化)`  

- 解释：  
 1. `printf`函数内嵌套了一些`printf`函数，每个函数的返回值为其需要打印内容的字符长度。由于`*ptr0`和`*ptr1`均为`‘W’`，故相等。在`diff`变量下，保存了p`tr0`和`ptr1`的差值，由于`ptr1`是一个数组，他保存在栈上，`ptr2`指向的是一个字符串字面量，具有静态存储期。故差值不定。
 2. sizeof()运算符计算对象所占内存的大小或一个数据结构的大小。strlen()函数计算字符串的字符长度。

- 考点：  
 printf函数返回值、存储期、sizeof()、strlen()

## 3. 一切都翻倍了吗
1. 请尝试解释一下程序的输出。  
2. 请谈谈对`sizeof()`和`strlen()`的理解吧。  
3. 什么是`sprintf()`，它的参数以及返回值又是什么呢？  
```
int main(void) {
    char arr[] = {'L', 'i', 'n', 'u', 'x', '\0', '!'}, str[20];
    short num = 520;
    int num2 = 1314;
    printf("%zu\t%zu\t%zu\n", sizeof(*&arr), sizeof(arr + 0),
           sizeof(num = num2 + 4));
    printf("%d\n", sprintf(str, "0x%x", num) == num);
    printf("%zu\t%zu\n", strlen(&str[0] + 1), strlen(arr + 0));
}
```

**题解：**
- 输出结果：  
 `7       8       2`  
 `0`  
 `4       5`

- 解释：  
 1. `sizeof()`运算符对`arr`数组的元素数量进行计算，有`7`个元素故为`7`。`arr+0`说明了是对`arr`这个数组的入口地址计算，则其结果为`8`。由于赋值表达式的类型是左值的类型，则其大小为`2`。
 2. `sprintf`其类似与`printf`，唯一区别就是他会把参数放到一个`str`数组里面，返回值为传入参数的字符数。而由于该参数是以`16`进制的方式输入的且有前缀，则其返回的字符数一定不等于原字符数，整体返回`0`。
 3. `&str[0]+1`的结果为`x`的地址，从该地址开始，计算到`\0`之前的字符数。`arr+0`的结果为`0`的地址，从该地址开始，计算到`\0`之前的字符数。

- 考点：  
 sizeof()、sprintf()

## 4. 奇怪的输出
程序的输出结果是什么？解释一下为什么出现该结果吧~
```
int main(void) {
    char a = 64 & 127;
    char b = 64 ^ 127;
    char c = -64 >> 6;
    char ch = a + b - c;
    printf("a = %d b = %d c = %d\n", a, b, c);
    printf("ch = %d\n", ch);
}
```

**题解：**
- 输出结果：  
 `a = 64 b = 63 c = -1`  
 `ch = -128`

- 解释：  
 1. `01000000 & 01111111 = 01000000`
 2. `01000000 ^ 01111111 = 01111111`
 3. `01000000`向右移6位：`00000001`，由于为负数，补码的结果为：`11111111`
 4. ch的结果为`64+63-(-1)=128`，这个数超过了有符号整数的范围，补码结果为`-128`

- 考点：  
 位运算、补码
 
## 5. 乍一看就不想看的函数
_“人们常说互联网凛冬已至，要提高自己的竞争力，可我怎么卷都卷不过别人，只好用一些奇技淫巧让我的代码变得高深莫测。”_  
这个`func()`函数的功能是什么？是如何实现的？  
```
int func(int a, int b) {
    if (!a) return b;
    return func((a & b) << 1, a ^ b);
}
int main(void) {
    int a = 4, b = 9, c = -7;
    printf("%d\n", func(a, func(b, c)));
}
```

**题解：**
- 输出结果：  
 `6`  

- 解释：  
 1. main函数内打印的数字，为整个函数传参后的返回值，参数内嵌套了函数，函数本身又在递归。
 2. 在函数内，先判断a的值，a的值为0时，返回b的值，否则递归函数。

- 考点：  
 递归

## 6. 自定义过滤
请实现`filter()`函数：过滤满足条件的数组元素。  
提示：使用函数指针作为函数参数并且你需要为新数组分配空间。
```
typedef int (*Predicate)(int);
int *filter(int *array, int length, Predicate predicate,
            int *resultLength); /*补全函数*/
int isPositive(int num) { return num > 0; }
int main(void) {
    int array[] = {-3, -2, -1, 0, 1, 2, 3, 4, 5, 6};
    int length = sizeof(array) / sizeof(array[0]);
    int resultLength;
    int *filteredNumbers = filter(array, length, isPositive,
                                  &resultLength);
    for (int i = 0; i < resultLength; i++) {
      printf("%d ", filteredNumbers[i]);
    }
    printf("\n");
    free(filteredNumbers);
    return 0;
}
```

**题解：**  
- 代码：  
```
#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<assert.h>

typedef int (*Predicate)(int);

int *filter(int *array, int length, Predicate predicate,
            int *resultLength); /*补全函数*/

int isPositive(int num) { return num > 0; }
int main(void) {
    int array[] = {-3, -2, -1, 0, 1, 2, 3, 4, 5, 6};
    int length = sizeof(array) / sizeof(array[0]);
    int resultLength;
    int *filteredNumbers = filter(array, length, isPositive, &resultLength);
    for (int i = 0; i < resultLength; i++) {
      printf("%d ", filteredNumbers[i]);
    }
    printf("\n");
    free(filteredNumbers);
    return 0;
}

int *filter(int *array, int length, Predicate predicate,int *resultLength)
{
	int cnt=0;
	int* ar=(int*)malloc(sizeof(int)*length);
	assert(ar);
	int i;

	for(i=0;i<length;i++)
	{
		if((*predicate)(array[i]))
		{
			ar[cnt]=array[i];
			cnt++;
		}
	}

	*resultLength=cnt;
	return ar;

}
```

- 输出结果：  
`1 2 3 4 5 6 `  

- 解释：  
 1. 首先定义了一个函数指针，指向的函数传入int类型的参数，返回int类型的值。
 2. 在过滤函数内，首先动态分配内存，之后使用判断函数进行判断是否大于0,之后进行赋值，并且记录有效值的个数，最后返回刚刚动态分配内存的地址，进入主函数。
   
- 考点：  
 函数指针、动态分配内存


## 7. 静…态…
1. 如何理解关键字`static`？  
2. `static`与变量结合后有什么作用？  
3. `static`与函数结合后有什么作用？  
4. `static`与指针结合后有什么作用？  
5. `static`如何影响内存分配？

**题解：**
- 解释：  
 1. 即“静态”。
 2. 将变量、函数、指针声明为，一个具有文件作用域，内部连接，静态存储期的变量。
 3. static的对象被放在静态存储区。

- 考点：  
 static

## 8. 救命！指针！
数组指针是什么？指针数组是什么？函数指针呢？用自己的话说出来更好哦，下面数据类型的含义都是什么呢？
```
int (*p)[10];
const int* p[10];
int (*f1(int))(int*, int);
```

**题解：**
- 解释：  
 1. `(*p)[10]`是一个指向含有10个int类型元素数组的指针。
 2. `* p[10]`是一个含有10个指向int类型指针元素的数组，且他被const修饰，无法修改其数组内容。
 3. `f1`是一个接受int类型参数的函数，返回值是一个指针，即指向一个参数为int*和int类型的函数，指向的函数返回类型为int。即f1是一个函数指针。

- 考点：  
 指针数组、数组指针、函数指针

## 9. 咋不循环了
程序直接运行，输出的内容是什么意思？
```
int main(int argc, char* argv[]) {
    printf("[%d]\n", argc);
    while (argc) {
      ++argc;
    }
    int i = -1, j = argc, k = 1;
    i++ && j++ || k++;
    printf("i = %d, j = %d, k = %d\n", i, j, k);
    return EXIT_SUCCESS;
}
```

**题解：**
- 输出结果：  
 `[1]`  
 `i = 0, j = 1, k = 2`  

- 解释：  
 1. argc一开始为1，之后进入while循环，argc一直递增(有补码)直到argc为0，退出循环。
 2. 表达式内，i=-1为真，j=0为假，k=1为真，没有短路，且三个变量均递增。

- 考点：  
 短路、argc

## 10. 到底是不是TWO

```
#define CAL(a) a * a * a
#define MAGIC_CAL(a, b) CAL(a) + CAL(b)
int main(void) {
  int nums = 1;
  if(16 / CAL(2) == 2) {
    printf("I'm TWO(ﾉ>ω<)ﾉ\n");
  } else {
    int nums = MAGIC_CAL(++nums, 2);
  }
  printf("%d\n", nums);
}
```

**题解：**
- 输出结果：  
 `1`  

- 解释：  
 1. CAL宏定义，没有加()，会直接“贴”到代码内，使得`16 / CAL(2)`结果为`32`
 2. 进入else语句内，创建了一个新的块作用域的nums，之后又被销毁，故main内的nums没有被改动，仍为`1`。

- 考点：  
 宏、自动变量

## 11. 克隆困境
试着运行一下程序，为什么会出现这样的结果？  
直接将`s2`赋值给`s1`会出现哪些问题，应该如何解决？请写出相应代码。
```
struct Student {
    char *name;
    int age;
};

void initializeStudent(struct Student *student, const char *name,
                       int age) {
    student->name = (char *)malloc(strlen(name) + 1);
    strcpy(student->name, name);
    student->age = age;
}
int main(void) {
    struct Student s1, s2;
    initializeStudent(&s1, "Tom", 18);
    initializeStudent(&s2, "Jerry", 28);
    s1 = s2;
    printf("s1的姓名: %s 年龄: %d\n", s1.name, s1.age);
    printf("s2的姓名: %s 年龄: %d\n", s2.name, s2.age);
    free(s1.name);
    free(s2.name);
    return 0;
}
```

**题解：**
- 代码：  
```
struct Student {
    char *name;
    int age;
};

void initializeStudent(struct Student *student, const char *name,
                       int age) {
    student->name = (char *)malloc(strlen(name) + 1);
    strcpy(student->name, name);
    student->age = age;
}
int main(void) {
    struct Student s1, s2;
    initializeStudent(&s1, "Tom", 18);
    initializeStudent(&s2, "Jerry", 28);
	char *tmp_name;
	int tmp_age;

	tmp_name=s1.name;
	s1.name=s2.name;
	s2.name=tmp_name;

	tmp_age=s1.age;
	s1.age=s2.age;
	s2.age=tmp_age;
	
    printf("s1的姓名: %s 年龄: %d\n", s1.name, s1.age);
    printf("s2的姓名: %s 年龄: %d\n", s2.name, s2.age);
    free(s1.name);
    free(s2.name);
    return 0;
}
```

- 输出结果：  
 `s1的姓名: Jerry 年龄: 28`  
 `s2的姓名: Tom 年龄: 18`  

- 解释：  
 1. `s1 = s2`是一个看起来就很危险的操作。会使得free(s1.name)找不到内存地址而无法释放。

- 考点：  
 结构体、动态分配内存

## 12. 你好，我是内存
作为一名合格的C-Coder，一定对内存很敏感吧~来尝试理解这个程序吧！
```
struct structure {
    int foo;
    union {
      int integer;
      char string[11];
      void *pointer;
    } node;
    short bar;
    long long baz;
    int array[7];
};
int main(void) {
    int arr[] = {0x590ff23c, 0x2fbc5a4d, 0x636c6557, 0x20656d6f,
                 0x58206f74, 0x20545055, 0x6577202c, 0x6d6f636c,
                 0x6f742065, 0x79695820, 0x4c20756f, 0x78756e69,
                 0x6f724720, 0x5b207075, 0x33323032, 0x7825005d,
                 0x636c6557, 0x64fd6d1d};
    printf("%s\n", ((struct structure *)arr)->node.string);
}
```

**题解：**
- 输出结果：  
 `Welcome to XUPT , welcome to Xiyou Linux Group [2023]`  

- 解释：  
 1. arr数组内存的分配是连续的。根据小端存储的方式存储数据，之后把数组强制转换为1个指向`structure`的指针，并且从`node`内的`string`下的地址位置`8字节`，即arr[2]开始读取arr的内存。
 2. arr内存储的是一系列16进制数，这些数以1个字节的大小读取，直到读取到`\0`结束，并且以字符串的形式输出。

- 考点：  
 结构体大小、小端存储、内存的精细操作
 
## 13. GNU/Linux (选做)
注：嘿！你或许对Linux命令不是很熟悉，甚至你没听说过Linux。但别担心，这是选做题，了解Linux是加分项，但不了解也不扣分哦！  

你知道cd命令的用法与 / . ~ 这些符号的含义吗？  
请问你还懂得哪些与 GNU/Linux 相关的知识呢~

**题解：**
- 输出结果：  
 1. `cd /`:切换至根目录  
    `cd .`:切换至当前目录  
    `cd ~`:切换至用户主目录  
 2. `ls`:列出目录  
 `touch`:创建文件  
 `clear`:清除终端页面  
 ......