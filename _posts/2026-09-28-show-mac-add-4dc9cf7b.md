---
layout: "post"
title: "Show MAC ADD"
date: "2026-09-28 12:00:00 +0800"
description: "UEFI 启动与基础：Show MAC ADD，整理自个人 BIOS / UEFI 笔记。"
categories: ["uefi"]
tags: ["BIOS", "UEFI"]
permalink: "/blog/notes/show-mac-add-4dc9cf7b/"
note_import: true
render_with_liquid: false
toc: { "beginning": true }
related_posts: false
---

BIOS UI show MAC address
`AmiCompatibilityPkg\Setup\DynamicPages.sd`下

```C
    #ifdef FORM_SET_VARSTORE

        #if SETUP_GROUP_DYNAMIC_PAGES

            varstore DYNAMIC_PAGE_COUNT, key = DYNAMIC_PAGE_COUNT_KEY_ID,  

                name = DynamicPageCount, guid = DYNAMIC_PAGE_COUNT_GUID;

        #endif

        #if DRIVER_HEALTH_SUPPORT

            varstore DRIVER_HEALTH_ENABLE, key = DRIVER_HEALTH_ENB_KEY_ID,

                name = DriverHlthEnable, guid = AMITSE_DRIVER_HEALTH_ENB_GUID;



            varstore DRIVER_HEALTH, key = DRIVER_HEALTH_KEY_ID,

                name = DriverHealthCount, guid = AMITSE_DRIVER_HEALTH_GUID;



            varstore DRIVER_HEALTH_CTRL_COUNT, key = DRIVER_HEALTH_CTRL_KEY_ID,

                name = DrvHealthCtrlCnt, guid = AMITSE_DRIVER_HEALTH_CTRL_GUID;

        #endif

    #endif //FORM_SET_VARSTORE



    #ifdef FORM_SET_GOTO

       //Y240520_show MAC ADD list and other item-s    

       SEPARATOR

       #if SETUP_GROUP_DYNAMIC_PAGES

           AMI_TSE_GROUP_DYNAMIC_PAGES

       #endif

       //Y240520_show MAC ADD list and other item-e  

        SEPARATOR

        #if DRIVER_HEALTH_SUPPORT

            AMI_TSE_DRIVER_HEALTH_GOTO

        #endif //DRIVER_HEALTH_SUPPORT

    #endif //FORM_SET_GOTO
```
