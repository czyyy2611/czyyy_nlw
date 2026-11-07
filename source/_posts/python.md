---
title : learn Python
date : 2026.11.3
---
# 与C的区别
1. 无需入口函数
2. 使用严格缩进（4个空格），而不是{}
3. 不需要分号，直接换行
---
# 输入输出与变量
## 变量
```py
name = "zhangsan"
age = 18
price = 9.9
is_student = True
```
## 输出
`print()`默认自动换行，f-string，变量直接放进{}
```py
print(f"姓名: {name}, 年龄: {age}")
print(f"价格保留两位小数: {price:.2f}") # 用 :.2f 类似的来保留小数
```
## 输入
input()统一读取为字符串,需要数字运算时，显式调用类型转换函数 int() 或 float()
input().split() 按空格切分，map(int, ...) 把切出来的每一项转为 int
```py
age = int(input("请输入年龄："))
x, y = map(int, input("请输入两个数字: ").split())
```
---
# 流程控制
## 条件判断
省略小括号，结尾跟冒号，逻辑与或非直接用`and or not`
注意是*elif*
```py
if score >= 90:
    print("优秀")
elif score >= 60 and score < 90:
    print("及格")
else:
    print("不及格")
```
## 循环结构
`range(start, end, step)`左闭右开
```py
for i in range(5):  # 0,1,2,3,4
    print(i)
```
用`enumerate()`获取下标
```py
for i, item in enumerate(fruits):
```
while循环条件不需要加括号
---
# 容器与数据结构
## 列表
变长动态数组（有点像vector），*能存任意混合类型*
a = [1, 2, 3, 4, 5]
b = list(range(5))
负索引：a[-1] # 5 最后一个
    a[-2] # 4 倒数第二个
切片：左闭右开
a[2:6] a[:4] a[6:] a[::-1]
```py
a.append(4)        # 末尾加一个
a.extend([5,6])    # 末尾加多个
a.insert(0, 0)     # 指定位置插入
a.pop()        # 弹出末尾元素（返回被弹出的值，对标 stack 的 pop）
a.pop(0)       # 弹出指定下标的元素
a.remove(2)    # 按值删除：直接删除列表中第一个出现的数值 2
```
## 元组
可以理解为只读的列表

## 字典
原生内置高度优化的散列表，直接通过大括号 {key: value} 操作
```py
user = {"name": "wangwu", 101: "客服热线"}
print(user.get("name"))
print(user["name"]) # 两种查找方式
# 增，改直接写就好了
del info["age"]
info.pop("city") # 删
for subject in scores: # 相当于for subject in scores.keys():

for val in scores.values():

for subject, val in scores.items(): # .items() 产出的本质是一个个 (key, value) 的元组

```
---
# 函数
可返回多个值
```py
def get_user_info():
    name = "lisi"
    age = 18
    return name, age

user_name, user_age = get_user_info()
```

---
参考：