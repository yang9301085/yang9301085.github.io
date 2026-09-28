# BIOS 笔记维护

本轮迁移仅包含 BIOS / UEFI 相关内容：68 篇文章、9 个专题、158 张去重后的图片。原始 Obsidian 笔记保留在原目录，博客维护整理后的副本。

## 内容入口

- `_pages/bios-notes.md`：专题导航。
- `_posts/2026-09-28-*.md`：迁入的文章。
- `assets/img/notes/`：实际引用的图片，以内容哈希命名。
- 三篇优先整理的样稿：SEC、AMI ParseVeB 编码错误、AMI StatusCode 串口输出链路。

`date` 为整理日期，页面明确显示“整理于”。保留原文中的历史日期和平台上下文；本次迁移不代表重新验证了所有技术结论。

## 未发布条目

初筛的 105 个 Markdown 按以下方式处理：

| 处理方式                           | 数量 |
| ---------------------------------- | ---: |
| 迁为文章                           |   68 |
| 专题导航与聚合页，改为博客专题索引 |    9 |
| 空白页                             |   10 |
| 短条目，待补充                     |   13 |
| 重复或 mindmap 版本，合并到正文    |    2 |
| 明确保密标记的 MRC 资料            |    1 |
| MSR 长篇资料，待进一步整理         |    1 |
| 仅引用原始 PDF 的资料索引          |    1 |

纯编程、OpenClaw、英语和旅游内容不在本轮范围。原始 PDF、EFI/LOM 工具、日志和独立代码附件未随文发布；文章相应位置标明附件未发布，避免留下无效链接。远程引用和远程图片保留原地址，外站可用性不包含在本地链接检查中。

## 本地验证与预览

需要 Ruby / Bundler、Python 3 和 Node.js。依赖版本由 `Gemfile.lock` 和 `package-lock.json` 保存。

```powershell
bundle config set --local path vendor/bundle
bundle install
npm ci
python -m unittest discover -s tools -p 'test_*.py'
$env:JEKYLL_ENV = 'production'
bundle exec jekyll build
python tools/check_bios_site.py
python tools/serve.py
```

预览地址为 `http://127.0.0.1:4174`。预览服务器显式设置 JavaScript MIME 类型，避免 Windows 文件关联使 ES modules 被当作普通文本。

旧主题使用的 Sass `@import` 等语法仍有弃用提示；当前构建可以完成。Sass 已压缩 CSS，因此关闭了 `jekyll-minifier` 的重复 CSS 压缩。

## 继续整理笔记

`tools/import_bios_notes.py` 是单向迁移工具：输出必须是空的暂存目录，工具不会覆盖博客中的人工整理结果，也不会修改源笔记或执行 Git 操作。

```powershell
python tools/import_bios_notes.py --source '<笔记目录>' --output '<空的暂存目录>' --date YYYY-MM-DD
```

工具输出的 `migration-audit.json` 包含源文件哈希和待处理引用，应留在本地审核。自动转换之后仍需检查正文、图片和附件，不要将暂存目录整体上传。三篇样稿和 ACPI 锚点包含人工编辑，重新迁移时应保留这些编辑。

新增文章时沿用稳定的 `/blog/notes/<slug>/` 地址，把专题入口补到 `_pages/bios-notes.md`。若只是更新正文，不必改变 URL。
