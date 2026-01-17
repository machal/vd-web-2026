#!/usr/bin/env python3
"""
Skript pro extrakci všech blog postů (kromě podcastů) z databáze do Markdown souborů s Front Matter.
"""

import re
import os
from collections import defaultdict
from extract_frontmatter_schema import (
    extract_blog_post_data,
    get_full_post_content,
    escape_yaml_value,
    convert_boolean_value,
    parse_category_string
)


def find_all_blogs(sql_file):
    """Najde všechny blog posty v databázi (kromě podcastů)."""
    blogs = []
    podcast_post_ids = set()
    
    with open(sql_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Najdeme všechny postID s postUrlId
    url_pattern = r"\((\d+), 'postID', (\d+), 'postUrlId', '([^']+)'\)"
    post_urls = {}
    for match in re.finditer(url_pattern, content):
        post_id = int(match.group(2))
        url_id = match.group(3)
        if post_id not in post_urls:
            post_urls[post_id] = url_id
    
    # Najdeme všechny postID s kategorií
    category_pattern = r"\((\d+), 'postID', (\d+), 'category', '([^']*)'\)"
    post_categories = {}
    for match in re.finditer(category_pattern, content):
        post_id = int(match.group(2))
        category = match.group(3)
        if post_id not in post_categories:
            post_categories[post_id] = category
    
    # Najdeme všechny postID s _category (interní kategorie)
    _category_pattern = r"\((\d+), 'postID', (\d+), '_category', '([^']*)'\)"
    post__categories = {}
    for match in re.finditer(_category_pattern, content):
        post_id = int(match.group(2))
        _category = match.group(3)
        if post_id not in post__categories:
            post__categories[post_id] = []
        if 'podcast' in _category.lower():
            post__categories[post_id].append(_category)
    
    # Identifikujeme podcasty a vyloučíme je:
    # 1. Podle postUrlId začínajícího "podcast-"
    # 2. Podle kategorie obsahující "podcast"
    # 3. Podle _category obsahující "podcast"
    for post_id, url_id in post_urls.items():
        is_podcast = False
        
        if url_id.startswith('podcast-'):
            is_podcast = True
        elif post_id in post_categories and 'podcast' in post_categories[post_id].lower():
            is_podcast = True
        elif post_id in post__categories and len(post__categories[post_id]) > 0:
            # Má _category obsahující "podcast"
            is_podcast = True
        
        if is_podcast:
            podcast_post_ids.add(post_id)
    
    # Vytvoříme seznam blog postů (všechny kromě podcastů)
    for post_id, url_id in post_urls.items():
        if post_id not in podcast_post_ids:
            blogs.append({
                'postID': post_id,
                'postUrlId': url_id
            })
    
    return blogs


def create_blog_markdown(blog_data, sql_file, output_dir):
    """Vytvoří Markdown soubor pro jeden blog post."""
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
        # Fallback hodnoty pro og_* pokud nejsou v datech
        if key == 'og_title' and key not in blog_data:
            value = blog_data.get('postTitle', '')
        elif key == 'og_description' and key not in blog_data:
            value = blog_data.get('excerpt', '')
        elif key == 'og_image' and key not in blog_data:
            value = ''  # Prázdné, pokud není v datech
        elif key == 'og_type' and key not in blog_data:
            value = 'article'
        elif key not in blog_data:
            continue
        else:
            value = blog_data[key]
        
        # Přeskočíme prázdné og_image
        if key == 'og_image' and (not value or value == ''):
            continue
        
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
    post_id = blog_data.get('postID')
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
    
    # Vytvoříme název souboru: {postID}-{postUrlId}.md
    post_id = blog_data.get('postID')
    post_url_id = blog_data.get('postUrlId', f'post-{post_id}')
    filename = f"{post_id}-{post_url_id}.md"
    filepath = os.path.join(output_dir, filename)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(blog_lines))
    
    return filepath


if __name__ == '__main__':
    # Použijeme relativní cesty k aktuální složce
    script_dir = os.path.dirname(os.path.abspath(__file__))
    sql_file = os.path.join(script_dir, 'vdinno.sql')
    output_dir = os.path.join(script_dir, 'content', 'blog')
    
    # Vytvoříme výstupní složku
    os.makedirs(output_dir, exist_ok=True)
    
    # Najdeme všechny blog posty
    print("Hledám všechny blog posty v databázi (kromě podcastů)...")
    blogs = find_all_blogs(sql_file)
    print(f"  Nalezeno {len(blogs)} blog postů")
    
    # Extrahujeme a vytvoříme soubory
    print("\nExtrahuji data a vytvářím Markdown soubory...")
    created_files = []
    errors = []
    
    for i, blog_info in enumerate(blogs, 1):
        post_id = blog_info['postID']
        post_url_id = blog_info['postUrlId']
        
        try:
            print(f"  [{i}/{len(blogs)}] Extrahuji blog post {post_id}-{post_url_id}...")
            
            # Extrahujeme data
            blog_data = extract_blog_post_data(sql_file, post_id)
            
            if not blog_data:
                print(f"    ⚠️  Varování: Žádná data pro postID {post_id}")
                errors.append(f"postID {post_id}: žádná data")
                continue
            
            # Vytvoříme Markdown soubor
            filepath = create_blog_markdown(blog_data, sql_file, output_dir)
            created_files.append(filepath)
            print(f"    ✓ Vytvořen: {os.path.basename(filepath)}")
            
        except Exception as e:
            print(f"    ✗ Chyba při zpracování postID {post_id}: {e}")
            errors.append(f"postID {post_id}: {e}")
    
    print(f"\n✓ Hotovo! Vytvořeno {len(created_files)} souborů ve složce {output_dir}")
    
    if errors:
        print(f"\n⚠️  {len(errors)} chyb:")
        for error in errors:
            print(f"  - {error}")
