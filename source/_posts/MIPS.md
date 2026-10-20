# 常用的一些宏
1. 输入
    ```Mipsasm
    .macro input(%in)
        li $v0, 5
        syscall
        move %in, $v0
    .end_macro
    ```
2. 输出
   ```
    .macro print(%out)
        li $v0, 1
        move $s0, %out
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
   ```
    .macro lw_arr(%val, %base, %index)
        sll $t8, %index, 2
        add $t9, %base, $t8
        lw %val, 0($t9)
    .end_macro
   ```
7. 写数组元素 %val -> arr[index] (用到$t8 $t9)
    ```
    .macro sw_arr(%val, %base, %index)
        sll $t8, %index, 2
        add $t9, %base, $t8
        sw %val, 0($t9)
    .end_macro
   ```
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