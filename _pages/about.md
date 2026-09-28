---
layout: page
title: Yang 的 BIOS 笔记
permalink: /
description: BIOS / UEFI 学习笔记与固件调试记录
---

这里记录我在 BIOS / UEFI 开发中积累的学习笔记、代码阅读和板级调试经验。

**[进入 BIOS 专题索引](/bios/)** · [浏览全部文章](/blog/)

## 按主题阅读

- **启动与基础**：SEC、PEI、EDK2、启动项、PXE 与恢复流程。
- **平台初始化**：CPU、内存、SPD、PCIe、TPM 和板级 IO。
- **界面与显示**：Setup、HII、AMI TSE、Skia、GOP 与显示输出。
- **调试记录**：串口输出、设备枚举、启动耗时和具体问题复盘。

## 推荐起点

1. [SEC 阶段与 Reset Vector](/blog/notes/sec/)
2. [PEI 阶段流程概览](/blog/notes/pei/)
3. [AMI StatusCode 串口输出链路](/blog/notes/ami-status-code-serial/)
4. [AMI ParseVeB 文件编码报错](/blog/notes/ami-parseveb-encoding/)

## 关于这些笔记

文章整理自日常工作和学习记录。平台路径、宏、寄存器以及问题结论保留原有上下文，应用到其他平台时需要重新核对。

文章上的“整理日期”表示迁入博客的日期，不代表原始记录时间。
