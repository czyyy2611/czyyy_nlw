---
title : MIPS ?
---
# 常用的一些宏
1. 输入
    ```
    .macro input(%in)   #输入一个整数
        li $v0, 5
        syscall
        move %in, $v0
    .end_macro

    .macro input_char(%in)   #输入一个字符
        li $v0, 12
        syscall
        move %in, $v0
    .end_macro

    .macro input_str(%addr, %max_len)    #输入一个字符串
        li $v0,8
        la $a0, %addr
        move $a1, %max_len
        syscall
    .end_macro
    ```
2. 输出
   ```
    .macro print(%out)  # 输出一个整数
        li $v0, 1
        move $a0, %out
        syscall
    .end_macro

    .macro print_char(%out) # 打印一个字符
        li $v0, 11
        move $a0, %out
         syscall
    .end_macro

    .macro print_str(%addr) # 打印一个字符串
        li $v0, 4
        la $a0, %addr 
        syscall
    .end_macro
   ```
3. 打印换行
   ```
    .macro println()
        li $v0, 11
        li $a0, 10
        syscall
    .end_macro
   ```
4. 打印空格
   ```
    .macro printspace()
        li $v0, 11
        li $a0, 32
        syscall
    .end_macro
   ```
5. 计算二维数组字节偏移量
   ```
    .macro calc_addr(%dst, %row, %col, %rank)
        multu %row, %rank
        mflo %dst
        addu %dst, %dst %col
        sll %dst, %dst, 2
    .end_macro
   ```
6. 读数组元素 arr[index] -> %val (用到$t8 $t9) 
   字符串：去掉sll，lw -> lb
   ```
    .macro lw_arr(%val, %base, %index)
        sll $t8, %index, 2
        add $t9, %base, $t8
        lw %val, 0($t9)
    .end_macro
   ```
7. 写数组元素 %val -> arr[index] (用到$t8 $t9)
   字符串：去掉sll，lw -> lb
    ```
    .macro sw_arr(%val, %base, %index)
        sll $t8, %index, 2
        add $t9, %base, $t8
        sw %val, 0($t9)
    .end_macro
   ```
   ---
# 循环的写法
1. 单循环
    ```
    # s0 = n 
    li $t0, 0  # t0 = i = 0
    for_loop:
        beq $t0, $s0, end_for

         # code

        addi $t0, $t0, 1
        j for_loop
    end_for:
        # over
    ```
2. 双循环
   ```
    # s0 = n
    # s1 = m
    li	$t0, 0	# t0 = i = 0

    loop_i:
	    beq	$t0, $s0, end_loop_i
	    li	$t1, 0					# t1 = j = 0
    loop_j:
	    beq	$t1, $s1, end_loop_j

	    # code

	    addi	$t1, $t1, 1				# j++
	    j	loop_j
    end_loop_j:
	    addi	$t0, $t0, 1				# i++
	    j	i
    end_loop_i:
	    # over
   ```
   ---
# 递归
1. 可分为线性递归，树形递归，循环递归
   
2. 入栈出栈宏
   ```
    .macro push(%src)
        addi $sp, $sp, -4
        sw %src, 0($sp)
    .end_macro

    .macro pop(%src)
        lw %src, 0($sp)
        addi $sp, $sp, 4
    .end_macro
   ```
3. 写法
   ```
   func:
        # 1. 基线条件处理(停止递归)
        beq $a0, $zero, base_case

        # 2. 压栈
        push($ra)
        push($a0)
    
        # 3. 递归准备与调用
        addi $a0, $a0, -1   # 修改参数，准备下一层的入参
        
        jal func    # 递归调用

        move $s0, $v0   #存值（如果第二次还要调用）

        # 恢复参数

        # 4. 合并结果

        # 5. 弹栈
        pop($a0)
        pop($ra)

    base_case:  # 出口设置
        xxx
        jr $ra
   ```
   ---