# Yang 的 BIOS 笔记

个人 BIOS / UEFI 学习笔记与固件调试博客，基于 Jekyll 和 [al-folio](https://github.com/alshedivat/al-folio)。

- [博客首页](https://yang9301085.github.io/)
- [BIOS 专题索引](https://yang9301085.github.io/bios/)
- [维护说明](docs/bios-notes-maintenance.md)

内容覆盖启动流程、平台初始化、内存与 SPD、PCIe、Setup / HII / TSE / Skia、板级 IO、显示和调试记录。

## 本地预览

```powershell
bundle config set --local path vendor/bundle
bundle install
$env:JEKYLL_ENV = 'production'
bundle exec jekyll build
python tools/check_bios_site.py
python tools/serve.py
```

打开 `http://127.0.0.1:4174`。详细迁移规则、待整理范围与验证命令见维护说明。

## 内容与主题

技术记录中的平台条件与参考出处应随正文保留。第三方代码与资料沿用各自的授权和来源说明；主题沿用仓库中的 MIT License。
