"""Regression checks for Obsidian-to-Jekyll migration boundaries."""
import importlib.util
from pathlib import Path
import tempfile
import unittest


class NoteImportTests(unittest.TestCase):
    def setUp(self):
        module = Path(__file__).with_name('import_bios_notes.py')
        self.assertTrue(module.is_file(), 'The note converter must exist')
        spec = importlib.util.spec_from_file_location('note_import', module)
        self.mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(self.mod)

    def test_alias_anchor_and_code_are_preserved(self):
        convert = self.mod.Converter({'PEI': '/blog/notes/pei/'}, {}, {})
        source = '[[PEI#启动流程|下一阶段]]\n`[[PEI]]`\n```c\n// [[PEI]]\n```\n'
        result = convert.convert(source)
        self.assertIn('[下一阶段](/blog/notes/pei/#启动流程)', result)
        self.assertIn('`[[PEI]]`', result)
        self.assertIn('// [[PEI]]', result)

    def test_image_size_and_brackets_in_filename(self):
        convert = self.mod.Converter({}, {'截图_[12-00].png': '/assets/img/notes/a.png'}, {})
        result = convert.convert('![[截图_[12-00].png|320]]')
        self.assertIn('src="/assets/img/notes/a.png"', result)
        self.assertIn('width="320"', result)
        self.assertNotIn('[[', result)

    def test_withheld_content_cannot_become_link_or_embed(self):
        convert = self.mod.Converter({}, {}, {'Private': '本轮未发布'})
        result = convert.convert('![[Private]] 和 [[Private|资料]]')
        self.assertNotIn('href=', result)
        self.assertNotIn('](', result)
        self.assertIn('本轮未发布', result)

    def test_relative_markdown_assets_and_external_links(self):
        convert = self.mod.Converter({}, {'images/a.png': '/assets/img/notes/a.png'}, {})
        result = convert.convert('![图](images/a.png) [外部](https://example.org/a) [日志](logs/a.log)')
        self.assertIn('![图](/assets/img/notes/a.png)', result)
        self.assertIn('[外部](https://example.org/a)', result)
        self.assertNotIn('](logs/a.log)', result)

    def test_resolution_prefers_exact_path_and_rejects_ambiguous_stems(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            for relative in ['a/Same.md', 'b/Same.md']:
                p = root / relative
                p.parent.mkdir(parents=True, exist_ok=True)
                p.write_text('note', encoding='utf-8')
            resolve = self.mod.Resolver(root, list(root.rglob('*.md')))
            self.assertEqual(resolve.find('a/Same'), root / 'a/Same.md')
            self.assertIsNone(resolve.find('Same'))

    def test_literal_percent_filename_is_not_lost(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            asset = root / 'SPD%20Dump.png'
            asset.write_bytes(b'image')
            resolve = self.mod.Resolver(root, [asset])
            self.assertEqual(resolve.find('SPD%20Dump.png'), asset)


if __name__ == '__main__':
    unittest.main()
