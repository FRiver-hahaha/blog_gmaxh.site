---
title: 西邮 Linux 兴趣小组 2025 纳新面试题
date: 2025-10-23 18:23:11
tags: 
    - Linux
    - C
---


# 西邮 Linux 兴趣小组 2025 纳新面试题
> 学长寄语：长期以来，西邮 Linux 兴趣小组的面试题以难度之高名扬西邮校内。我们作为出题人也清楚地知道这份试题略有难度。请你动手敲一敲代码。别担心，若有同学能完成一半的题目，就已经十分优秀。其次，相比于题目的答案，我们对你的思路和过程更感兴趣，或许你的答案略有瑕疵，但你正确的思路和对知识的理解足以为你赢得绝大多数的分数。最后，做题的过程也是学习和成长的过程，相信本试题对你更加熟悉地掌握 C 语言一定有所帮助。祝你好运。我们东区逸夫楼 FZ103 见！

- 本题目只作为西邮 Linux 兴趣小组 2025 纳新面试的有限参考。
- 为节省版面，本试题的程序源码省去了 `include` 指令。
- 本试题中的程序源码仅用于考察 C 语言基础，不应当作为 C 语言「代码风格」的范例。
- 所有题目编译并运行于 _x86_64 GNU/Linux_ 环境。


## 0. 拼命的企鹅
一只企鹅在爬山，每隔一段路都会遇到一块石头。第 1 块石头重量是 `a`，每往上走一段路，石头重量就会变成上一段的平方。企鹅可以选择把某些石头捡起来，最后把捡到的石头重量相乘。

它怎样捡石头，才能得到重量乘积恰好是 `a` 的 `b` 次方的石头？（比如 `b = 173` 时， 要捡哪些石头？）

**题解：**
- 代码：  
```
#include<stdio.h>

int main()
{
    int b;
    scanf("%d",&b);
    int printpoint=1;//insert ','.
    int point=1;//the situation of the key stone.

    while(b>0)
    {
        if(b&1)//get the key.
        {
            if(!printpoint)
            {
                printf(",");
            }
            printf("%d",point);
            printpoint=0;
        }
        b>>=1;//delete the previous.
        point++;//change the situation.
    }

    return 0;
}
```

- 输出结果：  
 当`b = 173`时，结果为：`1,3,4,6,8`  
 当`b = 65`时，结果为：`1,7`

- 解释：  
 1. 由题意可知，捡到的石头重量相乘，即对应石头指数相加，而我们可以将石头的重量：${a^n}$可以写作$a^{2^n}$，于是在相乘的过程中，可以等效转换为是2的n次幂的相加，即2进制转10进制。
 2. 通过每次对2进制下的`1`读取下标，便可以输出`1`的位置。

- 考点：  
 2进制与10进制转换、通过数学工具来解决实际问题的能力

## 1. 西邮Linux欢迎你啊
请解释以下代码的运行结果。
```
int main() {
    if (printf("Hi guys! ") || printf("Xiyou Linux ")) {
        printf("%d\n", printf("Welcome to Xiyou Linux 2%d", printf("")));
    }
    return 0;
}
```

**题解：**

- 输出结果：  
  `Hi guys! Welcome to Xiyou Linux 2025`

- 解释：  
  1. if语句中执行printf函数，其返回值：打印的字符长度`10`，作为判断if语句成立的条件。由于两个printf的关系为**或**，第一个printf函数的返回值已经使if语句成立，故不执行第二个printf函数。结果为：`Hi guys! `

  2. 在if语句内，printf函数嵌套了其他printf函数，从内向外依次输出，对应的返回值作为输出内容，以`%d`的形式输出。结果为：`Welcome to Xiyou Linux 2025`。

- 考点：  
  “短路”、printf函数返回值


## 2. 可以和 `\0` 组一辈子字符串吗？
你能找到成功打印的语句吗？你能看出每个 `if` 中函数的返回值吗？这些函数各有什么特点？
```
int main() {
    char p1[] = { 'W', 'e', 'l', 'c', 'o', 'm', 'e', '\0' };
    char p2[] = "Join us\0", p4[] = "xiyou_linux_group";
    const char* p3 = "Xiyou Linux Group\0\n2025\0";
    if (strcmp(p1, p2)) {
        printf("%s to %s!\n", p1, p2);
    }
    if (strlen(p3) > sizeof(p3)) {
        printf("%s", p3);
    }
    if (sizeof(p1) == sizeof(p2)) {
        printf("%s", p4);
    }
    return 0;
}
```

**题解：**
- 输出结果：  
 `Welcome to Join us!`  
 `Xiyou Linux Group`

- 解释：  
 1. 第一个if语句判断中，`strcmp`函数进行了两个字符串的比较，由于`'w'`比`'J'`在字符表中更靠前，其ASCII码差值为正(非0)，则if语句成立，执行`printf`函数。
 2. `sizeof(p3)`是对指针的大小进行计算，则其值为`8`，`strlen(p3)`是对字符串整体的大小进行计算，在第一个`'\0'`停止且不包括`'\0'`，故其值为`17`，比较结果在if语句中成立，执行`printf`函数。
 3. 两个字符串的大小相等，故其if语句成立，执行`printf`函数。

- 考点：  
 sizeof和strlen的使用
 

## 3. 数学没问题，浮点数有鬼
这个程序的输出是什么？解释为什么会这样？
```
int main() {
    float a1 = 0.3, b1 = 6e-1, sum1 = 0.9;
    printf("a1 + b1 %s sum1\n", (a1 + b1 == sum1) ? "==" : "!=");
    float a2 = 0x0.3p0, b2 = 0x6p-4, sum2 = 0x0.9p0;
    printf("a2 + b2 %s sum2\n", (a2 + b2 == sum2) ? "==" : "!=");
    return 0;
}
```

**题解：**
- 输出结果：  
 `a1 + b1 != sum1`  
 `a2 + b2 == sum2`

- 解释：  
 1. 浮点数本身并不精确，实际值在对应精度下无限趋近于所给值。故不相等。  
 2. 三个数均为16进制数，其实际值即所给值。  
 16进制转10进制：若无小数，则`10进制数=整数*2的n次方(n为p后数值)`
 
- 考点：  
 16进制转10进制、浮点数
 

## 4. 不合群的数字
在一个数组中，所有数字都出现了偶数次，只有两个数字出现了奇数次，请聪明的你帮我看看以下的代码是如何找到这两个数字的呢？
```
void findUndercoverIDs(int nums[], int size) {
    int xorAll = 0,id_a = 0,id_b = 0;
    for (int i = 0; i < size; i++) {
        xorAll ^= nums[i];
    }
    int diffBit = xorAll & -xorAll;
    for (int i = 0; i < size; i++) {
        if(nums[i] & diffBit){
            id_a ^= nums[i];
        } else {
            id_b ^= nums[i];
        }
    }
    printf("These nums are %d %d\n", id_a, id_b);
}
```

**题解：**
- 输出结果：  
 两个出现奇数次的数字

- 解释：  
 整体函数巧妙地利用了位运算，得到了出现奇数次的两个数字。  
 1. 根据异或的特点，即两个相同的数字的结果为0，进行异或运算。如若有两个数字出现了偶数次，便会在异或中被消除，于是我们得到了两个出现奇数次的数字异或的结果，即`xorAll`。
 2. 对`xorAll`与其本身的相反数(反码+1，即补码)进行位与运算。于是我们便得到了最低位的`1`。
 3. 对数组进行遍历，并在if语句条件判断中进行位与操作，如果结果成立，则把对应值赋给`id_a`，否则把对应值给`id_b`。这个操作更精妙之处，在于通过每次的异或，不仅仅进行赋值操作，更去除了出现偶数次的数。
 4. 分别输出两个出现奇数次的数字。
 
- 考点：  
 位运算的进阶操作

## 5. 会一直循环吗？
你了解 `argc` 和 `argv` 吗，程序的输出是什么？为什么会这样？
```
int main(int argc, char* argv[]) {
    printf("argc = %d\n", argc);
    while (argc++ > 0) {
        if(argc < 0){
            printf("argv[0] %s\n", argv[0]);
            break;
        }
    }
    printf("argc = %d\n", argc);
    return 0;
}
```

**题解：**
- 输出结果：  
 argc = 1  
 argv[0] ./文件  
 argc = -2147483648  

- 解释：  
 1. 打印了argc的数量，即第一次我们调用程序时，输入的命令行(./文件名称)
 2. 在while循环内进行了argc的判断与自增，并且在其中加入了argc的判断。argc在不断自增的过程中，由于其本身便是int类型，故会增加到一定大小后，变成负数。当变为负数时，if语句成立，输出argv[0]，跳出while循环，不会argc的自增~
 3. 输出argc的大小。

- 考点：  
 argc与argv[]的含义

## 6. const 与指针：谁能动，谁不能动？
```
struct P {
    int x;
    const int y;
};

int main() {
    struct P p1 = { 10, 20 }, p2 = { 30, 40 };
    const struct P p3 = { 50, 60 };
    struct P* const ptr1 = &p1;
    const struct P* ptr2 = &p2;
    const struct P* const ptr3 = &p3;
    return 0;
}
```
说说下列操作是否合法，并解释原因：

`ptr1->x = 100`, `ptr2->x = 300`, `ptr3->x = 500`

`ptr1->y = 200`, `ptr1 = &p2`, `ptr2->y = 400`

`ptr2 = &p1`, `ptr3->y = 600`, `ptr3 = &p1`

**题解：**  
输出结果：
||||
|:---|:---:|---:|  
|合法|不合法|不合法|  
|不合法|不合法|不合法| 
|合法|不合法|不合法|

- 解释：  
 1. 首先定义了一个结构体，在结构体内有两个变量，`x`是`int`类型，`y`是`const int`类型，即无法通过指针改变`y`的值。
 2. `p1`指针锁定了他指向的位置，`p2`指针锁定了他指向的内容，`p3`指针锁定了他指向的位置和内容。三个指针的区别就在于`const`的修饰。`*`在`const`前，在`const`后，在两个`const`中间。鉴于博主本人在学习此处时容易混淆，于是自己想了个小口诀，针对`*`在`const`的相对位置，“左位右值”（高中记物理二级结论的DNA动了）。供大家参考。

- 考点：  
 const限定符、结构体
 

## 7. 指针！数组!
在主函数中定义如下变量:
```
int main() {
    int a[3] = { 2, 4, 8 };
    int(*b)[3] = &a;
    int* c[3] = { a, a + 1, a + 2 };
    int (*f1(int))(int*, int);
    return 0;
}
```
说说这几个表达式的输出分别是什么？

`a`, `*b`, `*b + 1`, `b`, `b + 1`, `* (*b + 1)`, `c`, `sizeof(a)`, `sizeof(b)`, `sizeof(&a)`, `sizeof(f1)`

**题解：**
- 输出结果：  
 `a`:a[0]的地址  
 `*b`:a[0]的地址  
 `*b + 1`:a[1]的地址  
 `b`:a的地址  
 `b + 1`:a末尾的地址  
 `* (*b + 1)`:4  
 `c`:a[0]的地址的地址  
 `sizeof(a)`:3(元素个数)*4(int字节大小)=12  
 `sizeof(b)`:8
 `sizeof(&a)`:8  
 `sizeof(f1)`:编译错误

- 解释：  
 1. `a[3]`是一个含有三个`int`类型的数组  
 `(*b)[3]`是一个指向含有三个`int`元素类型的数组的指针  
 `* c[3]`是一个含有三个指向`int`指针类型的数组
 `f1`是一个函数，他接受一个`int`类型的参数，返回为函数指针，该函数指针又可以接受一个`int`类型指针与`int`类型的参数，返回为`int`类型
 2. `sizeof`函数不可以操作函数。

- 考点：  
 sizeof的使用、数组，数组指针，指针数组的区别、函数指针（十分神奇的一项操作）
 

## 8. 全局还是局部！！！
观察程序输出，思考为什么？
```
int g;
int func() {
    static int j = 98;
    j += g;
    return j;
}

int main() {
    g += 3;
    char arr[6] = {};
    arr[1] = func();
    arr[0] = func();
    arr[2] = arr[3] = func() + 1;
    arr[4] = func() + 1;
    printf("%s linux\n",arr);
    return 0;
}
```

**题解：**
- 输出结果：  
 `hello linux`

- 解释：  
 1. `arr[0]`:h  
 `arr[1]`:e  
 `arr[2]`:l  
 `arr[3]`:l  
 `arr[4]`:$o$  
 2. 在调用函数的过程中，每次`j`变量被增加，返回值被赋给了对应数组元素。
 3. `static`静态局部变量下，初始化只进行一次，且j变量存储在数据段。

- 考点：  
 静态局部变量、ASCII码

## 9. 宏函数指针
观察程序结果，说说程序运行的过程：
```
#define CALL_MAIN(main, x) (*(int (*)(int))*main)(x);
#define DOUBLE(x) 2 * x
int (*registry[1])(int);
int main(int argc) {
    if (argc > 2e3) return 0;
    printf("%d ", argc + 1);
    *registry = (int(*)(int))main;
    CALL_MAIN(registry, DOUBLE(argc + 1));
    return 0;
}
```

**题解：**
- 输出结果：  
 `2 4 8 16 32 64 128 256 512 1024 `  

- 解释：  
 1. 首先，(int (*)(int))是一个函数指针，他保存的是他所指函数的地址，并且在CALL_MAIN内，把main函数强制转换为一个函数指针，由于这个函数指针的地址就是他本身，main函数，即他在指向自己。在这个函数指针内，他接受一个int类型的变量，返回int类型，这个函数也恰好符合main函数的声明。
 2. 由于这个函数在不断的递归自己，则需要一个跳出递归的条件，即在宏定义处的DOUBLE起到了作用。通过每次的运算改变argc的值，并且加入if语句来判断是否结束该函数，便成功的解决了无限递归的问题。
 3. resistry在声明时也是个函数指针，但是他本身是一个存储1个元素的数组，元素类型为int类型的指针。于是在resistry[0]内，保存的是指向main函数的函数指针。
 4. 在CALL_MAIN处，调用main函数，进行argc的运算，实现函数递归。
   
- 考点：  
 宏定义、函数指针、函数指针数组

## 10. 拼接 排序 去重
本题要求你编写以下函数，不能改动 `main` 函数里的代码。实现对 `arr1` 和 `arr2` 的拼接、排序和去重。你需要自行定义 `result` 结构体并使用 `malloc` 手动开辟内存。

```
int main() {
    int arr1[] = { 6, 1, 2, 1, 9, 1, 3, 2, 6, 2 };
    int arr2[] = { 4, 2, 2, 1, 6, 2 };
    int len1 = sizeof(arr1) / sizeof(arr1[0]);
    int len2 = sizeof(arr2) / sizeof(arr2[0]);

    struct result result;
    your_concat(arr1, len1, arr2, len2, result);
    print_result(result);
    your_sort(result);
    print_result(result);
    your_dedup(result);
    print_result(result);
    free(result.arr);
    return 0;
}
```

**题解：**
- 代码：  
```
#include<stdio.h>
#include<stdlib.h>
struct result
{
    int* arr;
    int size;
};

void your_concat(int arr1[],int len1,int arr2[],int len2,struct result* res);
void print_result(struct result res);
void your_sort(struct result* res);
void sort(int arr[],int low,int high);//it's a qsort.
void swap(int* a,int* b);
void your_dedup(struct result* res);

int main() {
    int arr1[] = { 6, 1, 2, 1, 9, 1, 3, 2, 6, 2 };
    int arr2[] = { 4, 2, 2, 1, 6, 2 };
    int len1 = sizeof(arr1) / sizeof(arr1[0]);
    int len2 = sizeof(arr2) / sizeof(arr2[0]);

    struct result result;
    your_concat(arr1, len1, arr2, len2, &result);
    print_result(result);
    your_sort(&result);
    print_result(result);
    your_dedup(&result);
    print_result(result);
    free(result.arr);
    return 0;
}

void your_concat(int arr1[],int len1,int arr2[],int len2,struct result* res)
{
    res->arr=(int*)malloc((len1+len2)*sizeof(int));
    int i;

    for(i=0;i<len1;i++)
    {
        res->arr[i]=arr1[i];
    }
    
    for(i=0;i<len2;i++)
    {
        res->arr[len1+i]=arr2[i];
    }
    res->size=len1+len2;
}

void print_result(struct result res)
{
    int i;
    for(i=0;i<res.size;i++)
    {
        printf("%d ",res.arr[i]);
    }
    printf("\n");
}

void your_sort(struct result* res)
{
    sort(res->arr,0,res->size-1);
}

void sort(int arr[],int low,int high)
{
    int i=low;
    int j=high;
    int key=arr[low];
    if(i>j)
    {
        return;
    }
    while(i<j)
    {
        while(i<j && arr[j]>=key)
        {
            j--;
        }

        while(i<j && arr[i]<=key)
        {
            i++;
        }
        if(i<j)
        {
            swap(&arr[i],&arr[j]);
        }
        
    }
    swap(&arr[low],&arr[i]);
    sort(arr,low,i-1);
    sort(arr,i+1,high);
}

void swap(int* a,int* b)
{
    int tmp=*a;
    *a=*b;
    *b=tmp;
}

void your_dedup(struct result* res)
{
    if(res->size<=1)
    {
        return;
    }
    int new_size=1;
    int i;

    for(i=1;i<res->size;i++)
    {
        if(res->arr[i]!=res->arr[i-1])
        {
            res->arr[new_size]=res->arr[i];
            new_size++;
        }
    }

    res->arr=(int*)realloc(res->arr,new_size*sizeof(int));
    res->size=new_size;
}
```

- 输出结果：  
 `6 1 2 1 9 1 3 2 6 2 4 2 2 1 6 2`  
 `1 1 1 1 2 2 2 2 2 2 3 4 6 6 6 9`  
 `1 2 3 4 6 9`  
 
- 解释：  
1. 首先定义结构体，其中结构体有`int`类型的指针，和我们将要进行动态操作的数组。
2. 在拼接函数内，首先为结构体内指针分配内存，用两个for循环，将两个数组依次输入到我们刚刚分配内存的指针内。我们之后的操作也是基于这个数组。记得把大小也赋值给结构体内，保存长度的`size`变量。
3. 在排序函数内，我使用的是快速排序。
4. 在去重函数内，我对数组进行for循环遍历，由于该数组已经排序完毕，所以可以依次比较。最后将去重后的数组重新分配内存，并且重新赋值数组大小。
5. 记得free内存。

- 考点：  
 结构体、排序算法、动态分配内存

## 11. 指针魔法
用你智慧的眼睛，透过这指针魔法的表象，看清其本质：
```
void magic(int(*pa)[6], int** pp) {
    **pp += (*pa)[2];
    *pp = (*pa) + 5;
    **pp -= (*pa)[0];
    *pp = (*pa) + ((*(*pa + 3) & 1) ? 3 : 1);
    *(*pp) += *(*pp - 1);
    *pp = (*pa) + 2;
}
int main() {
    int a[6] = { 2, 4, 6, 8, 10, 12 };
    int* p = a + 1,** pp = &p;
    magic(&a, pp);
    printf("%d %d\n%d %d %d\n%d %d\n",*p,**pp,a[1],a[2],a[3],a[5],p-a);
    return 0;
}
```

**题解：**
- 输出结果：  
`6 6`  
`12 6 8`  
`10 2`  

- 解释：  
 1. 在main函数内，先分配了一个数组，并且定义了一级指针`p`，和二级指针`pp`。此时p内为`a[1]`的地址，`pp`为`a[1]`的地址的地址。接下来我们在`magic`函数内逐步分析。
 2. 首先`magic`函数内传入了一个指向6个元素数组的指针的参数，和一个二级指针的参数。
 3. 第一行，`a[2]`的值和`a[1]`的值相加，赋给了`pp`。此时数组状态为`{ 2, 10, 6, 8, 10, 12 }`。
 4. 第二行，把`a[5]`的地址赋给了`pp`。此时数组状态为`{ 2, 10, 6, 8, 10, 12 }`。
 5. 第三行，把`a[5]`的值和`a[0]`的值相减，赋给了`a[5]`。此时数组状态为`{ 2, 10, 6, 8, 10, 10 }`。
 6. 第四行，先在内层进行判断，如果`a[3]`的值和`1`位与之后，结果非0，则把`1`作为参数，执行外层的代码。最终结果是把`a[1]`的地址赋值给了`pp`。此时数组状态为`{ 2, 10, 6, 8, 10, 10 }`。
 7. 第五行，把`a[1]`和`a[0]`的值相加，赋给了`a[1]`。此时数组状态为`{ 2, 12, 6, 8, 10, 10 }`。
 8. 第六行，把`a[2]`的地址赋给了`pp`。此时数组状态为`{ 2, 12, 6, 8, 10, 10 }`。
 9. 最后printf函数输出时，`*p`和`**pp`为`6`，`p-a`为`2`，即元素位置之差。其他对应输出相应数组元素即可。
   
- 考点：  
 数组指针、二级指针

## 12. 奇怪的循环
你能看明白这个程序怎样运行吗？试着理解这个程序吧！
```
union data {
    void**** p;
    char arr[20];
};
typedef struct node {
    int a;
    union data b;
    void (*use)(struct node* n);
    char string[0];
} Node;
void func2(Node* node);

void func1(Node* node) {
    node->use = func2;
    printf("%s\n", node->string);
}
void func2(Node* node) {
    node->use = func1;
    printf("%d\n", ++(node->a));
}
int main() {
    const char* s = "Your journey begins here!";
    Node* P = (Node*)malloc(sizeof(Node) + (strlen(s) + 1) * sizeof(char));
    strcpy(P->string, s);
    P->use = func1;
    P->a = sizeof(Node) * 50 + sizeof(union data);
    while (P->a < 2028) {
        P->use(P);
    }
    free(P);
    return 0;
}
```

**题解：**
- 输出结果：  
 `Your journey begins here!`  
`2025`  
`Your journey begins here!`  
`2026`  
`Your journey begins here!`  
`2027`  
`Your journey begins here!`  
`2028`  

- 解释：  
 1. 首先在计算`sizeof(Node)`时，要注意结构体和共用体的内存对齐，对于共用体来说，内存共用且为最长字节类型的最小整数倍，即`24`。对结构体来说，每个变量对齐时，其对齐位置为上一次对齐后的下一位，为最长字节类型的倍数，总内存为最小整数倍，即`40`。
 2. `use`函数指针指向了`func1`，在进入while循环内，伴随着每一次条件的判断，在`func1`和`func2`来回交替执行，直到条件不成立。

- 考点：  
 结构体和共用体内存对齐、函数指针

## 13. GNU/Linux (选做)
注：嘿！你或许对 Linux 命令不是很熟悉，甚至你没听说过 Linux。但别担心，这是选做题，了解 Linux 是加分项，但不了解也不扣分哦！

1. 你知道 cd 命令的用法与 / ~ - 这些符号的含义吗？
2. 你知道 Linux 系统如何创建和删除一个目录吗？
3. 请问你还懂得哪些与 GNU/Linux 相关的知识呢？

**题解：**
- 输出结果：  
 1. `cd`:更改目录  
 `cd /`:切换至根目录  
 `cd ~`:切换至用户主目录
 `cd -`:切换至上一级目录
 2. `mkdir 目录名称 ` 
 `rmdir 目录名称`
 3. `ls`:列出文件  
 `touch`:创建文件  
 `clear`:清除终端页面  
 ......
D