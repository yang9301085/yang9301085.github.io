---
layout: "post"
title: "AMI ParseVeB 报错 “Expecting keyword” 或 “Unknown Token”"
date: "2026-09-28 12:00:00 +0800"
description: "调试案例与工具：AMI ParseVeB 报错 “Expecting keyword” 或 “Unknown Token”，整理自个人 BIOS / UEFI 笔记。"
categories: ["debug"]
tags: ["BIOS", "UEFI"]
permalink: "/blog/notes/ami-parseveb-encoding/"
note_import: true
render_with_liquid: false
toc: { "beginning": true }
related_posts: false
---

## 现象

修改 SDL / INF 文件后，构建工具出现以下报错：

```text
Expecting keyword
Unknown Token
```

本次笔记记录的是**文件保存为 UTF-16 后出现解析异常**的情况。相同报错也可能由语法错误引起，不能只凭报错文本判断编码。

## 可能原因

原有解析工具与新保存的文件编码不匹配。UTF-16 文件通常带有 BOM，ASCII 范围的字符在 UTF-16 中也常伴随零字节；不支持该编码的解析器可能把它们当成非法字符。

## 定位方法

1. 根据构建日志确认报错文件和行号，先检查是否确实存在语法错误。
2. 在编辑器中查看文件编码，并与同目录、可正常构建的 SDL / INF 文件比较。
3. 检查最近一次修改是否仅改变了编码、换行或文件头。

PowerShell 可只读查看文件开头的字节：

```powershell
Format-Hex -LiteralPath '.\Platform.sdl' | Select-Object -First 2
```

其中 `FF FE`、`FE FF` 常用于识别 UTF-16 的 BOM。最终仍应以编辑器识别结果和实际解析结果为准。

## 修复建议

使用编辑器按工程既有约定重新保存文件；本例可尝试 UTF-8 无 BOM。包含中文注释时，应检查字符是否完整，避免直接转为 ASCII 后丢失内容。

## 验证步骤

1. 确认修改前后正文和语法未被意外改变。
2. 重跑原先失败的解析或构建步骤，记录命令、退出码和日志。
3. 确认原报错消失，并且没有产生新的编码或语法问题。

此记录针对文件解析问题；具体支持哪些编码依赖工程所用工具版本。
