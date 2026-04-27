---
title: Makefile 真爽！
date: 2026-04-27 21:20:57
tags:
    - 日常倒霉趣事
---

以前一直觉得`makefile`很遥远，今天简单学习了一下，真是给我爽到了!💻  
🎉🎉
```CXX = g++
CXXFLAGS = -std=c++17 -pthread


objects = main.o factorial.o matrix.o

res: $(objects)
	$(CXX) -o res $(objects)

main.o: factorial.h matrix.h ThreadPool.h
factorial.o: factorial.h
matrix.o: matrix.h

.PHONY: clean
clean: 
	rm res $(objects)
```

这知识得学
🤗🤗🤗