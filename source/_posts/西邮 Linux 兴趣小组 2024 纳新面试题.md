---
title: 西邮 Linux 兴趣小组 2024 纳新面试题
date: 2025-10-25 12:47:21
tags:
    - Linux
    - C
---

# 西邮 Linux 兴趣小组 2024 纳新面试题
> 学长寄语：长期以来，西邮 Linux 兴趣小组的面试题以难度之高名扬西邮校内。我们作为出题人也清楚的知道这份试题略有难度。请你动手敲一敲代码。别担心，若有同学能完成一半的题目，就已经十分优秀。其次，相比于题目的答案，我们对你的思路和过程更感兴趣，或许你的答案略有瑕疵，但你正确的思路和对知识的理解足以为你赢得绝大多数的分数。最后，做题的过程也是学习和成长的过程，相信本试题对你更加熟悉地掌握 C 语言一定有所帮助。祝你好运。我们东区逸夫楼 FZ103 见！

- 本题目只作为西邮 Linux 兴趣小组 2024 纳新面试的有限参考。
- 为节省版面，本试题的程序源码省去了 `#include` 指令。
- 本试题中的程序源码仅用于考察 C 语言基础，不应当作为 C 语言「代码风格」的范例。
- 所有题目编译并运行于 _x86_64 GNU/Linux_ 环境。


## 0. 聪明的吗喽
一个小猴子边上有 100 根香蕉，它要走过 50 米才能到家，每次它最多搬 50 根香蕉，（多了就拿不动了），它每走 1 米就要吃掉一根，请问它最多能把多少根香蕉搬到家里。

（提示：他可以把香蕉放下往返走，但是必须保证它每走一米都能有香蕉吃。也可以走到 n 米时，放下一些香蕉，拿着 n 根香蕉走回去重新搬 50 根。）

**题解：**
- 代码：  
```
#include<stdio.h>

int main()
{
    int n,f;//n为所持香蕉数，f为需要走的步数
    scanf("%d %d",&n,&f);
    int tmp=n/2;//最多搬的香蕉数
    int a=tmp%3;//剩余无法满足走1步消耗3根香蕉的香蕉数
    int b=tmp/3;//在走1步消耗3根香蕉的条件下所走步数
    f-=b;//剩余步数
    printf("%d",tmp+a-f);//剩余香蕉
    
    return 0;
}
```

- 输出结果：  
 `18`

- 解释：  
 1. 由于小猴子一次性最多搬运50根香蕉，而在小猴子所持香蕉数大于50根的情况下，会先带着1批香蕉向前走1步，再拿1根香蕉返回上一个位置，再带着另1批香蕉向前走回刚刚向前走那1步的所在位置，即可以等效于，走1步消耗3根香蕉。
 2. 通过计算得知，这样走会剩下2根香蕉，在此刻我们再以该条件走1步，此时，小猴子所持香蕉数已经不大于50根了。我们便可以用走1步消耗1根香蕉的方式走完剩下的路程。
   
- 考点：  
 通过数学工具来解决实际问题的能力

## 1. 西邮Linux欢迎你啊
请解释以下代码的运行结果。
```
int main() {
    unsigned int a = 2024;
    for (; a >= 0; a--)
        printf("%d\n", printf("Hi guys! Join Linux - 2%d", printf("")));
    return 0;
}
```

**题解：**
输出结果：  
`Hi guys! Join Linux - 2024`(无限循环)

- 解释：  
 `a`为`unsigned`，即为非负数，故其在自减的过程中，会在减为`0`时返回到`int`类型最大值

- 考点：  
 unsigned、补码

## 2. 眼见不一定为实
输出为什么和想象中不太一样？  
你了解 `sizeof()` 和 `strlen()` 吗？他们的区别是什么？
```
int main() {
    char p0[] = "I love Linux";
    const char *p1 = "I love Linux\0Group";
    char p2[] = "I love Linux\0";
    printf("%d\n%d\n", strcmp(p0, p1), strcmp(p0, p2));
    printf("%d\n%d\n", sizeof(p0) == sizeof(p1), strlen(p0) == strlen(p1));
    return 0;
}
```

**题解：**
- 输出结果：  
 `0`  
 `0`  
 `0`  
 `1`  

- 解释：  
 1. p0和p2的本质是一样的，p1是一个字符串指针。
 2. `strcmp`函数在比较两个字符串时，碰到了两个`'\0'`，则停止比较，返回ASCII码。
 3. `sizeof`对指针进行计算，结果为8(64位机)，对字符串进行计算，结果为字符串的长度。

- 考点：  
 strcmp和sizeof

## 3. 1.1 - 1.0 != 0.1
为什么会这样，除了下面给出的一种方法，还有什么方法可以避免这个问题？
```
int main() {
    float a = 1.0, b = 1.1, ex = 0.1;
    printf("b - a == ex is %s\n", (b - a == ex) ? "true" : "false");
    int A = a * 10, B = b * 10, EX = ex * 10;
    printf("B - A == EX is %s\n", (B - A == EX) ? "true" : "false");
}
```

**题解：**
- 输出结果：  
`b - a == ex is false`  
`B - A == EX is true`  
 
- 解释：  
 1. a,b,c均为浮点数，其实际值在无限趋近于所给值。故a+b!=c。
 2. 将对应数乘10，其整数部分具有实际意义，小数部分在转换为int类型时被忽略，正好可以使得相加运算正确。
 3. 改进方法：  
    - 可以使用16进制保存a,b,c这些浮点数，在确定小数后几位的情况下，16进制是精准的。
    - 可以使用误差容忍度，float下为1e-6，double下为1e-12。

- 考点：  
 浮点数、三元运算符

## 4. 听说爱用位运算的人技术都不太差
解释函数的原理，并分析使用位运算求平均值的优缺点。
```
int average(int nums[], int start, int end) {
    if (start == end)
        return nums[start];
    int mid = (start + end) / 2;
    int leftAvg = average(nums, start, mid);
    int rightAvg = average(nums, mid + 1, end);
    return (leftAvg & rightAvg) + ((leftAvg ^ rightAvg) >> 1);
}
```

**题解：**
- 输出结果：  
 `num[5]={1,2,3,4,5}`  
 `3`

 -解释：  
 1. 利用函数递归，将整个数组分成两个部分，分别求平均值，在把结果求平均值，得到最终结果，即分治。
 2. 优点：
     - 避免了整数溢出的问题。
     - 函数整体更整顿。  
    缺点：  
     - 时间复杂度为O(n)  
     - 空间复杂度为O(logn)  

 - 考点：  
 位运算求平均值、算法的优化思想
 
## 5. 全局还是局部!!!
先思考输出是什么，再动动小手运行下代码，看跟自己想得结果一样不一样 >-<
```
int i = 1;
static int j = 15;
int func() {
    int i = 10;
    if (i > 5) i++;
    printf("i = %d, j = %d\n", i, j);
    return i % j;
}
int main() {
    int a = func();
    printf("a = %d\n", a);
    printf("i = %d, j = %d\n", i, j);
    return 0;
}
```

**题解：**
- 输出结果：  
 `i = 11, j = 15`  
 `a = 11`  
 `i = 1, j = 15`  

- 解释：  
 1. 程序内有两个函数，func和main，func函数内使用了静态变量`j`，和一个自动变量`i`，虽然在函数外部，还有一个变量`i`，但函数外部的变量`i`为外部链接的静态变量，他会被一个自动变量所“隐藏”。因此当我们在每次调用这个函数的时候，都会有一个自动变量`i`，来也匆匆去也匆匆。
 2. 而在不调用func函数的时候，自然也不会创建这个自动变量`i`去覆盖那个静态变量`i`。于是在第三行打印的时候，`i`是1，`j`是15。

- 考点：  
 变量的作用域和存储期

## 6. 指针的修罗场：改还是不改，这是个问题
指出以下代码中存在的问题，并帮粗心的学长改正问题。
```
int main(int argc, char **argv) {
    int a = 1, b = 2;
    const int *p = &a;
    int * const q = &b;
    *p = 3, q = &a;
    const int * const r = &a;
    *r = 4, r = &b;
    return 0;
}
```

**题解：**  
- 代码：  
```
#include<stdio.h>

int main(int argc, char **argv) {
    int a = 1, b = 2;
    const int *p = &a;
    int * const q = &b;
    *q = 3, p = &a;//q和p的操作恰好相反
    const int * const r = &a;
    //删除了有关r的操作
    return 0;
}
```
- 解释：  
 1. `const`在限定一个指针的时候，他和`*`的先后顺序需要细心关注一下。当`*`在`const`的左侧时，`const`限定了指针的地址；当`*`在`const`的右侧时，`const`限定了指针地址下的值；当`*`在`const`中间时，则地址和值都被限定。可以记为”左位右值“。

- 考点：  
 const限定符

## 7. 物极必反？
你了解 `argc` 和 `argv` 吗，这个程序里的 `argc` 和 `argv` 是什么？  
程序输出是什么？解释一下为什么。
```
int main(int argc, char *argv[]) {
    while (argc++ > 0);
    int a = 1, b = argc, c = 0;
    if (--a || b++ && c--)
        for (int i = 0; argv[i] != NULL; i++)
            printf("argv[%d] = %s\n", i, argv[i]);
    printf("a = %d, b = %d, c = %d\n", a, b, c);
    return 0;
}
```

**题解：**
- 输出结果：  
 `a = 0, b = -2147483646, c = -1`  

- 解释：  
 1. argc为程序命令行的数量，*argv[]内保存着命令行的具体内容。
 2. 由于while循环的判断条件和终止条件在同一行内，且其执行的十一条空语句，故一定会执行到argc小于0。由于变量在计算机内以补码形式保存，故为4字节下最小值`-2147483648`。
 3. 在之后又进行了一次自增，把值赋给b后又自增，且在if语句内判断条件时，没有出现短路的情况，故所有操作都执行。
   
- 考点：  
 argc和argv


## 8. 指针？数组？数组指针？指针数组？
在主函数中定义如下变量：
```
int main() {
    int a[2] = {4, 8};
    int(*b)[2] = &a;
    int *c[2] = {a, a + 1};
    return 0;
}
```
说说这些输出分别是什么？  
```
a, a + 1, &a, &a + 1, *(a + 1), sizeof(a), sizeof(&a)
*b, *b + 1, b, b + 1, *(*b + 1), sizeof(*b), sizeof(b)
c, c + 1, &c, &c + 1, **(c + 1), sizeof(c), sizeof(&c)
```

**题解：**
||||||||
|:---|:---:|:---:|:---:|:---:|:---:|---:|
|&a[0]|&a[1]|数组a的地址|数组a末尾的地址|8|8|8|
|&a[0]|&a[1]|数组a的地址|数组a末尾的地址|8|8|8|
|&&a[0]|&&a[1]|数组c的地址|数组c末尾的地址|8|8|8|

- 解释：  
 1. `a[2]`是一个数组，`(*b)[2]`是一个指向含有2个元素的数组的指针，`*c[2]`是一个包含两个指针的数组。
 2. `&a`的意思是整个数组的地址，而`&a[0]`是指数组的入口地址。
 3. `sizeof`是计算其所占内存的大小。

- 考点：  
 数组，指针数组，数组指针、sizeof

## 9. 嘻嘻哈哈，好玩好玩
在宏的魔法下，数字与文字交织，猜猜结果是什么？
```
#define SQUARE(x) x *x
#define MAX(a, b) (a > b) ? a : b;
#define PRINT(x) printf("嘻嘻，结果你猜对了吗，包%d滴\n", x);
#define CONCAT(a, b) a##b

int main() {
    int CONCAT(x, 1) = 5;
    int CONCAT(y, 2) = 3;
    int max = MAX(SQUARE(x1 + 1), SQUARE(y2))
    PRINT(max)
    return 0;
}
```

**题解：**
- 输出结果：  
 `嘻嘻，结果你猜对了吗，包11滴`  

- 解释：  
 1. CONCAT的意思是，把a和b直接拼接起来，作为一个标识符。因此`x1=5`，`y2=3`。
 2. 在SQUARE中，对`x1+1`的操作为`x1+1*x1+1`，对`y2`的操作为`y2*y2`，取最大值赋值给max，打印max。

- 考点：  
 宏

## 10. 我写的排序最快
写一个 your_sort 函数，要求不能改动 main 函数里的代码，对 arr1 和 arr2 两个数组进行升序排序并剔除相同元素，最后将排序结果放入 result 结构体中。

```
int main() {
    int arr1[] = {2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 10};
    int arr2[] = {2, 1, 4, 3, 9, 6, 8};
    int len1 = sizeof(arr1) / sizeof(arr1[0]);
    int len2 = sizeof(arr2) / sizeof(arr2[0]);

    result result;
    your_sort(arr1, len1, arr2, len2, &result);
    for (int i = 0; i < result.len; i++) {
        printf("%d ", result.arr[i]);
    }
    free(result.arr);
    return 0;
}
```

**题解：**
- 代码：  
```
#include<stdio.h>   
#include<stdlib.h> 

typedef struct
{
    int* arr;
    int len;
}result;

void your_sort(int arr1[],int len1,int arr2[],int len2,result* res);

int main()
{
    int arr1[] = {2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 10};
    int arr2[] = {2, 1, 4, 3, 9, 6, 8};
    int len1 = sizeof(arr1) / sizeof(arr1[0]);
    int len2 = sizeof(arr2) / sizeof(arr2[0]);

    result result;
    your_sort(arr1, len1, arr2, len2, &result);
    for (int i = 0; i < result.len; i++) {
        printf("%d ", result.arr[i]);
    }
    free(result.arr);
    return 0;
}

void your_sort(int arr1[],int len1,int arr2[],int len2,result* res)
{
    res->arr=(int*)malloc(sizeof(int)*(len1+len2));
    int i,j;

    for(i=0;i<len1;i++)
    {
        res->arr[i]=arr1[i];
    }

    for(i=0;i<len2;i++)
    {
        res->arr[i+len1]=arr2[i];
    }

    res->len=len1+len2;

    for(i=0;i<res->len-1;i++)
    {
        for(j=0;j<=res->len-1-i;j++)
        {
            if(res->arr[j]>res->arr[j+1])
            {
                int tmp=res->arr[j];
                res->arr[j]=res->arr[j+1];   
                res->arr[j+1]=tmp;   
            }
        }
    }

    int new_size=1;

    for(i=1;i<res->len;i++)
    {
        if(res->arr[i]!=res->arr[i-1])
        {
            res->arr[new_size]=res->arr[i];
            new_size++;
        }
    }

    res->arr=(int*)realloc(res->arr,sizeof(int)*new_size);
    res->len=new_size;
}
```

- 输出结果：  
 `1 2 3 4 6 7 8 9 10 `  

- 解释：  
 1. 首先定义了一个结构体，并且把这个结构体命名为`result`。
 2. 在`your_sort`函数内，分别进行了拼接，排序，去重三个步骤，并且使用了动态分配内存。这里的排序我使用的是冒泡排序。

- 考点：  
 结构体访问、动态分配内存、拼接，排序，去重

## 11. 猜猜我是谁
在指针的迷宫中，五个数字化身为神秘的符号，等待被逐一揭示。
```
int main() {
    void *a[] = {(void *)1, (void *)2, (void *)3, (void *)4, (void *)5};
    printf("%d\n", *((char *)a + 1));
    printf("%d\n", *(int *)(char *)a + 1);
    printf("%d\n", *((int *)a + 2));
    printf("%lld\n", *((long long *)a + 3));
    printf("%d\n", *((short *)a + 4));
    return 0;
}
```

**题解：**
- 输出结果：  
 `0`  
 `2`  
 `2`  
 `4`  
 `2`  

- 解释：  
 1. `*a[]`是一个指针数组。在`64`位机中地址为`8`字节，且为小端存储。
 2. 先转换为`char*`类型，后移动`1`个字节，解引用的结果为`0`。
 3. 先转换为`char*`类型，后转换为`int*`类型，对其`4`字节下的地址解引用，结果为`1`，`1+1=2`。
 4. 先转换为`long long*`类型，后移动`8*3=24`个字节，解引用的结果为`4`。
 5. 先转换为`short*`类型，后移动`2*4=8`字节，解引用的结果为`2`。
 
- 考点：  
 指针的类型转换和运算

## 12. 结构体变小写奇遇记
计算出 `Node` 结构体的大小，并解释以下代码的运行结果。
```
union data {
    int a;
    double b;
    short c;
};
typedef struct node {
    long long a;
    union data b;
    void (*change)( struct node *n);
    char string[0];
} Node;
void func(Node *node) {
    for (size_t i = 0; node->string[i] != '\0'; i++)
        node->string[i] = tolower(node->string[i]);
}

int main() {
    const char *s = "WELCOME TO XIYOULINUX_GROUP!";
    Node *P = (Node *)malloc(sizeof(Node) + (strlen(s) + 1) * sizeof(char));
    strcpy(P->string, s);
    P->change = func;
    P->change(P);
    printf("%s\n", P->string);
    return 0;
}
```

**题解：**
- 输出结果：  
 `welcome to xiyoulinux_group!`  

- 解释：  
 1. 首先进行内存对齐，data为`24`字节，Node为`40`字节。
 2. 在main函数内对P进行动态内存分配，大小为`40+30=70`字节。
 3. `P->change = func`把change函数指针指向了`func`，`P->change(P)`调用了指向的`func`函数。
 4. 在其中还有一个字符串变为小写的tolower()函数，使得结果最后均为小写。

- 考点：  
 结构体和共用体内存对齐、动态内存分配、字符串常量的存储方式

## 13. GNU/Linux (选做)
注：嘿！你或许对Linux命令不是很熟悉，甚至没听说过Linux。
但别担心，这是选做题，了解Linux是加分项，不了解也不扣分哦！

1. 你知道 `ls` 命令的用法与 `/` `.` `~` 这些符号的含义吗？
2. 你知道 Linux 中权限 `rwx` 的含义吗？
3. 请问你还懂得哪些与 GNU/Linux 相关的知识呢？

**题解：**
- 输出结果：  
 1. `ls`:列出文件  
    `ls /`:列出根目录下的所有目录  
    `ls .`:列出当前目录下的所有目录  
    `ls ~`:列出用户主目录下的所有目录  
 2. `r`:读取权限  
    `w`:写入权限  
    `x`:执行权限
 3. `cd`:更改目录  
 `touch`:创建文件  
 `clear`:清除终端页面  
 ......