---
layout: "post"
title: "Option Rom(OpRom)"
date: "2026-09-28 12:00:00 +0800"
description: "PCIe 与存储：Option Rom(OpRom)，整理自个人 BIOS / UEFI 笔记。"
categories: ["pcie"]
tags: ["BIOS", "UEFI"]
permalink: "/blog/notes/option-rom-oprom-a1d19749/"
note_import: true
render_with_liquid: false
toc: { "beginning": true }
related_posts: false
---

Option ROM就是在位于PCI或者ISA设备上的只读存储器，因为这个存储器不是总线标准规定一定要实现的，所以叫Option ROM（可选实现的ROM）。
Option ROM里面通常存放着用于初始化该设备的数据和代码。显卡和网卡等设备上通常带有Option ROM。简单来说，在它的开始处，总是一个固定结构的头结构，称为PnP Option ROM Header。

## UEFI 中OpRom SPEC

<img src="/assets/img/notes/059483338355fcd4e33a.png" alt="1710224793830.png" loading="lazy">
