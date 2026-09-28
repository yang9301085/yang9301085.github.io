---
layout: "post"
title: "DSC中的inc"
date: "2026-09-28 12:00:00 +0800"
description: "UEFI 启动与基础：DSC中的inc，整理自个人 BIOS / UEFI 笔记。"
categories: ["uefi"]
tags: ["BIOS", "UEFI"]
permalink: "/blog/notes/edk2-dsc-include/"
note_import: true
render_with_liquid: false
toc: { "beginning": true }
related_posts: false
---

在EDK 中的DSC文件中存在inc的引用：
inc是include的缩写，edk用\*. inc文件表示这个文件将会被应用到其他文件中

```
!include NetworkPkg/Network.fdf.inc
```

在编译过程中，编译工具会把inc文件中的内容copy出来fang到目标文件中
edk的DSC SPEC对于 `!include` 也有说明，实际上这个文件不一定非要以inc命名，其他的也可以
<img src="/assets/img/notes/6d4466602f71b9f41701.png" alt="Pasted image 20240108182821.png" loading="lazy">
