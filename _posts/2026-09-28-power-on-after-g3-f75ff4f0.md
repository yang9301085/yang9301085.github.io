---
layout: "post"
title: "Power On After G3"
date: "2026-09-28 12:00:00 +0800"
description: "板级 IO 与电源：Power On After G3，整理自个人 BIOS / UEFI 笔记。"
categories: ["board"]
tags: ["BIOS", "UEFI"]
permalink: "/blog/notes/power-on-after-g3-f75ff4f0/"
note_import: true
render_with_liquid: false
toc: { "beginning": true }
related_posts: false
---

# 来电开机功能

硬件层：
<img src="/assets/img/notes/0d4dd4bb8765c5a32572.png" alt="Pasted image 20240314165424.png" loading="lazy">
SIO的PME#会连到GPIO13（X99 Platform）
<img src="/assets/img/notes/2ae1559d9b77010cb33f.png" alt="Pasted image 20240314171824.png" loading="lazy">
<img src="/assets/img/notes/57a5471f794a0892aa7a.png" alt="Pasted image 20240314171908.png" loading="lazy">
<img src="/assets/img/notes/480b89a158d6071ad7c7.png" alt="Pasted image 20240314171938.png" loading="lazy">

- SuperIO关于ACPI POWER LOSS功能配置的描述

<img src="/assets/img/notes/d4bf68621e0d5082fc95.png" alt="Pasted image 20240314155252.png" loading="lazy">
<img src="/assets/img/notes/6398ba6172b206b0ea4c.png" alt="Pasted image 20240314163729.png" loading="lazy">

<img src="/assets/img/notes/700ad4b36bfaf44878b6.png" alt="Pasted image 20240314163834.png" loading="lazy">

```C
void PowerB_Last_state()
{

    UINT8 bData;
   
    if (Power_Loss_status == 2)
    {
   
        IoWrite8(0x2e, 0x87);
        IoWrite8(0x2e, 0x87);
       
        IoWrite8(0x2e, 0x07);
        IoWrite8(0x2f, 0x0a);
       
        IoWrite8(0x2e, 0xe4);
        bData |= BIT6;
        bData |= BIT5;
        IoWrite8(0x2f, bData);
       
        IoWrite8(0x2e, 0xE7);
        bData &= ~BIT4;
        IoWrite8(0x2f, bData);
       
        IoWrite8(0x2e, 0xE6);
        bData |= BIT4;
        IoWrite8(0x2f, bData);

        IoWrite8(0x2e, 0xaa);

    }

}
```
