"""Validate generated BIOS pages, local links, anchors, and copied images."""
import argparse
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links, self.ids = [], set()
        self.text, self.code_depth = [], 0
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs: self.ids.add(attrs['id'])
        if tag in {'pre', 'code'}: self.code_depth += 1
        if tag == 'a' and 'href' in attrs: self.links.append(attrs['href'])
        if tag in {'img', 'script'} and 'src' in attrs: self.links.append(attrs['src'])
        if tag == 'link' and 'href' in attrs: self.links.append(attrs['href'])

    def handle_endtag(self, tag):
        if tag in {'pre', 'code'}: self.code_depth = max(0, self.code_depth - 1)

    def handle_data(self, value):
        if not self.code_depth: self.text.append(value)


def check(root, audit=None, source=None):
    site = root / '_site'
    posts = list((root / '_posts').glob('*.md'))
    imports = [p for p in posts if re.search(r'^note_import: true$', p.read_text(encoding='utf-8'), re.M)]
    pages = [site / 'index.html', site / 'bios/index.html', site / 'blog/index.html']
    pages += sorted((site / 'blog/notes').rglob('index.html'))
    errors, links, external = [], 0, set()
    cache = {}
    if len(pages) - 3 != len(imports): errors.append('Imported source/rendered page count mismatch')
    for path in pages:
        if not path.is_file():
            errors.append('Missing page: ' + str(path))
            continue
        page = Page(path.read_text(encoding='utf-8'))
        cache[path] = page
        text = ''.join(page.text)
        if '[[' in text: errors.append('Unconverted Obsidian markup: ' + str(path))
        current_url = '/' + path.relative_to(site).as_posix()
        for url in page.links:
            parts = urlsplit(url)
            if parts.scheme in {'http', 'https'} or parts.netloc:
                external.add(url)
                continue
            if parts.scheme in {'mailto', 'data', 'tel'}: continue
            if parts.scheme:
                errors.append('Unsupported/local URL: ' + current_url + ' -> ' + url)
                continue
            resolved = urlsplit(urljoin(current_url, url))
            dest = site / unquote(resolved.path).lstrip('/')
            if dest.is_dir(): dest /= 'index.html'
            if not dest.is_file():
                errors.append('Broken local link: ' + current_url + ' -> ' + url)
                continue
            links += 1
            if resolved.fragment and dest.suffix == '.html':
                target = cache.setdefault(dest, Page(dest.read_text(encoding='utf-8')))
                if unquote(resolved.fragment) not in target.ids:
                    errors.append('Missing anchor: ' + current_url + ' -> ' + url)
    copied = list((root / 'assets/img/notes').glob('*'))
    for path in copied:
        if hashlib.sha256(path.read_bytes()).hexdigest()[:20] != path.stem:
            errors.append('Image content/hash mismatch: ' + str(path))
    if audit and source:
        report = json.loads(audit.read_text(encoding='utf-8'))
        for row in report['files']:
            path = source / row['source']
            if hashlib.sha256(path.read_bytes()).hexdigest() != row['source_sha256']:
                errors.append('Source note changed: ' + row['source'])
    for path in imports:
        text = path.read_text(encoding='utf-8')
        if 'INTEL CONFIDENTIAL' in text: errors.append('Confidential source marker: ' + str(path))
    if (site / 'tools').exists() or (site / 'docs').exists(): errors.append('Internal tooling/report leaked into site')
    result = {'articles': len(imports), 'pages_checked': len(pages), 'local_links_checked': links,
              'images': len(copied), 'external_urls_not_validated': len(external), 'errors': sorted(set(errors))}
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return bool(errors)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path('.'))
    parser.add_argument('--audit', type=Path)
    parser.add_argument('--source', type=Path)
    args = parser.parse_args()
    raise SystemExit(check(args.root, args.audit, args.source))
