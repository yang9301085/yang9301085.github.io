"""One-way BIOS note migration. Source files are never modified.

Run into an empty staging directory, inspect the result, then copy approved
files into the blog. This tool never commits, pushes, or downloads references.
"""
import argparse
from collections import Counter, defaultdict
import hashlib
import html
import json
from pathlib import Path
import re
import shutil
from urllib.parse import unquote


EXCLUDED = {'.git', '.obsidian', '.workbuddy', 'OpenClaw', 'English_Learn',
            '99-Archive', 'C', 'C++', 'Python Notes', 'Assembly', 'MakeFile',
            'MSCV Compiler'}
EXCLUDED_NAMES = {'README.md', '上海跨年旅游攻略.md', 'Assembly Notes.md',
                  'C language Notes.md', 'Compile Notes.md'}
IMAGES = {'.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif', '.svg'}
WIKI = re.compile(r'(!?)\[\[(.*?)\]\]')
MARKDOWN = re.compile(r'(!?)\[([^\]\n]*)\]\((<[^>\n]+>|[^)\n]+)\)')
CATEGORIES = {
    'uefi': 'UEFI 启动与基础', 'platform': '平台与 CPU',
    'memory': '内存与 SPD', 'pcie': 'PCIe 与存储',
    'setup': 'Setup / HII / TSE / Skia', 'board': '板级 IO 与电源',
    'display': '显示与音频', 'debug': '调试案例与工具',
    'security': 'TPM 与平台安全',
}
SLUGS = {'SEC': 'sec', 'PEI': 'pei', 'GPIO': 'gpio', 'GOP': 'gop',
         'AmiStatusCode 串口输出链路': 'ami-status-code-serial',
         'AMI ParseVeB 报错 “Expecting keyword” 或 “Unknown Token”': 'ami-parseveb-encoding',
         'M.2': 'm2-signals', 'Skia GOP': 'skia-gop', 'Skia': 'skia-surface',
         'TPM': 'tpm', 'Set dTPM by default': 'dtpm-default',
         'Wake on LAN': 'wake-on-lan', 'SIO温度监测模式设置': 'sio-temperature',
         'X1设备找不到': 'pcie-x1-enumeration',
         'NVMe首启调试会话总结-2026-03-17': 'nvme-first-boot-debug',
         '2026-04-20-DP-Hotplug-Win11-复盘': 'dp-hotplug-windows11',
         'DSC中的inc': 'edk2-dsc-include'}


def category(relative):
    n = relative.lower()
    if 'n100 nvme' in n: return 'pcie'
    if 'cpu power' in n or n.endswith('/cpu.md'): return 'platform'
    if any(x in n for x in ['tpm', 'psp']): return 'security'
    if any(x in n for x in ['memory', 'spd', 'sdram']): return 'memory'
    if any(x in n for x in ['skia', 'tse', 'bios ui', 'setup', 'logo',
                             'advanced page', 'new item', 'post manager']): return 'setup'
    if any(x in n for x in ['pcie', '/pci', 'nvme', 'm.2', 'x1设备', 'oprom']): return 'pcie'
    if any(x in n for x in ['gpio', 'superio', '8042', 'serial port', 'ps2',
                             'wdt', '温度', '电平', 'pull-', 'g3', 'wake', 'pwm']): return 'board'
    if any(x in n for x in ['display', 'gop', 'dp++', 'audio', 'hotplug']): return 'display'
    if any(x in n for x in ['cpu information', '/msr', '/tvb', 'load line', 'amd-itx']): return 'platform'
    if any(x in n for x in ['debug', 'hang', 'timeout', 'parseveb', 'statuscode', '串口输出']): return 'debug'
    return 'uefi'


def slug(path):
    if path.stem in SLUGS: return SLUGS[path.stem]
    name = re.sub(r'[^a-z0-9]+', '-', path.stem.lower()).strip('-')[:55]
    suffix = hashlib.sha256(path.as_posix().encode()).hexdigest()[:8]
    return (name or 'note') + '-' + suffix


class Resolver:
    def __init__(self, root, files):
        self.root = root.resolve()
        self.exact = {}
        self.names = defaultdict(set)
        for p in files:
            key = p.relative_to(root).as_posix().casefold()
            self.exact[key] = p
            self.names[p.name.casefold()].add(p)
            if p.suffix == '.md':
                self.exact[key[:-3]] = p
                self.names[p.stem.casefold()].add(p)

    def find(self, target, parent=None):
        literal = target.replace('\\', '/').strip().casefold()
        if literal in self.exact: return self.exact[literal]
        matches = self.names.get(literal, set())
        if len(matches) == 1: return next(iter(matches))
        target = unquote(target).replace('\\', '/').strip()
        if parent:
            candidate = (parent / target).resolve()
            if candidate.is_relative_to(self.root):
                rel = candidate.relative_to(self.root).as_posix().casefold()
                if rel in self.exact: return self.exact[rel]
        if target.casefold() in self.exact: return self.exact[target.casefold()]
        matches = self.names.get(target.casefold(), set())
        return next(iter(matches)) if len(matches) == 1 else None


class Converter:
    def __init__(self, notes, images, withheld, resolve=None):
        self.notes, self.images, self.withheld = notes, images, withheld
        self.resolve = resolve
        self.warnings = []

    def target(self, target):
        if target in self.notes: return 'note', self.notes[target]
        if target in self.images: return 'image', self.images[target]
        if target in self.withheld: return 'withheld', self.withheld[target]
        if self.resolve: return self.resolve(target)
        return 'withheld', '附件或条目未随文发布'

    def wiki(self, match):
        embed, raw = match.groups()
        target, _, alias = raw.partition('|')
        target, _, anchor = target.partition('#')
        target, alias = target.strip(), alias.strip()
        kind, value = self.target(target)
        label = alias or target or anchor
        if kind == 'withheld':
            self.warnings.append({'target': target, 'reason': value})
            return html.escape(label) + '（' + value + '）'
        if kind == 'image':
            size = re.fullmatch(r'(\d+)(?:x(\d+))?', alias)
            alt = target if size else label
            dimensions = (' width="' + size[1] + '"') if size else ''
            if size and size[2]: dimensions += ' height="' + size[2] + '"'
            return '<img src="' + value + '" alt="' + html.escape(alt, quote=True) + '" loading="lazy"' + dimensions + '>'
        if anchor:
            anchor = re.sub(r'[^\w\s-]', '', anchor).strip().lower().replace(' ', '-')
            value += '#' + anchor
        # Embedded notes become explicit links, avoiding hidden copies and cycles.
        return '[' + label.replace('[', '').replace(']', '') + '](' + value + ')'

    def markdown(self, match):
        image, label, raw = match.groups()
        target = raw.strip('<>')
        if re.match(r'^(?:https?://|mailto:|#|/)', target): return match[0]
        kind, value = self.target(target)
        if kind == 'withheld':
            self.warnings.append({'target': target, 'reason': value})
            return label + '（' + value + '）'
        return image + '[' + label + '](' + value + ')'

    def convert(self, text):
        result, fence = [], None
        for line in text.splitlines(keepends=True):
            found = re.match(r'^\s*(`{3,}|~{3,})(.*)$', line)
            if found:
                if fence is None:
                    fence = found[1]
                    if found[2].strip().lower() == 'assembly':
                        line = line.replace(found[2].strip(), 'nasm', 1)
                elif found[1][0] == fence[0] and len(found[1]) >= len(fence): fence = None
                result.append(line)
                continue
            if fence:
                result.append(line)
                continue
            parts = re.split(r'(`+[^`\n]+`+)', line)
            for i in range(0, len(parts), 2):
                parts[i] = MARKDOWN.sub(self.markdown, parts[i])
                parts[i] = WIKI.sub(self.wiki, parts[i])
            result.append(''.join(parts))
        if fence:
            result.append('\n' + fence + '\n')
            self.warnings.append({'target': 'code fence', 'reason': 'closed unterminated source fence'})
        return ''.join(result)


def frontmatter(values):
    return '---\n' + '\n'.join(k + ': ' + json.dumps(v, ensure_ascii=False) for k, v in values.items()) + '\n---\n\n'


def migrate(root, output, date):
    if output.exists() and any(output.iterdir()):
        raise ValueError('Use an empty staging directory; existing work is never overwritten')
    files = [p for p in root.rglob('*') if p.is_file() and not any(x in EXCLUDED for x in p.relative_to(root).parts)]
    resolver = Resolver(root, files)
    states, articles, redirects, texts = {}, {}, {}, {}
    for p in sorted(files):
        if p.suffix != '.md' or p.name in EXCLUDED_NAMES: continue
        relative = p.relative_to(root).as_posix()
        text = p.read_text(encoding='utf-8-sig')
        text = re.sub(r'\A---\r?\n.*?\r?\n---\r?\n', '', text, count=1, flags=re.S)
        texts[p] = text
        if relative.startswith('00-MOC/') or relative == 'Memory/Memory AIO.md':
            states[p] = '专题索引已汇入笔记导航'
        elif not text.strip(): states[p] = '原笔记为空，待补充'
        elif 'INTEL CONFIDENTIAL' in text: states[p] = '本轮未发布'
        elif p.name == 'MSR.md': states[p] = '长篇资料待整理'
        elif p.name.endswith('-mindmap.md'):
            redirects[p] = p.with_name(p.name.replace('-mindmap.md', '.md'))
            states[p] = '合并到正文版本'
        elif relative == 'Common/M.2.md':
            redirects[p] = root / 'Notes/M.2.md'
            states[p] = '重复条目已合并'
        elif len(text.strip()) < 120: states[p] = '原笔记较短，待补充'
        elif relative.startswith('The BIOS I get/'): states[p] = '原 PDF 资料未随文发布'
        else:
            article_slug = slug(Path(relative))
            articles[p] = {'slug': article_slug, 'title': p.stem,
                           'category': category(relative), 'url': '/blog/notes/' + article_slug + '/'}
            states[p] = '已迁移'
    assets, catalog, audit = {}, [], []
    for p, metadata in articles.items():
        def resolve(target):
            dest = resolver.find(target, p.parent)
            if dest in redirects: dest = redirects[dest]
            if dest in articles: return 'note', articles[dest]['url']
            if dest and dest.suffix.lower() in IMAGES:
                key = hashlib.sha256(dest.read_bytes()).hexdigest()[:20] + dest.suffix.lower()
                assets[key] = dest
                return 'image', '/assets/img/notes/' + key
            if dest in states: return 'withheld', states[dest]
            return 'withheld', '附件或条目未随文发布'
        converter = Converter({}, {}, {}, resolve)
        body = converter.convert(texts[p]).strip()
        title = metadata['title']
        # The page header already supplies the main title.
        body = re.sub(r'\A#\s+' + re.escape(title) + r'\s*\n', '', body)
        description = CATEGORIES[metadata['category']] + '：' + title + '，整理自个人 BIOS / UEFI 笔记。'
        header = {'layout': 'post', 'title': title, 'date': date + ' 12:00:00 +0800',
                  'description': description, 'categories': [metadata['category']],
                  'tags': ['BIOS', 'UEFI'], 'permalink': metadata['url'],
                  'note_import': True, 'render_with_liquid': False,
                  'toc': {'beginning': True}, 'related_posts': False}
        if '```mermaid' in body: header['mermaid'] = {'enabled': True}
        output_path = output / '_posts' / (date + '-' + metadata['slug'] + '.md')
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(frontmatter(header) + body + '\n', encoding='utf-8')
        catalog.append(metadata)
        audit.append({'source': p.relative_to(root).as_posix(),
                      'source_sha256': hashlib.sha256(p.read_bytes()).hexdigest(),
                      'output': output_path.relative_to(output).as_posix(), 'warnings': converter.warnings})
    for name, src in assets.items():
        dest = output / 'assets/img/notes' / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, dest)
    navigation = ['按主题查找 BIOS / UEFI 学习笔记和调试记录。文章日期为本次整理日期。', '',
                  '> 笔记中的平台路径、寄存器与调试结论对应原记录环境，使用时需结合目标平台核对。', '',
                  '## 从这里开始', '',
                  '- [SEC：启动与临时内存](/blog/notes/sec/)',
                  '- [PEI：初始化与 PPI](/blog/notes/pei/)',
                  '- [AMI StatusCode 串口输出链路](/blog/notes/ami-status-code-serial/)',
                  '- [AMI ParseVeB 编码报错](/blog/notes/ami-parseveb-encoding/)', '']
    for cat, label in CATEGORIES.items():
        rows = sorted([x for x in catalog if x['category'] == cat], key=lambda x: x['title'].casefold())
        if not rows: continue
        navigation.extend(['## ' + label, ''])
        for row in rows: navigation.append('- [' + row['title'] + '](' + row['url'] + ')')
        navigation.append('')
    dest = output / '_pages/bios-notes.md'
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(frontmatter({'layout': 'page', 'title': 'BIOS 笔记', 'permalink': '/bios/',
                                'nav': True, 'nav_order': 1, 'description': '启动流程、平台初始化与固件调试专题索引'}) + '\n'.join(navigation) + '\n', encoding='utf-8')
    report = {'date': date, 'articles': len(articles), 'images': len(assets),
              'categories': dict(Counter(x['category'] for x in catalog)), 'files': audit,
              'deferred': [{'source': p.relative_to(root).as_posix(), 'reason': s} for p, s in states.items() if s != '已迁移']}
    (output / 'migration-audit.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--date', required=True, help='Migration date, YYYY-MM-DD')
    args = parser.parse_args()
    report = migrate(args.source.resolve(), args.output.resolve(), args.date)
    print(json.dumps({k: report[k] for k in ['articles', 'images', 'categories']}, ensure_ascii=False, indent=2))
