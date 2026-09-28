---
layout: "post"
title: "N100 NVME+WIFI hang Windows OS logo"
date: "2026-09-28 12:00:00 +0800"
description: "PCIe 与存储：N100 NVME+WIFI hang Windows OS logo，整理自个人 BIOS / UEFI 笔记。"
categories: ["pcie"]
tags: ["BIOS", "UEFI"]
permalink: "/blog/notes/n100-nvme-wifi-hang-windows-os-logo-1616d076/"
note_import: true
render_with_liquid: false
toc: { "beginning": true }
related_posts: false
---

N100 4L项目存在两个设备共享同一PCIe时钟的情况

<img src="/assets/img/notes/09b027407e1335b1a113.png" alt="Pasted image 20251024141019.png" loading="lazy">

<img src="/assets/img/notes/f7245b9ac568b6f963b8.png" alt="Pasted image 20251024141209.png" loading="lazy">

两个PCIe设备用同一个clock的时候，要设置clock时钟自动输出
否则的话NVME设备可能和Intel wifi设备冲突，hang在Windows logo的地方
