---
title : OOPre
date : 2026-10-29
---
---
# 学习内容
>1. Java基础
>2. 类与对象
>3. 继承与接口
>4. 错误分析
>5. 容器与层次化
>6. 设计模式
>7. 递归下降
---
# Java基础
1. 输入 Scanner
   ```Java
    import java.util.Scanner

    Scanner scanner = new Scanner(System.in);
    int a = scanner.nextInt();
    double b = scanner.nextDouble();
    String c = scanner.next();//next以空白符为分割
    String d = scanner.nextLine();//nextLine以换行符为分割
   ```
2. 输出 System
   ```Java
    System.out.println();
   ```
3. 访问权限
   public, protected, private
4. static
   用于声明类的属性和方法；静态属性可以被类的所有对象共享访问；免实例调用
5. final
   不可变；不可重写；不可继承
---
# 类与对象
1. 主类
   ```java
   public static void main(String[ ] args){
	// 程序入口
    }
    ```
2. 构造方法
    与类同名；用 this. 构造
3. get方法与set方法
---
# 继承与接口
1. 抽象类，方法
   `abstract`，不能实例化
2. 重写
   `@Override`
   要求方法名称，参数与返回类型保持一致；重写的可见性>=父类方法
## 继承
1. 继承的写法
    使用 `子类 extends 父类`
2. 访问权限
   子类不能访问父类的private字段，需改成protected
3. 构造方法
   可以用`super(...)`调用父类的构造方法；若显式调用，`super(...)`必须是子类构造方法的第一条语句
4. 其他方法
   可以直接通过`super.`调用父类方法
## 接口
1. 接口的写法
   `interface 接口名`
   `类名 implements 接口名`
2. 接口方法
   隐含为`public abstract`，实现类的对应方法也必须是`public`
3. `instanceof`
   检查是否是目标类型，可以用以检测是否为接口的实例
---
# 错误分析
1. 基本类型和引用类型
   基本类型直接存*值*，引用类型存的是*引用地址*
2. 引用赋值
   `Book book2 = book1`，两个变量引用同一个目标，相当于形成别名
3. 浅复制
   新旧对象共享同一个内部对象
4. 深复制
   新旧对象完全独立，互不影响；所以对容器的深复制需要遍历所有对象，逐个深复制
5. `==`与`equals`
   `==`用于判断二者是否指向同一对象，也就是地址是否相同 `equals`只判断内容是否相同
6. Scanner常见问题
   >Scanner.next() 读取下一个以空白字符分隔的内容，Scanner.nextLine() 读取当前行剩余内容。混合使用时，前一个读取操作留下的换行符可能使 nextLine() 立即返回空串。
7. 遍历删除错误
   不要在增强for循环中增删改变容器的状态，因为删除方法不会改变迭代器的状态，导致迭代器状态与容器状态不一致从而出错
8. 下标与substring
   subbstring(beginIndex, endIndex)是左闭右开区间

---
# 容器与层次化
## 容器
1. 需要 `import java.util.ArrayList`（对应）
2. ArrayList
   基本用法：
   ```java
   ArrayList<Potion> potions = new ArrayList<>();//创建
   potions.add(potion1);//加入一个元素
   potions.set(1, potion2);//修改下标为1的元素
   Potion potion = potions.gets(i);//访问下标为i的元素
   potions.contains("A");//是否包含某元素
   int size = potions.size();//大小
   for (Potion item : potions){
      //遍历
   }
   potions.remove(i);//删除
   potions.clear();//清空所有
   ```
3. HashMap
   存储无序
   ```java
   HashMap<String, Item> items = new HashMap<>();
   //<Key, Value>
   items.put(item1.getId(), item1);//加入，用的是*put*
   items.get(item1.getId());//访问key值对应的value
   items.containsKey(item1.getId());//检查是否存在key对应的映射关系
   items.containsValue(item2);//检查是否存在value对应的映射关系
   items.size();
   for (String key : items.keySet()) { // keySet 可以获取所有 key 组成的集合
         
   }
   for (Item value : items.values()) { // values 可以获取所有 value 组成的集合
   
   }
   items.remove(item1.getId());//删除一个映射关系
   items.remove(item2.getId(), item2);//删除一个键值对；仅当该 key 当前映射到该 value 时才能删除
   ```
4. HashSet
   本质是只保存key的HashMap
   ```java
   HashSet<Item> items = new HashSet<>();
   items.add(item1);
   items.contains(item1);
   size(); remove();
   ```
## 层次化对象管理
1. 组合关系
   多个对象组合形成一个更大的对象；这是一种整体与部分的关系
2. 聚合关系
   相互独立，弱关联
---
# 设计模式
1. 工厂模式
   1. 简单工厂模式
   定义一个类（工厂）负责创建其他类的实例；由产品抽象父类Product，具体产品ProductA，工厂类Factory：public static Product create(String type)构成；
   2. 工厂方法模式
   定义一个用于创建对象的接口，让具体工厂子类决定实例化哪个产品类；构成：工厂接口 Factory，具体工厂 FactoryA
   3. 抽象工厂模式
   提供创建一组相关产品（产品族）的接口；构成：产品族，工厂接口 Factory：声明多个创建方法，具体工厂
2. 观察者模式
   被观察者Subject，需维护观察者列表，增删观察者，事件触发时发出通知；观察者Observer，提供响应方法，收到通知后响应
   定义被观察者和观察者接口；具体实现类实现接口；
---
# 递归下降
1. 词法分析Lexer
   把Expr拆成Token，一般有peek(), next()方法
2. 语法分析Parser
   以下内容来自指导书
   ```java
   parseExpr:
    新建一个Term的容器T
    调用parseTerm获得一个项t
    T中加上parseTerm返回的项t
    while 当前token是+:
        跳过当前token(+)
        调用parseTerm获得一个项t
        T中加上parseTerm返回的项t
    利用T生成一个新的Expr e
    返回e

    parseTerm:
    新建一个Factor的容器F
    调用parseFactor获得一个因子f
    F中加上parseFactor返回的因子f
    while 当前token是*:
        跳过当前token(*)
        调用parseFactor获得一个因子f
        F中加上parseFactor返回的因子f
    利用F生成一个新的Term t
    返回t

    parseFactor:
    检查当前的token是否是i
    跳过当前的token(i)
    利用i生成一个新的Factor f
    返回f

    parseFactor:
    检查当前的token是否是i
    if 真:
        跳过当前的token(i)
        利用i生成一个新的Factor f
        返回f
    if 假，说明是(表达式):
        跳过当前token('(')
        调用parseExpr获得一个表达式e
        利用e生成因子f
        跳过当前token(')')
        返回f
   ```
---
参考：OOpre指导书