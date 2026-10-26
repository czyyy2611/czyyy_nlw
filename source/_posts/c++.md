---
title : learn c++
---
# 基本语法
1. 格式
   ```cpp
    #include <iostream>
    #include <bits/stdc++.h>
    using namespcae std;
    int main() {


        return 0;
    }
   ```
2. 输入输出
   ```cpp
    cin >> a >> b;
    cout << a << b << endl;
   ```
3. 字符串(string 类)
   主要操作： s = s1 + s2
   getline(cin, s3)     
   s.length() 
   s.substr(n, m)   //从第n个开始截取(算它本身),截m个
   s.substr(n)      //从第n个开始截取(算它本身),一直截到尾
4. 结构体
   省去了typedef

---
# STL
1. 基本
   计算长度用 .size()
   定义方式 STL容器名 <类型> 名字
   迭代器 (c++ 11)
   ```cpp
   for(auto p = q.begin(); p != q.end(); p++)//这个就是迭代器
	{
		cout<<*p<<" ";
	}
    ```
2. vector
     ```cpp
   vector <int> q;//创建名为q的一个int型动态数组，默认值是0
	vector <int> a(10);//创建一个长度为10的动态数组，默认值是0
	vector <int> b(10,2);//创建一个长度为10，元素值均为2的动态数组
   q.resize(10);//为q分配10个空间
   q.push_back(1);//往q里增加一个1
    ```
3. set (会按从小到大自动排好)
    ```cpp
    set <int> s;
    s.insert(4);
    s.find(2);  //find()是查找函数，其返回值是一个指针，所以只能用比较的方法来输出
    cout << (s.find(2)!=s.end()) << endl;
    s.erase(2);
    ```
4. map (会按从小到大自动排序)
   ```cpp
   map <string, int> m;
   p->first //键
   p->second //值
   ```

5. unordered_set, unordered_map;
   
6. stack
    ```cpp
    s.push(1);
    s.top();
    s.pop();
    ```
7. queue
   ```cpp
   q.push(1);
   q.front();
   q.back();
   q.pop();
   ```
   栈和队没有迭代器
---
# 常用函数
1. sort
   ```cpp
   sort(a, a + n);
   sort(v.begin(), v.end());
   ```
   用cmp自定义排序顺序
   ```cpp
    bool cmp(int x, int y) {    //只能有 > <
        return x > y;   //从大到小排
    }
   ```
2. cctype
   ```cpp
    isalpha();
    islower()
    isupper()
    isalnum()
    isspace()
    tolower()
    toupper()
   ```
3. bitset
   
4. C++ 11
   1. auto
   2. for(int i : a), for(int &i : a)
   3. to_string(),  stoi(), stod()...
---
参考：<https://blog.csdn.net/wfuzhuandaaliu/article/details/122518316>
找了一些发现内容都差不多