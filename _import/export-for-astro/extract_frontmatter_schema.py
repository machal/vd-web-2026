#!/usr/bin/env python3
"""
Skript pro extrakci struktury dat z perch2_blog_index a perch2_content_index
a vytvoření dokumentace Front Matter schématu pro Markdown soubory.
"""

import re
import json
import os
from collections import defaultdict


def escape_yaml_value(value, force_quotes=False, min_length_for_quotes=50):
    """Escapuje hodnotu pro YAML Front Matter."""
    if value is None:
        return ''

    value_str = str(value)

    # Pokud je force_quotes=True, obsahuje dvojtečku, nebo je delší než min_length_for_quotes, použijeme uvozovky
    if force_quotes or ':' in value_str or len(value_str) > min_length_for_quotes:
        # Escape uvozovky uvnitř hodnoty
        value_str = value_str.replace("'", "''")
        return f"'{value_str}'"

    return value_str


def parse_category_string(category_str):
    """Parsuje category řetězec na seznam kategorií."""
    if not category_str:
        return []

    # Odstraníme koncové čárky a mezery
    category_str = category_str.rstrip(',').strip()

    # Rozdělíme podle čárek
    categories = [cat.strip() for cat in category_str.split(',') if cat.strip()]

    return categories


def convert_boolean_value(value):
    """Konvertuje hodnotu na boolean pro YAML."""
    if value is None or value == '':
        return False
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        return value.lower() in ('ano', 'yes', 'true', '1', 'bez reklam')
    return bool(value)


def get_full_post_content(sql_file, post_id):
    """Získá celý obsah článku z perch2_blog_posts tabulky."""
    with open(sql_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Najdeme řádek obsahující INSERT INTO a daný postID
    # Struktura: (postID, blogID, postTitle, postSlug, postDateTime, postDescRaw, ...)
    # postDescRaw je 6. hodnota (index 5)

    # Najdeme začátek INSERT INTO
    insert_start = content.find("INSERT INTO `perch2_blog_posts`")
    if insert_start == -1:
        return None

    # Najdeme řádek s daným postID
    pattern = rf"\({post_id},\s*\d+,\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'"

    # Použijeme jednodušší přístup - najdeme pozici a pak parsujeme hodnotu ručně
    match = re.search(pattern, content[insert_start:])
    if not match:
        return None

    # Začneme od začátku hodnoty postDescRaw
    start_pos = insert_start + match.end()

    # Najdeme konec hodnoty - musíme počítat s escape sekvencemi
    pos = start_pos
    content_raw = ''
    escaped = False

    while pos < len(content):
        char = content[pos]

        if escaped:
            if char == 'n':
                content_raw += '\n'
            elif char == 'r':
                content_raw += '\r'
            elif char == 't':
                content_raw += '\t'
            elif char == '\\':
                content_raw += '\\'
            elif char == "'":
                content_raw += "'"
            else:
                content_raw += char
            escaped = False
        elif char == '\\':
            escaped = True
        elif char == "'" and pos + 1 < len(content) and content[pos + 1] == ',':
            # Konec hodnoty
            break
        else:
            content_raw += char

        pos += 1

    # Vyčistíme \r\n
    content_raw = content_raw.replace('\r\n', '\n').replace('\r', '\n')

    return content_raw if content_raw else None

def extract_blog_post_data(sql_file, post_id):
    """Extrahuje všechna data pro blog post z perch2_blog_index."""
    data = {}

    with open(sql_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Najdeme všechny záznamy pro daný postID
    pattern = rf"\((\d+), 'postID', {post_id}, '([^']+)', '([^']*)'\)"

    for match in re.finditer(pattern, content):
        index_id = match.group(1)
        key = match.group(2)
        value = match.group(3)

        # Pokud je klíč začínající podtržítkem, ignorujeme ho (jsou to interní klíče)
        if key.startswith('_') and key != '_id':
            if key not in data:
                data[key] = []
            if value and value not in data[key]:
                data[key].append(value)
        else:
            # Pro normální klíče ukládáme hodnotu
            if key not in data:
                data[key] = value
            elif isinstance(data[key], list):
                if value not in data[key]:
                    data[key].append(value)
            else:
                # Pokud už existuje hodnota, vytvoříme pole
                data[key] = [data[key], value]

    return data


def extract_guide_article_data(sql_file, item_id):
    """Extrahuje všechna data pro guide article z perch2_content_index."""
    data = {}

    with open(sql_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Najdeme všechny řádky s daným itemID
    # Struktura: (indexID, itemID, regionID, pageID, itemRev, 'indexKey', 'indexValue')
    # Použijeme jednodušší přístup - najdeme řádky obsahující itemID a pak je parsujeme
    lines = content.split('\n')

    max_rev = 0
    all_data = defaultdict(dict)

    for line in lines:
        # Hledáme řádky, které obsahují INSERT INTO a náš itemID
        if f", {item_id}," in line or f",{item_id}," in line:
            # Parsujeme řádek - struktura: (číslo, itemID, číslo, číslo, číslo, 'klíč', 'hodnota')
            # Použijeme regex pro extrakci
            pattern = rf"\((\d+),\s*{item_id},\s*(\d+),\s*(\d+),\s*(\d+),\s*'([^']*)',\s*'([^']*)'\)"
            match = re.search(pattern, line)
            if match:
                index_id = match.group(1)
                region_id = int(match.group(2))
                page_id = int(match.group(3))
                item_rev = int(match.group(4))
                key = match.group(5)
                value = match.group(6)

                # Ověříme, že key není prázdný nebo číslo
                if not key:
                    continue

                if item_rev > max_rev:
                    max_rev = item_rev

                if item_rev not in all_data:
                    all_data[item_rev] = {}

                # Pokud je klíč začínající podtržítkem, ignorujeme ho (jsou to interní klíče)
                if key.startswith('_') and key != '_id':
                    if key not in all_data[item_rev]:
                        all_data[item_rev][key] = []
                    if value and value not in all_data[item_rev][key]:
                        all_data[item_rev][key].append(value)
                else:
                    # Pro normální klíče ukládáme hodnotu
                    if key not in all_data[item_rev]:
                        all_data[item_rev][key] = value
                    elif isinstance(all_data[item_rev][key], list):
                        if value not in all_data[item_rev][key]:
                            all_data[item_rev][key].append(value)
                    else:
                        # Pokud už existuje hodnota, vytvoříme pole
                        all_data[item_rev][key] = [all_data[item_rev][key], value]

    # Vrátíme data z nejnovější revize
    if max_rev in all_data:
        return all_data[max_rev]

    return {}


def create_frontmatter_schema(blog_data, guide_data, podcast_data, output_file):
    """Vytvoří dokumentaci Front Matter schématu."""

    lines = []
    lines.append("# Front Matter schéma pro články")
    lines.append("")
    lines.append("Tento dokument popisuje strukturu Front Matter pro články blogu a příručky.")
    lines.append("")

    # Blog post schema
    lines.append("## Blog článek (perch2_blog_index)")
    lines.append("")
    lines.append("### Struktura dat")
    lines.append("")
    lines.append("```yaml")
    lines.append("# Front Matter příklad pro blog článek")
    lines.append("---")

    # Seřadíme klíče podle důležitosti
    blog_keys_order = [
        'postID', 'postTitle', 'postSlug', 'postUrlId', 'postDateTime',
        'postDescRaw', 'excerpt', 'postStatus', 'authorID', 'sectionID',
        'blogID', 'category', '_category', 'postTags', 'no_ads',
        'include_rss', 'category_highlight', 'external_author_name',
        'external_author', 'external_author_image',
        'og_title', 'og_description', 'og_image', 'og_type'
    ]

    for key in blog_keys_order:
        if key in blog_data:
            value = blog_data[key]
            if isinstance(value, list):
                lines.append(f"{key}:")
                for item in value:
                    lines.append(f"  - {item}")
            else:
                # Escape YAML hodnoty
                if '\n' in str(value):
                    lines.append(f"{key}: |")
                    for line in str(value).split('\n'):
                        lines.append(f"  {line}")
                else:
                    lines.append(f"{key}: {escape_yaml_value(value)}")

    # Přidáme zbývající klíče
    for key in sorted(blog_data.keys()):
        if key not in blog_keys_order:
            value = blog_data[key]
            if isinstance(value, list):
                lines.append(f"{key}:")
                for item in value:
                    lines.append(f"  - {item}")
            else:
                lines.append(f"{key}: {repr(value) if ':' in str(value) or str(value).startswith('[') else value}")

    lines.append("---")
    lines.append("```")
    lines.append("")

    # Guide article schema
    lines.append("## Příručka článek (perch2_content_index)")
    lines.append("")
    lines.append("### Struktura dat")
    lines.append("")
    lines.append("```yaml")
    lines.append("# Front Matter příklad pro příručka článek")
    lines.append("---")

    # Seřadíme klíče podle důležitosti
    guide_keys_order = [
        'id', 'heading', 'slug', 'date', 'perex', 'published',
        'category', '_category', 'category_highlight', 'include_rss',
        'no_ads', 'external_author_name', 'external_author',
        'external_author_image'
    ]

    for key in guide_keys_order:
        if key in guide_data:
            value = guide_data[key]
            if isinstance(value, list):
                lines.append(f"{key}:")
                for item in value:
                    lines.append(f"  - {item}")
            else:
                lines.append(f"{key}: {escape_yaml_value(value)}")

    # Přidáme zbývající klíče
    for key in sorted(guide_data.keys()):
        if key not in guide_keys_order:
            value = guide_data[key]
            if isinstance(value, list):
                lines.append(f"{key}:")
                for item in value:
                    lines.append(f"  - {item}")
            else:
                lines.append(f"{key}: {escape_yaml_value(value)}")

    lines.append("---")
    lines.append("```")
    lines.append("")

    # Přidáme popis polí
    lines.append("### Popis polí")
    lines.append("")

    lines.append("#### Blog článek")
    lines.append("")
    blog_fields = {
        'postID': 'ID článku v databázi',
        'postTitle': 'Název článku',
        'postSlug': 'URL slug článku',
        'postUrlId': 'Alternativní URL ID (např. "rok-2025")',
        'postDateTime': 'Datum a čas publikace (YYYY-MM-DD nebo YYYY-MM-DD HH:MM:SS)',
        'postDescRaw': 'Raw Markdown obsah článku',
        'excerpt': 'Krátký výtah článku',
        'postStatus': 'Status: "Published" nebo "Draft"',
        'authorID': 'ID autora',
        'sectionID': 'ID sekce',
        'blogID': 'ID blogu',
        'category': 'Kategorie (čárkami oddělené)',
        '_category': 'Interní kategorie (pole)',
        'postTags': 'Tagy (čárkami oddělené)',
        'no_ads': 'Bez reklam ("Bez reklam" nebo prázdné)',
        'include_rss': 'Zahrnout do RSS ("ano" nebo prázdné)',
        'category_highlight': 'Zvýraznit kategorii ("ano" nebo prázdné)',
        'external_author_name': 'Jméno externího autora',
        'external_author': 'URL externího autora',
        'external_author_image': 'Obrázek externího autora',
        'og_title': 'Open Graph název',
        'og_description': 'Open Graph popis',
        'og_image': 'Open Graph obrázek',
        'og_type': 'Open Graph typ (např. "article")'
    }

    for key, desc in blog_fields.items():
        if key in blog_data:
            lines.append(f"- **{key}**: {desc}")

    lines.append("")
    lines.append("#### Příručka článek")
    lines.append("")
    guide_fields = {
        'id': 'ID článku (např. "css-selektory")',
        'heading': 'Nadpis článku',
        'slug': 'URL slug článku',
        'date': 'Datum publikace (YYYY-MM-DD)',
        'perex': 'Perex článku',
        'published': 'Status publikace ("Publikováno" nebo prázdné)',
        'category': 'Kategorie (čárkami oddělené)',
        '_category': 'Interní kategorie (pole)',
        'category_highlight': 'Zvýraznit kategorii ("ano" nebo prázdné)',
        'include_rss': 'Zahrnout do RSS ("ano" nebo prázdné)',
        'no_ads': 'Bez reklam (prázdné nebo hodnota)',
        'external_author_name': 'Jméno externího autora',
        'external_author': 'URL externího autora',
        'external_author_image': 'Obrázek externího autora'
    }

    for key, desc in guide_fields.items():
        if key in guide_data:
            lines.append(f"- **{key}**: {desc}")

    lines.append("")
    lines.append("#### Podcast článek")
    lines.append("")
    lines.append("Podcast je součástí blogu a používá stejnou strukturu jako blog článek, ale má kategorii `podcast`.")
    lines.append("")
    lines.append("```yaml")
    lines.append("# Front Matter příklad pro podcast článek")
    lines.append("---")

    podcast_keys_order = [
        'postID', 'postTitle', 'postSlug', 'postUrlId', 'postDateTime',
        'postDescRaw', 'excerpt', 'postStatus', 'authorID', 'sectionID',
        'blogID', 'category', '_category', 'postTags', 'no_ads',
        'include_rss', 'category_highlight', 'og_title', 'og_description', 'og_image', 'og_type'
    ]

    for key in podcast_keys_order:
        if key in podcast_data:
            value = podcast_data[key]
            if isinstance(value, list):
                lines.append(f"{key}:")
                for item in value:
                    lines.append(f"  - {item}")
            else:
                if '\n' in str(value):
                    lines.append(f"{key}: |")
                    for line in str(value).split('\n'):
                        lines.append(f"  {line}")
                else:
                    lines.append(f"{key}: {escape_yaml_value(value)}")

    lines.append("---")
    lines.append("```")
    lines.append("")
    lines.append("**Rozdíly oproti běžnému blog článku:**")
    lines.append("- `category` obsahuje `podcast,`")
    lines.append("- `_category` obsahuje `tema/podcast/`")
    lines.append("- `postUrlId` často obsahuje `podcast-` prefix (např. `podcast-konci-frontkec`)")
    lines.append("")

    # Zapisujeme do souboru
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print(f"Dokumentace byla vytvořena: {output_file}")


def create_example_files(blog_data, guide_data, output_dir, sql_file):
    """Vytvoří příkladové soubory s Front Matter."""

    # Blog post example
    blog_lines = []
    blog_lines.append("---")

    # Pouze potřebná pole - odstraněno: postSlug, blogID, _category, postTags
    blog_keys_order = [
        'postID', 'postTitle', 'postUrlId', 'postDateTime',
        'excerpt', 'postStatus', 'authorID', 'sectionID',
        'category', 'no_ads', 'include_rss',
        'category_highlight', 'og_title', 'og_description', 'og_image', 'og_type'
    ]

    for key in blog_keys_order:
        if key in blog_data:
            value = blog_data[key]

            # Boolean hodnoty
            if key in ('no_ads', 'include_rss', 'category_highlight'):
                blog_lines.append(f"{key}: {str(convert_boolean_value(value)).lower()}")
            # category jako seznam
            elif key == 'category':
                categories = parse_category_string(value) if isinstance(value, str) else (value if isinstance(value, list) else [])
                if categories:
                    blog_lines.append(f"{key}:")
                    for cat in categories:
                        blog_lines.append(f"  - {cat}")
                else:
                    blog_lines.append(f"{key}: []")
            # Textové položky vždy v uvozovkách
            elif key in ('postTitle', 'excerpt', 'og_title', 'og_description'):
                blog_lines.append(f"{key}: {escape_yaml_value(value, force_quotes=True)}")
            elif isinstance(value, list):
                blog_lines.append(f"{key}:")
                for item in value:
                    blog_lines.append(f"  - {item}")
            else:
                blog_lines.append(f"{key}: {escape_yaml_value(value)}")

    blog_lines.append("---")
    blog_lines.append("")
    blog_lines.append("# " + blog_data.get('postTitle', 'Název článku'))
    blog_lines.append("")

    # Získáme celý obsah z perch2_blog_posts
    post_id = blog_data.get('postID', 261)
    full_content = get_full_post_content(sql_file, post_id)
    if full_content:
        # Vyčistíme \r\n
        full_content = full_content.replace('\r\n', '\n').replace('\r', '\n')
        blog_lines.append(full_content)
    else:
        # Fallback na postDescRaw z indexu
        content = blog_data.get('postDescRaw', 'Obsah článku...')
        content = content.replace('\\r\\n', '\n').replace('\\n', '\n').replace('\\r', '\n')
        blog_lines.append(content)

    blog_file = f"{output_dir}/blog-rok-2025-example.md"
    with open(blog_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(blog_lines))

    print(f"Příklad blog článku: {blog_file}")

    # Guide article example
    guide_lines = []
    guide_lines.append("---")

    # Pouze potřebná pole - odstraněno: _category
    # Přidáno: og_* značky pro sociální sítě
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
        elif key not in guide_data:
            continue
        else:
            value = guide_data[key]

        # Přeskočíme prázdné og_image
        if key == 'og_image' and (not value or value == ''):
            continue

        # Boolean hodnoty
        if key in ('no_ads', 'include_rss', 'category_highlight'):
            guide_lines.append(f"{key}: {str(convert_boolean_value(value)).lower()}")
        # category jako seznam
        elif key == 'category':
            categories = parse_category_string(value) if isinstance(value, str) else (value if isinstance(value, list) else [])
            if categories:
                guide_lines.append(f"{key}:")
                for cat in categories:
                    guide_lines.append(f"  - {cat}")
            else:
                guide_lines.append(f"{key}: []")
        # Textové položky vždy v uvozovkách
        elif key in ('heading', 'perex', 'og_title', 'og_description'):
            guide_lines.append(f"{key}: {escape_yaml_value(value, force_quotes=True)}")
        elif isinstance(value, list):
            guide_lines.append(f"{key}:")
            for item in value:
                guide_lines.append(f"  - {item}")
        else:
            guide_lines.append(f"{key}: {escape_yaml_value(value)}")

    guide_lines.append("---")
    guide_lines.append("")
    guide_lines.append("# " + guide_data.get('heading', 'Nadpis článku'))
    guide_lines.append("")

    # Obsah - perex je už v Front Matter, takže ho jen zobrazíme
    perex = guide_data.get('perex', 'Perex článku...')
    perex = perex.replace('\\r\\n', '\n').replace('\\n', '\n').replace('\\r', '\n')
    guide_lines.append(perex)

    guide_file = f"{output_dir}/guide-css-selektory-example.md"
    with open(guide_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(guide_lines))

    print(f"Příklad příručka článku: {guide_file}")


def create_podcast_example(podcast_data, output_dir, sql_file):
    """Vytvoří příkladový soubor pro podcast."""
    podcast_lines = []
    podcast_lines.append("---")

    # Pouze potřebná pole - odstraněno: postSlug, blogID, _category, postTags, category (všechno je podcast)
    podcast_keys_order = [
        'postID', 'postTitle', 'postUrlId', 'postDateTime',
        'excerpt', 'postStatus', 'authorID', 'sectionID',
        'no_ads', 'include_rss', 'category_highlight',
        'og_title', 'og_description', 'og_image', 'og_type'
    ]

    for key in podcast_keys_order:
        # Fallback hodnoty pro og_* pokud nejsou v datech
        if key == 'og_title' and key not in podcast_data:
            value = podcast_data.get('postTitle', '')
        elif key == 'og_description' and key not in podcast_data:
            value = podcast_data.get('excerpt', '')
        elif key == 'og_image' and key not in podcast_data:
            value = ''  # Prázdné, pokud není v datech
        elif key == 'og_type' and key not in podcast_data:
            value = 'article'
        elif key not in podcast_data:
            continue
        else:
            value = podcast_data[key]

        # Přeskočíme prázdné og_image
        if key == 'og_image' and (not value or value == ''):
            continue

        # Boolean hodnoty
        if key in ('no_ads', 'include_rss', 'category_highlight'):
            podcast_lines.append(f"{key}: {str(convert_boolean_value(value)).lower()}")
        # Textové položky vždy v uvozovkách
        elif key in ('postTitle', 'excerpt', 'og_title', 'og_description'):
            podcast_lines.append(f"{key}: {escape_yaml_value(value, force_quotes=True)}")
        elif isinstance(value, list):
            podcast_lines.append(f"{key}:")
            for item in value:
                podcast_lines.append(f"  - {item}")
        else:
            podcast_lines.append(f"{key}: {escape_yaml_value(value)}")

    podcast_lines.append("---")
    podcast_lines.append("")
    podcast_lines.append("# " + podcast_data.get('postTitle', 'Název podcastu'))
    podcast_lines.append("")

    # Získáme celý obsah z perch2_blog_posts
    post_id = podcast_data.get('postID', 259)
    full_content = get_full_post_content(sql_file, post_id)
    if full_content:
        # Vyčistíme \r\n
        full_content = full_content.replace('\r\n', '\n').replace('\r', '\n')
        podcast_lines.append(full_content)
    else:
        # Fallback na postDescRaw z indexu
        content = podcast_data.get('postDescRaw', 'Obsah podcastu...')
        content = content.replace('\\r\\n', '\n').replace('\\n', '\n').replace('\\r', '\n')
        podcast_lines.append(content)

    podcast_file = f"{output_dir}/podcast-konci-frontkec-example.md"
    with open(podcast_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(podcast_lines))

    print(f"Příklad podcast článku: {podcast_file}")


if __name__ == '__main__':
    # Použijeme relativní cesty k aktuální složce
    script_dir = os.path.dirname(os.path.abspath(__file__))
    sql_file = os.path.join(script_dir, 'vdinno.sql')
    output_file = os.path.join(script_dir, 'frontmatter_schema.md')
    output_dir = script_dir

    # Extrahujeme data
    print("Extrahuji data pro blog článek 'rok-2025' (postID 261)...")
    blog_data = extract_blog_post_data(sql_file, 261)
    print(f"  Nalezeno {len(blog_data)} polí")

    print("Extrahuji data pro příručka článek 'css-selektory' (itemID 989)...")
    guide_data = extract_guide_article_data(sql_file, 989)
    print(f"  Nalezeno {len(guide_data)} polí")

    print("Extrahuji data pro podcast 'podcast-konci-frontkec' (postID 259)...")
    podcast_data = extract_blog_post_data(sql_file, 259)
    print(f"  Nalezeno {len(podcast_data)} polí")

    # Vytvoříme dokumentaci
    print("\nVytvářím dokumentaci...")
    create_frontmatter_schema(blog_data, guide_data, podcast_data, output_file)

    # Vytvoříme příkladové soubory
    print("\nVytvářím příkladové soubory...")
    create_example_files(blog_data, guide_data, output_dir, sql_file)

    # Vytvoříme příklad podcastu
    print("\nVytvářím příklad podcastu...")
    create_podcast_example(podcast_data, output_dir, sql_file)

    print("\nHotovo!")
