#!/usr/bin/env python3
"""
Skript pro vložení AdSnippet do všech článků s kategorií obsahující "css"
"""
import os
import re
import glob
from pathlib import Path

# HTML snippet k vložení
AD_SNIPPET = '''<link rel="stylesheet" href="/assets/css/modules-standalone/min/ad-snippet.min.css?1710496181" /><script> </script>
<aside role="complementary" class="ad-snippet ad-snippet--reverse" aria-labelledby="ad-snippet-ebook">
  <h2 id="ad-snippet-ebook" class="ad-snippet__heading sr-only">Reklama</h2>
<svg class="ad-snippet__scissors ad-snippet__scissors-top" viewBox="0 0 18 14" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use class="ad-snippet__scissors-svg" xlink:href="#vd-icon-scissors" x="0" y="0"></use>
</svg>
  <a class="ad-snippet__container" href="/css-layout/">
    <div class="ad-snippet__image maxw-7em">
      <img src="/assets/img/content/handmade/ebooks/vdlayout/vdlayout-model-both__760.webp" alt="Kniha a e-book „CSS: moderní layout"" loading="lazy" width="1540" height="1270">
    </div>
    <div class="ad-snippet__text">
      <h3 class="ad-snippet__text-heading" style="color:#f89b1d">
        Kniha „CSS: moderní layout"
      </h3>
      <p class="ad-snippet__text-content">
        Floaty šly spát, ale takhle kniha ve vás probudí CSS kodéra.
        <span class="td-u">Více</span> →
      </p>
    </div>
  </a>
<svg class="ad-snippet__scissors ad-snippet__scissors-bottom" viewBox="0 0 18 14" xmlns:xlink="http://www.w3.org/1999/xlink">
  <use class="ad-snippet__scissors-svg" xlink:href="#vd-icon-scissors" x="0" y="0"></use>
</svg>
</aside>'''

def has_css_in_category(filepath):
    """Zkontroluje, zda soubor má 'css' v kategorii"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Najít frontmatter
        if '---' not in content:
            return False
        
        parts = content.split('---', 2)
        if len(parts) < 2:
            return False
        
        frontmatter = parts[1]
        
        # Zkontrolovat, zda category obsahuje "css"
        # Podporuje formáty:
        # category: - css
        # category: - css-grid
        # category: [..., css, ...]
        if re.search(r'category:.*?-\s*css', frontmatter, re.DOTALL) or \
           re.search(r'category:\s*\[[^\]]*css[^\]]*\]', frontmatter) or \
           re.search(r'category:.*?-\s*[^-\n]*css[^-\n]*', frontmatter, re.DOTALL):
            return True
        
        return False
    except Exception as e:
        print(f"Chyba při čtení {filepath}: {e}")
        return False

def insert_snippet(filepath):
    """Vloží snippet na místo prvního <!-- AdSnippet -->"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Najít první výskyt <!-- AdSnippet -->
        pattern = r'<!--\s*AdSnippet\s*-->'
        match = re.search(pattern, content)
        
        if not match:
            print(f"  ⚠️  Nenalezen <!-- AdSnippet --> v {filepath}")
            return False
        
        # Nahradit první výskyt
        # Zachovat prázdné řádky před a po, pokud existují
        start_pos = match.start()
        end_pos = match.end()
        
        # Zjistit, zda je před komentářem prázdný řádek
        before = content[:start_pos]
        after_comment = content[end_pos:]
        
        # Pokud je před komentářem text a po něm prázdný řádek, zachovat strukturu
        replacement = AD_SNIPPET
        
        # Pokud je po komentáři prázdný řádek, zachovat ho
        if after_comment.startswith('\n'):
            replacement = replacement + '\n'
        elif not after_comment.startswith('\n') and not before.endswith('\n\n'):
            # Pokud není prázdný řádek před ani po, přidat jeden po snippet
            replacement = replacement + '\n'
        
        new_content = content[:start_pos] + replacement + content[end_pos:]
        
        # Uložit soubor
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"  ✓ Vložen snippet do {filepath}")
        return True
        
    except Exception as e:
        print(f"  ✗ Chyba při zpracování {filepath}: {e}")
        return False

def main():
    """Hlavní funkce"""
    base_dir = Path(__file__).parent.parent
    content_dirs = [
        base_dir / 'src' / 'content' / 'blog',
        base_dir / 'src' / 'content' / 'podcast',
        base_dir / 'src' / 'content' / 'prirucka',
    ]
    
    files_with_css = []
    
    # Najít všechny soubory s "css" v kategorii
    print("Hledám soubory s 'css' v kategorii...")
    for content_dir in content_dirs:
        if not content_dir.exists():
            continue
        
        for md_file in content_dir.glob('*.md'):
            if has_css_in_category(md_file):
                files_with_css.append(md_file)
    
    print(f"\nNalezeno {len(files_with_css)} souborů s 'css' v kategorii\n")
    
    # Projít všechny soubory a vložit snippet
    success_count = 0
    for filepath in sorted(files_with_css):
        print(f"Zpracovávám: {filepath.name}")
        if insert_snippet(filepath):
            success_count += 1
    
    print(f"\n✓ Hotovo! Úspěšně upraveno {success_count} z {len(files_with_css)} souborů.")

if __name__ == '__main__':
    main()
