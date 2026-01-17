#!/usr/bin/env python3
"""
Skript pro transformaci Front Matter z exportovaného formátu do Astro formátu.

Transformace:
- category → categories
- og_title → socialTitle
- og_description → socialDescription
- Přidá title z heading
- Odstraní slug (není v Astro schématu)
"""

import os
import re
import sys


def transform_frontmatter(content):
    """Transformuje Front Matter v Markdown souboru."""
    if not content.startswith('---'):
        return content
    
    # Najdeme Front Matter
    parts = content.split('---', 2)
    if len(parts) < 3:
        return content
    
    frontmatter_text = parts[1]
    body = parts[2]
    
    # Transformace polí
    lines = frontmatter_text.split('\n')
    transformed_lines = []
    has_title = False
    has_heading = False
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # Přejmenovat category → categories
        if line.startswith('category:'):
            transformed_lines.append('categories:')
            # Pokud má hodnoty na dalších řádcích, zachováme je
            continue
        elif line.startswith('- ') and 'categories' in transformed_lines[-1] if transformed_lines else False:
            # Hodnoty kategorie - zachováme
            transformed_lines.append(line)
            continue
        
        # Přejmenovat og_title → socialTitle
        if line.startswith('og_title:'):
            transformed_lines.append(line.replace('og_title:', 'socialTitle:'))
            continue
        
        # Přejmenovat og_description → socialDescription
        if line.startswith('og_description:'):
            transformed_lines.append(line.replace('og_description:', 'socialDescription:'))
            continue
        
        # Odstranit slug
        if line.startswith('slug:'):
            continue
        
        # Zaznamenat, zda máme heading nebo title
        if line.startswith('heading:'):
            has_heading = True
        if line.startswith('title:'):
            has_title = True
        
        # Zachovat ostatní řádky
        transformed_lines.append(line)
    
    # Přidat title z heading, pokud není
    if has_heading and not has_title:
        # Najdeme heading hodnotu
        heading_value = None
        for line in lines:
            if line.startswith('heading:'):
                heading_value = line.split(':', 1)[1].strip().strip("'\"")
                break
        
        if heading_value:
            # Přidáme title před heading
            title_added = False
            new_lines = []
            for line in transformed_lines:
                if line.startswith('heading:') and not title_added:
                    new_lines.append(f"title: {heading_value}")
                    title_added = True
                new_lines.append(line)
            transformed_lines = new_lines
    
    # Sestavíme nový Front Matter
    new_frontmatter = '\n'.join(transformed_lines)
    new_content = f"---\n{new_frontmatter}\n---{body}"
    
    return new_content


def process_directory(directory):
    """Zpracuje všechny Markdown soubory v adresáři."""
    if not os.path.exists(directory):
        print(f"❌ Adresář {directory} neexistuje!")
        return
    
    files = [f for f in os.listdir(directory) if f.endswith('.md')]
    print(f"Zpracovávám {len(files)} souborů v {directory}...")
    
    processed = 0
    errors = []
    
    for filename in files:
        filepath = os.path.join(directory, filename)
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            transformed_content = transform_frontmatter(content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(transformed_content)
            
            processed += 1
            if processed % 50 == 0:
                print(f"  Zpracováno {processed}/{len(files)} souborů...")
        
        except Exception as e:
            errors.append(f"{filename}: {e}")
            print(f"  ⚠️  Chyba při zpracování {filename}: {e}")
    
    print(f"\n✅ Hotovo! Zpracováno {processed} souborů")
    
    if errors:
        print(f"\n⚠️  {len(errors)} chyb:")
        for error in errors[:10]:
            print(f"  - {error}")


if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    guide_dir = os.path.join(script_dir, 'content', 'prirucka')
    
    if len(sys.argv) > 1:
        guide_dir = sys.argv[1]
    
    print("=== Transformace Front Matter do Astro formátu ===\n")
    process_directory(guide_dir)
