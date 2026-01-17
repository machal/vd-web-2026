#!/usr/bin/env python3
"""
Skript pro extrakci článků příručky z databáze a přidání front matter do Markdown souborů.
"""

import re
import os
from collections import defaultdict
from extract_frontmatter_schema import (
    extract_guide_article_data,
    escape_yaml_value,
    convert_boolean_value,
    parse_category_string
)


def find_all_guide_articles(sql_file):
    """Najde všechny články příručky v databázi a vytvoří mapování slug -> itemID."""
    slug_to_item_id = {}
    item_id_to_slug = {}
    
    with open(sql_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Najdeme všechny řádky s 'slug' klíčem v perch2_content_index
    # Struktura: (indexID, itemID, regionID, pageID, itemRev, 'slug', 'hodnota')
    # Články příručky mají regionID=1, pageID=1
    pattern = r"\((\d+),\s*(\d+),\s*1,\s*1,\s*(\d+),\s*'slug',\s*'([^']+)'\)"
    
    # Uložíme nejnovější revizi pro každý slug
    slug_data = {}
    
    for match in re.finditer(pattern, content):
        item_id = int(match.group(2))
        rev = int(match.group(3))
        slug = match.group(4)
        
        # Pokud už máme tento slug, vezmeme jen pokud je revize novější
        if slug not in slug_data or rev > slug_data[slug][1]:
            slug_data[slug] = (item_id, rev)
    
    # Vytvoříme finální mapování
    for slug, (item_id, rev) in slug_data.items():
        slug_to_item_id[slug] = item_id
        item_id_to_slug[item_id] = slug
    
    return slug_to_item_id, item_id_to_slug


def get_slug_from_filename(filename):
    """Získá slug z názvu souboru (např. amp.md -> amp, css-selektory.md -> css-selektory)."""
    # Odstraníme příponu .md
    slug = filename.replace('.md', '')
    # Odstraníme číselný prefix (např. 3-principy-rwd.md -> principy-rwd)
    slug = re.sub(r'^\d+-', '', slug)
    return slug


def create_frontmatter(guide_data, is_published=True):
    """Vytvoří front matter pro článek příručky."""
    lines = []
    lines.append("---")
    
    # Seřadíme klíče podle důležitosti
    guide_keys_order = [
        'id', 'heading', 'slug', 'date', 'perex', 'published',
        'category', 'category_highlight', 'include_rss',
        'no_ads', 'og_title', 'og_description', 'og_image', 'og_type'
    ]
    
    for key in guide_keys_order:
        # Fallback hodnoty pro og_* pokud nejsou v datech
        if key == 'og_title' and key not in guide_data:
            value = guide_data.get('heading', '')
        elif key == 'og_description' and key not in guide_data:
            value = guide_data.get('perex', '')
        elif key == 'og_image' and key not in guide_data:
            value = ''  # Prázdné, pokud není v datech
        elif key == 'og_type' and key not in guide_data:
            value = 'article'
        elif key == 'published' and key not in guide_data:
            # Pokud není v datech, použijeme parametr is_published
            value = 'Publikováno' if is_published else False
        elif key not in guide_data:
            continue
        else:
            value = guide_data[key]
        
        # Přeskočíme prázdné og_image
        if key == 'og_image' and (not value or value == ''):
            continue
        
        # Speciální zpracování pro published
        if key == 'published':
            if isinstance(value, bool):
                lines.append(f"{key}: {str(value).lower()}")
            elif value == 'Publikováno' or value == 'Published':
                lines.append(f"{key}: true")
            elif not value or value == '':
                lines.append(f"{key}: false")
            else:
                lines.append(f"{key}: {escape_yaml_value(value)}")
        # Boolean hodnoty
        elif key in ('no_ads', 'include_rss', 'category_highlight'):
            lines.append(f"{key}: {str(convert_boolean_value(value)).lower()}")
        # category jako seznam
        elif key == 'category':
            categories = parse_category_string(value) if isinstance(value, str) else (value if isinstance(value, list) else [])
            if categories:
                lines.append(f"{key}:")
                for cat in categories:
                    lines.append(f"  - {cat}")
            else:
                lines.append(f"{key}: []")
        # Textové položky vždy v uvozovkách
        elif key in ('heading', 'perex', 'og_title', 'og_description'):
            lines.append(f"{key}: {escape_yaml_value(value, force_quotes=True)}")
        elif isinstance(value, list):
            lines.append(f"{key}:")
            for item in value:
                lines.append(f"  - {item}")
        else:
            lines.append(f"{key}: {escape_yaml_value(value)}")
    
    lines.append("---")
    
    return '\n'.join(lines)


def update_guide_article(filepath, guide_data, is_published=True):
    """Aktualizuje článek příručky přidáním nebo aktualizací front matter."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Zjistíme, zda už má front matter
    if content.startswith('---'):
        # Má front matter - nahradíme ho
        parts = content.split('---', 2)
        if len(parts) >= 3:
            # Máme front matter a obsah
            frontmatter = create_frontmatter(guide_data, is_published)
            body = parts[2].lstrip('\n')
            new_content = frontmatter + '\n\n' + body
        else:
            # Máme jen front matter bez obsahu
            frontmatter = create_frontmatter(guide_data, is_published)
            new_content = frontmatter + '\n\n'
    else:
        # Nemá front matter - přidáme ho na začátek
        frontmatter = create_frontmatter(guide_data, is_published)
        # Pokud obsah začíná nadpisem, zachováme ho
        if content.strip().startswith('#'):
            new_content = frontmatter + '\n\n' + content
        else:
            new_content = frontmatter + '\n\n' + content
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)


def create_default_frontmatter(filename, slug):
    """Vytvoří výchozí front matter pro článek, který není v databázi."""
    guide_data = {
        'id': slug,
        'heading': '',  # Bude třeba doplnit ručně
        'slug': slug,
        'date': '',
        'perex': '',
        'published': False,
        'category': [],
        'category_highlight': False,
        'include_rss': False,
        'no_ads': False,
        'og_type': 'article'
    }
    return guide_data


if __name__ == '__main__':
    # Použijeme relativní cesty k aktuální složce
    script_dir = os.path.dirname(os.path.abspath(__file__))
    sql_file = os.path.join(script_dir, 'vdinno.sql')
    guide_dir = os.path.join(script_dir, 'content', 'prirucka')
    
    # Najdeme všechny články příručky v databázi
    print("Hledám všechny články příručky v databázi...")
    slug_to_item_id, item_id_to_slug = find_all_guide_articles(sql_file)
    print(f"  Nalezeno {len(slug_to_item_id)} článků v databázi")
    
    # Projdeme všechny soubory v adresáři prirucka
    print("\nZpracovávám soubory v adresáři prirucka...")
    updated_files = []
    not_found_files = []
    errors = []
    
    if not os.path.exists(guide_dir):
        print(f"  ✗ Adresář {guide_dir} neexistuje!")
        exit(1)
    
    for filename in os.listdir(guide_dir):
        if not filename.endswith('.md'):
            continue
        
        filepath = os.path.join(guide_dir, filename)
        slug = get_slug_from_filename(filename)
        
        try:
            item_id = None
            
            # Přesná shoda
            if slug in slug_to_item_id:
                item_id = slug_to_item_id[slug]
            else:
                # Částečná shoda - najdeme slugy v DB, které obsahují slug souboru
                # Použijeme nejlepší shodu (nejkratší slug v DB, který začíná slugem souboru)
                best_match = None
                best_match_length = float('inf')
                
                for db_slug, db_item_id in slug_to_item_id.items():
                    # Pokud slug souboru je na začátku slug v DB
                    if db_slug.startswith(slug + '-'):
                        if len(db_slug) < best_match_length:
                            best_match = db_item_id
                            best_match_length = len(db_slug)
                    # Nebo pokud jsou stejné
                    elif db_slug == slug:
                        best_match = db_item_id
                        best_match_length = len(db_slug)
                        break
                
                if best_match:
                    item_id = best_match
            
            if item_id:
                # Článek existuje v databázi
                print(f"  [{len(updated_files) + 1}] Zpracovávám {filename} (slug: {slug}, itemID: {item_id})...")
                
                # Extrahujeme data z databáze
                guide_data = extract_guide_article_data(sql_file, item_id)
                
                if not guide_data:
                    print(f"    ⚠️  Varování: Žádná data pro itemID {item_id}")
                    errors.append(f"{filename}: žádná data pro itemID {item_id}")
                    continue
                
                # Aktualizujeme soubor
                update_guide_article(filepath, guide_data, is_published=True)
                updated_files.append(filename)
                print(f"    ✓ Aktualizován: {filename}")
            else:
                # Článek neexistuje v databázi
                print(f"  [{len(not_found_files) + 1}] Článek {filename} (slug: {slug}) není v databázi...")
                
                # Vytvoříme výchozí front matter
                guide_data = create_default_frontmatter(filename, slug)
                
                # Aktualizujeme soubor
                update_guide_article(filepath, guide_data, is_published=False)
                not_found_files.append(filename)
                print(f"    ✓ Přidán front matter s Published: false")
        
        except Exception as e:
            print(f"    ✗ Chyba při zpracování {filename}: {e}")
            errors.append(f"{filename}: {e}")
    
    print(f"\n✓ Hotovo!")
    print(f"  Aktualizováno {len(updated_files)} článků z databáze")
    print(f"  Přidán front matter pro {len(not_found_files)} článků (Published: false)")
    
    if errors:
        print(f"\n⚠️  {len(errors)} chyb:")
        for error in errors:
            print(f"  - {error}")
