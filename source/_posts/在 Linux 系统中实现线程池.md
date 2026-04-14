---
title: 在 Linux 系统中实现线程池
date: 2026-04-14 21:01:27
tags:
    - Linux
    - C++
---

## 用cpp实现一个简单的线程池
### 写在前面：  
线程池，顾名思义用来存放批量线程的容器。面对需要处理多任务的情况，多线程的并发处理可以有效提高运行速度。接下来我将用cpp实现一个简单的线程池类。

### 基本思路：
1. 构造函数和析构函数:负责线程池的创建和销毁。
2. 任务队列和锁:任务队列用来存放所有的任务，锁负责在线程访问任务队列时加锁，避免竞争。
3. 线程池:用`vector`存放`thread`，`worker`作为工作线程，在创建时压入`vector`中，为每个工作线程创建任务等待环节，使用条件变量等待任务，遇到任务则唤醒线程并加锁，访问任务队列，读取任务弹出任务，解锁执行任务，如若没有任务则销毁线程，销毁线程池。
4. 提交任务:`submit`函数可以接受任何任务的类型，并且支持回调。
5. 使用者在使用线程池类的时候，需要确定好要创建的线程池中的线程数，之后通过`lambda`表达式处理任务提交和回调显示。
6. `io`输出使用线程安全的方式，即`log`函数，避免在`output`过程中出现错误显示。
7. 整体界面美观，有关于主线程和工作线程在执行过程中的状态显示，供学习者参考。

### 源代码：
- `ThreadPool.h`:  
```
#include <iostream>
#include <vector>
#include <condition_variable>
#include <thread>
#include <queue>
#include <functional>
#include <mutex>
#include <chrono>
#include <future>
#include <iomanip>

using std::string, std::cout, std::endl;

/*
    日志处理函数:
    接受字符串参数，打印日志。
*/

void log(const string& msg) {
    static std::mutex logMtx;
    std::lock_guard<std::mutex> lg(logMtx);

    auto now = std::chrono::system_clock::now();
    auto time = std::chrono::system_clock::to_time_t(now);
    cout << msg << endl;
}

void log(const string& msg, int x) {
    static std::mutex logMtx;
    std::lock_guard<std::mutex> lg(logMtx);

    auto now = std::chrono::system_clock::now();
    auto time = std::chrono::system_clock::to_time_t(now);
    cout << msg;
}

class ThreadPool {

/*
    公共接口:构造函数和析构函数，
    自动初始化线程池，
    并且在工作完成之后结束线程池。
    定义任务提交函数。
    使用模板，接受任意可调用对象，任意对象的参数，回调函数。
    使用auto处理不确定的返回值，
    异步执行任务，自动执行回调函数，
    最后返回future对象，用来同步等待任务结果。
*/

public:
    ThreadPool(size_t TNum);
    ~ThreadPool();

    template<class F, class CB>
    auto submit(F&& f, CB&& cb) -> std::future<decltype(f())>;
      
/*
    隐藏接口:
    定义工作线程以及存放线程的数组，任务队列
    锁，条件变量，控制线程之间调度的条件
*/

private:
    void worker();// 工作线程
    std::vector<std::thread> workers;// 线程
    std::queue<std::function<void()>> jobs;// 任务队列

    std::mutex mtx;// 锁
    std::condition_variable cv;// 条件变量
    bool stop = false;// 控制条件
};

/*
    线程池构造函数:
    将创建的线程加入到vector里
*/

ThreadPool::ThreadPool(size_t TNum) {
    log("(init)初始化线程池,使用 " + std::to_string(TNum) + " 个线程");
    for(size_t i = 0; i < TNum; ++i) {
        workers.emplace_back(&ThreadPool::worker, this);
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    
}

/*
    线程池析构函数:
    将所有线程进行回收
*/

ThreadPool::~ThreadPool() {
    {
        std::lock_guard<std::mutex> lg(mtx);// 上锁，通知所有线程即将关闭线程池
        stop = true;
    }
    cv.notify_all();// 唤醒所有线程

    for(auto& t : workers) {
        if(t.joinable()) t.join();
    }
    log("(finish)线程池已关闭");
}

/*
    线程池工作函数:
    while循环:等待任务，期间处于休眠状态，除非线程池关闭
    锁:访问队列时加锁，执行任务时解锁
    条件变量:没有任务时休眠，有任务时加锁
    任务:如果在任务队列中检测到有任务，被唤醒之后，从队列中取出，执行任务
*/

void ThreadPool::worker() {
    log("(worker)工作线程");
    while(true) {
        std::function<void()> job;
        {
            std::unique_lock<std::mutex> ul(mtx);
            cv.wait(ul, [this]() {return stop || !jobs.empty(); });

            if(stop && jobs.empty()) {
                log("(worker)工作线程已销毁");
                return;
            }
            job = std::move(jobs.front());
            jobs.pop();
        }
        job();
    }
}

/*
    线程池任务提交函数:
    模板:声明，接受任意任务，参数，回调
    返回值:future异步处理任务结果，最后执行回调
    returnType:任务自动获取到对应任务的返回值，用于回调
    job:任务包装，加入到队列中
    上锁访问队列:加入
*/

template<class F, class CB>
auto ThreadPool::submit(F&& f, CB&& cb) -> std::future<decltype(f())> {
    using returnType = decltype(f());// 获取返回值类型

    auto job = std::make_shared<std::packaged_task<returnType()>> (
        std::forward<F>(f)
    );// 任务包装器:在让多线程共享的前提下，将任务完美包装到job里
    std::future<returnType> res = job->get_future();// 获取结果

    {// 上锁访问队列
        std::lock_guard<std::mutex> lg(mtx);
        jobs.emplace([job, cb]() {
            (*job)();
            cb();
        });
    }
    cv.notify_one();// 唤醒线程，准备工作
    log("(submit)任务已加入队列");
    return res;
}
```

- `ThreadMain.cpp`:  
```
#include "Pool.h"

using namespace std;

// 阶乘
uint64_t factorial(int n) {
    uint64_t res = 1;
    for(int i = 2; i <= n; ++i) {
        res *= i;
        this_thread::sleep_for(chrono::milliseconds(100));// 模拟耗时长的任务
    }
    return res;
}

using Matrix = vector<vector<int>>;
// 矩阵乘法
Matrix MatrixMultiply(const Matrix& A, const Matrix& B) {
    int m = A.size();// 总数
    int n = B[0].size();// 列数
    int p = B.size();// 总数

    Matrix res(m, vector<int>(n, 0));

    for(int i = 0; i < m; ++i) {
        for(int j = 0; j < n; ++j) {
            for(int k = 0; k < p; ++k) {
                res[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    return res;
}

int main() {
    ThreadPool TPool(10);

    log("(main)测试矩阵乘法:");
    Matrix A = {{1, 2}, {3, 4}};
    Matrix B = {{5, 6}, {7, 8}};

    auto MatrixFuture = TPool.submit([=]() {
        return MatrixMultiply(A, B);
    }, []() {
        log("(callback)矩阵乘法任务已完成");
    });

    Matrix C = MatrixFuture.get();

    log("(main)矩阵结果:");
    for(auto& row : C) {
        for(int x : row) {
            log(to_string(x) + " ", 1);
        }
        log(" ");
    }

    log("(main)测试阶乘:");
    int n;
    log("(main)输入计算的阶乘数字: ");
    cin >> n;
    
    auto factorialFuture = TPool.submit([=]() {
        return factorial(n);
    }, []() {
        log("(callback)阶乘任务已完成");
    });
    log("(main)阶乘结果:");
    auto facResult = factorialFuture.get();
    log("(main)" + to_string(n) + "!= " + to_string(facResult));

    return 0;
}

```