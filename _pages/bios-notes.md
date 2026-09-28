---
layout: "page"
title: "BIOS 笔记"
permalink: "/bios/"
nav: true
nav_order: 1
description: "启动流程、平台初始化与固件调试专题索引"
---

按主题查找 BIOS / UEFI 学习笔记和调试记录。文章日期为本次整理日期。

> 笔记中的平台路径、寄存器与调试结论对应原记录环境，使用时需结合目标平台核对。

## 从这里开始

- [SEC：启动与临时内存](/blog/notes/sec/)
- [PEI：初始化与 PPI](/blog/notes/pei/)
- [AMI StatusCode 串口输出链路](/blog/notes/ami-status-code-serial/)
- [AMI ParseVeB 编码报错](/blog/notes/ami-parseveb-encoding/)

## UEFI 启动与基础

- [Beep](/blog/notes/beep-1ac3cd87/)
- [BIOS 系统语言](/blog/notes/bios-d6cbac36/)
- [DSC中的inc](/blog/notes/edk2-dsc-include/)
- [Dump Variable in shell](/blog/notes/dump-variable-in-shell-44faf5ed/)
- [EDK](/blog/notes/edk-8ae4fcb1/)
- [FixBootOrder](/blog/notes/fixbootorder-0ae2bed9/)
- [PEI](/blog/notes/pei/)
- [POST过程中按F9 跳转WinRE](/blog/notes/post-f9-winre-0c1cf3cc/)
- [PXE](/blog/notes/pxe-2103aca7/)
- [SEC 阶段与 Reset Vector](/blog/notes/sec/)
- [Show MAC ADD](/blog/notes/show-mac-add-4dc9cf7b/)
- [如何在操作系统下获得BIOS和硬件信息（一）：什么是DMI和WMI？](/blog/notes/bios-dmi-wmi-c1257cd0/)
- [深入UEFI内核](/blog/notes/uefi-2a3f07bd/)

## 平台与 CPU

- [AMD-ITX-FP5](/blog/notes/amd-itx-fp5-c44237b9/)
- [CPU](/blog/notes/cpu-84664b75/)
- [CPU information](/blog/notes/cpu-information-7190389d/)
- [CPU Power Consumption](/blog/notes/cpu-power-consumption-8e408a75/)

## 内存与 SPD

- [FSB ：DRAM](/blog/notes/fsb-dram-987604b5/)
- [Memory Controller](/blog/notes/memory-controller-ed9d8d38/)
- [Memory Overview](/blog/notes/memory-overview-ab651482/)
- [Memory Slot](/blog/notes/memory-slot-1b6b2fe3/)
- [Memory timing not match SPEC issue](/blog/notes/memory-timing-not-match-spec-issue-e1cf3bcb/)
- [SDRAM](/blog/notes/sdram-9dbf5997/)
- [SPD (serial presence detect)](/blog/notes/spd-serial-presence-detect-97180b71/)

## PCIe 与存储

- [AMD 配置PCIe clock](/blog/notes/amd-pcie-clock-f6b38703/)
- [M.2](/blog/notes/m2-signals/)
- [N100 NVME+WIFI hang Windows OS logo](/blog/notes/n100-nvme-wifi-hang-windows-os-logo-1616d076/)
- [NVMe首启调试会话总结-2026-03-17](/blog/notes/nvme-first-boot-debug/)
- [Option Rom(OpRom)](/blog/notes/option-rom-oprom-a1d19749/)
- [PCI](/blog/notes/pci-ebf572ee/)
- [PCI总线组成结构](/blog/notes/pci-4057e43c/)
- [PCI通义万问](/blog/notes/pci-66694d7f/)
- [X1设备找不到](/blog/notes/pcie-x1-enumeration/)
- [X99 H81 PCIE X1 改X4](/blog/notes/x99-h81-pcie-x1-x4-311f6f34/)

## Setup / HII / TSE / Skia

- [AMI POST Manager Protocol](/blog/notes/ami-post-manager-protocol-bc0b7598/)
- [AMITse](/blog/notes/amitse-133a7a5a/)
- [AmiTsePkg*SkiaPkg*刷新机制详细分析](/blog/notes/amitsepkg-skiapkg-2bc28f95/)
- [BIOS AMI TSE NAVIGATION](/blog/notes/bios-ami-tse-navigation-2e4419bb/)
- [BIOS setup UI add item](/blog/notes/bios-setup-ui-add-item-ade7a8db/)
- [logo](/blog/notes/logo-0a6c2bb6/)
- [LOGO inmp](/blog/notes/logo-inmp-b404274b/)
- [RegisterNotification](/blog/notes/registernotification-9e552407/)
- [Skia](/blog/notes/skia-surface/)
- [Skia GOP](/blog/notes/skia-gop/)

## 板级 IO 与电源

- [GPIO](/blog/notes/gpio/)
- [Intel 8042](/blog/notes/intel-8042-36b0f385/)
- [Power On After G3](/blog/notes/power-on-after-g3-f75ff4f0/)
- [PS2](/blog/notes/ps2-f64a08f7/)
- [pull-up_pull-down](/blog/notes/pull-up-pull-down-15139afe/)
- [Serial Port](/blog/notes/serial-port-aed678c0/)
- [SIO温度监测模式设置](/blog/notes/sio-temperature/)
- [Wake on LAN](/blog/notes/wake-on-lan/)
- [WDT](/blog/notes/wdt-6b566e44/)
- [边沿触发&电平触发](/blog/notes/note-5353c57a/)

## 显示与音频

- [2026-04-20-DP-Hotplug-Win11-复盘](/blog/notes/dp-hotplug-windows11/)
- [AMD Display](/blog/notes/amd-display-f94371dc/)
- [AUDIO](/blog/notes/audio-d8a45732/)
- [DP++](/blog/notes/dp-d43433e0/)
- [GOP](/blog/notes/gop/)

## 调试案例与工具

- [AMI ParseVeB 报错 “Expecting keyword” 或 “Unknown Token”](/blog/notes/ami-parseveb-encoding/)
- [AmiStatusCode 串口输出链路](/blog/notes/ami-status-code-serial/)
- [Boot time so long](/blog/notes/boot-time-so-long-3e449090/)
- [DEBUG Log](/blog/notes/debug-log-d3a3dd83/)
- [DetectTimeoutMs](/blog/notes/detecttimeoutms-872f926d/)
- [DOS Hang](/blog/notes/dos-hang-92a39ab1/)

## TPM 与平台安全

- [AMD PSP](/blog/notes/amd-psp-3d539823/)
- [Set dTPM by default](/blog/notes/dtpm-default/)
- [TPM](/blog/notes/tpm/)
