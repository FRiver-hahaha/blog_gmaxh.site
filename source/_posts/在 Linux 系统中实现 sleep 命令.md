---
title: 在 Linux 系统中实现 sleep 命令
date: 2025-11-18 20:40:24
tags: 
  - Linux 
  - C
---

## 用c语言实现自己的 sleep 命令
### 写在前面：  
sleep是用于控制进程暂停的常用命令，本次我将使用系统调用函数，实现一个简单的sleep命令。

### 功能：
1. 支持传入多个参数。
2. 对于没有参数或这错误参数的情况，抛出错误。

### 基本思路：
1. 对于没有参数的情况，我直接抛出错误。
2. 在处理参数的时候，我这里封装在了一个Howtime()的函数内部，可以使得处理参数更加方便，而由于参数是字符串形式传入，所以需要转换为整数形式。
3. 面对负数，非阿拉伯数字等其他字符的时候，我选择抛出错误。
4. 最后把所有时间加和，sleep。

### 源代码：
‵‵‵
#include <stdio.h>//fprintf()
#include <unistd.h>//sleep()
#include <stdlib.h>//exit()

int Howtime(char* string);

int main(int argc, char* argv[]) { 
  int total_time = 0;
  if(argc == 1) {
    fprintf(stderr, "sleep: argument...\n");
    exit(1);
  }
  
  for(int i = 1; i < argc; i++) {
    int tmp = Howtime(argv[i]);
    if(tmp < 0) {
      fprintf(stderr, "sleep:invalid time '%s'\n",argv[i]);
    }else {
      total_time += tmp;
    }
  }
  sleep(total_time);
  
  exit(0);
}

int Howtime(char* string) {
  if(string[0] == '-' || string[0] == '\0') {
    return -1;
  }
  int time = 0;
  int i = 0;
  while(string[i] != '\0') {
    if(string[i] < '0' && string[i] > '9') {
      return -1;
    }
    time = time * 10 + (string[i] - '0');
    i++;
  }
  return time;
}

```