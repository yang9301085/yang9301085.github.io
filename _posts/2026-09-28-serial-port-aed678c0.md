---
layout: "post"
title: "Serial Port"
date: "2026-09-28 12:00:00 +0800"
description: "板级 IO 与电源：Serial Port，整理自个人 BIOS / UEFI 笔记。"
categories: ["board"]
tags: ["BIOS", "UEFI"]
permalink: "/blog/notes/serial-port-aed678c0/"
note_import: true
render_with_liquid: false
toc: { "beginning": true }
related_posts: false
---

# 串口 UART

SuperIO 型号：ITE8316
虽然配置串口不会碰到这些寄存器，但也需要了解
UART 寄存器:
<img src="/assets/img/notes/5e2129e5240aa06167de.png" alt="Pasted image 20240301181541.png" loading="lazy">
DLAB: Divisor Latch Access Bit. Because some registers share the same address, it accesses a different register by this bit is 0 or 1.
几个比较重要的寄存器：
RBR/TBR： 也叫Data Register,TX/RX传输数据通过这个寄存器
LSR: 线路状态寄存器，表明当前通信的状态
<img src="/assets/img/notes/d0b51b654642f01072fa.png" alt="Pasted image 20240305091659.png" loading="lazy">
<img src="/assets/img/notes/0213bae5edf95b9a714b.png" alt="Pasted image 20240305091719.png" loading="lazy">
Bit0(Data Ready)为 1 时表明接收数据
Bit5 表明传输数据

在配置串口时，需要把SIO的GPIO功能开到COM功能
<img src="/assets/img/notes/c735628e166240ff69e4.png" alt="Pasted image 20240311141107.png" loading="lazy">
