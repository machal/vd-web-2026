#!/usr/bin/env python3
"""
Skript pro extrakci struktury databáze z SQL dumpu.
Extrahuje CREATE TABLE příkazy, indexy, foreign keys a AUTO_INCREMENT nastavení.
"""

import re
import sys
import os

def extract_schema(input_file, output_file):
    """Extrahuje strukturu databáze z SQL dumpu."""
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    output_lines = []
    
    # Hlavička souboru
    header_match = re.search(r'(-- phpMyAdmin SQL Dump.*?SET NAMES utf8mb4 \*/)', content, re.DOTALL)
    if header_match:
        output_lines.append(header_match.group(1))
        output_lines.append('')
        output_lines.append('--')
        output_lines.append('-- Database schema: `vdinno`')
        output_lines.append('-- Extracted structure only (no data)')
        output_lines.append('--')
        output_lines.append('')
    
    # Najdeme všechny CREATE TABLE bloky
    create_table_pattern = r'--\s*Table structure for table `([^`]+)`\s*--\s*(CREATE TABLE[^;]+;)'
    for match in re.finditer(create_table_pattern, content, re.DOTALL | re.IGNORECASE):
        table_name = match.group(1)
        create_statement = match.group(2)
        
        # Vyčistíme CREATE TABLE statement
        create_statement = re.sub(r'\s+', ' ', create_statement)
        create_statement = create_statement.replace(' ;', ';')
        
        output_lines.append('--')
        output_lines.append(f'-- Table structure for table `{table_name}`')
        output_lines.append('--')
        output_lines.append('')
        
        # Formátujeme CREATE TABLE pro lepší čitelnost
        formatted = format_create_table(create_statement)
        output_lines.append(formatted)
        output_lines.append('')
    
    # Najdeme všechny ALTER TABLE příkazy pro indexy
    output_lines.append('--')
    output_lines.append('-- Indexes for dumped tables')
    output_lines.append('--')
    output_lines.append('')
    
    index_pattern = r'--\s*Indexes for table `([^`]+)`\s*--\s*(ALTER TABLE[^;]+;)'
    for match in re.finditer(index_pattern, content, re.DOTALL | re.IGNORECASE):
        table_name = match.group(1)
        alter_statement = match.group(2)
        
        # Vyčistíme a formátujeme
        alter_statement = re.sub(r'\s+', ' ', alter_statement)
        alter_statement = alter_statement.replace(' ;', ';')
        
        output_lines.append('--')
        output_lines.append(f'-- Indexes for table `{table_name}`')
        output_lines.append('--')
        
        # Formátujeme ALTER TABLE pro indexy
        formatted = format_alter_table(alter_statement)
        output_lines.append(formatted)
        output_lines.append('')
    
    # Najdeme FULLTEXT indexy (jsou na samostatných řádcích)
    fulltext_pattern = r'ALTER TABLE `([^`]+)` ADD FULLTEXT KEY[^;]+;'
    for match in re.finditer(fulltext_pattern, content, re.IGNORECASE):
        table_name = match.group(1)
        fulltext_statement = match.group(0)
        
        # Najdeme, jestli už není v outputu
        if not any(f'-- Indexes for table `{table_name}`' in line for line in output_lines):
            output_lines.append('--')
            output_lines.append(f'-- Indexes for table `{table_name}`')
            output_lines.append('--')
        
        output_lines.append(fulltext_statement)
        output_lines.append('')
    
    # AUTO_INCREMENT nastavení
    output_lines.append('--')
    output_lines.append('-- AUTO_INCREMENT for dumped tables')
    output_lines.append('--')
    output_lines.append('')
    
    autoinc_pattern = r'--\s*AUTO_INCREMENT for table `([^`]+)`\s*--\s*(ALTER TABLE[^;]+AUTO_INCREMENT=\d+;)'
    for match in re.finditer(autoinc_pattern, content, re.DOTALL | re.IGNORECASE):
        table_name = match.group(1)
        alter_statement = match.group(2)
        
        alter_statement = re.sub(r'\s+', ' ', alter_statement)
        alter_statement = alter_statement.replace(' ;', ';')
        
        output_lines.append('--')
        output_lines.append(f'-- AUTO_INCREMENT for table `{table_name}`')
        output_lines.append('--')
        output_lines.append(alter_statement)
        output_lines.append('')
    
    # Foreign key constraints
    output_lines.append('--')
    output_lines.append('-- Constraints for dumped tables')
    output_lines.append('--')
    output_lines.append('')
    
    constraint_pattern = r'--\s*Constraints for table `([^`]+)`\s*--\s*(ALTER TABLE[^;]+;)'
    for match in re.finditer(constraint_pattern, content, re.DOTALL | re.IGNORECASE):
        table_name = match.group(1)
        alter_statement = match.group(2)
        
        alter_statement = re.sub(r'\s+', ' ', alter_statement)
        alter_statement = alter_statement.replace(' ;', ';')
        
        output_lines.append('--')
        output_lines.append(f'-- Constraints for table `{table_name}`')
        output_lines.append('--')
        
        formatted = format_alter_table(alter_statement)
        output_lines.append(formatted)
        output_lines.append('')
    
    # Závěr
    output_lines.append('COMMIT;')
    output_lines.append('')
    output_lines.append('/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;')
    output_lines.append('/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;')
    output_lines.append('/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;')
    
    # Zapisujeme do výstupního souboru
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(output_lines))
    
    print(f"Schéma databáze bylo úspěšně extrahováno do souboru: {output_file}")


def format_create_table(statement):
    """Formátuje CREATE TABLE příkaz pro lepší čitelnost."""
    # Najdeme název tabulky
    table_match = re.search(r'CREATE TABLE `([^`]+)`\s*\((.*?)\)\s*(ENGINE.*?);', statement, re.DOTALL | re.IGNORECASE)
    if not table_match:
        return statement
    
    table_name = table_match.group(1)
    columns = table_match.group(2)
    engine = table_match.group(3).strip()
    
    # Rozdělíme sloupce
    column_lines = []
    for col in columns.split(','):
        col = col.strip()
        if col:
            column_lines.append('  ' + col)
    
    # Sestavíme formátovaný výstup
    result = f"CREATE TABLE `{table_name}` (\n"
    result += ',\n'.join(column_lines)
    result += f"\n) {engine};"
    
    return result


def format_alter_table(statement):
    """Formátuje ALTER TABLE příkaz pro lepší čitelnost."""
    # Najdeme všechny ADD příkazy
    if 'ADD CONSTRAINT' in statement or 'ADD PRIMARY KEY' in statement or 'ADD KEY' in statement or 'ADD UNIQUE KEY' in statement or 'ADD FULLTEXT KEY' in statement:
        # Najdeme ALTER TABLE část
        alter_match = re.match(r'(ALTER TABLE `[^`]+`)', statement, re.IGNORECASE)
        if not alter_match:
            return statement
        
        alter_part = alter_match.group(1)
        
        # Najdeme všechny ADD části
        add_pattern = r'ADD\s+(?:CONSTRAINT\s+[^,;]+|PRIMARY\s+KEY\s+[^,;]+|UNIQUE\s+KEY\s+[^,;]+|FULLTEXT\s+KEY\s+[^,;]+|KEY\s+[^,;]+)'
        add_matches = list(re.finditer(add_pattern, statement, re.IGNORECASE))
        
        if add_matches:
            result = alter_part
            for i, match in enumerate(add_matches):
                add_part = match.group(0).rstrip(',').rstrip(';').strip()
                result += '\n  ' + add_part + (',' if i < len(add_matches) - 1 else ';')
            return result
    
    return statement


if __name__ == '__main__':
    # Použijeme relativní cesty k aktuální složce, pokud nejsou zadány argumenty
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_file = os.path.join(script_dir, 'vdinno.sql')
    output_file = os.path.join(script_dir, 'vdinno_schema.sql')
    
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    if len(sys.argv) > 2:
        output_file = sys.argv[2]
    
    extract_schema(input_file, output_file)
