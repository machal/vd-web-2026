// === Nastaveni sIFR nadpisu  ===
// www.festival.cz
// Autori: michalek@shortcat.cz, karmi@karmi.cz

// Jednoduchy wrapper pro inicializaci Sifru. Volame vzapeti nize. Viz application.js.
function sifr_initialize() { 

  // Ulozeni jednotlivych fontu do promennych
  var galaxie_polaris_book = { src: '/swf/galaxie-polaris-book-sifr3.swf' };
  var galaxie_polaris_light = { src: '/swf/galaxie-polaris-light-sifr3.swf' };
  
  
  // Aktivujeme sIFR nadpisy
  sIFR.activate(galaxie_polaris_book, galaxie_polaris_light); 
  
  
  // === Jednotlive nadpisy ===
  
  // Titulek stranky v hlavicce
  sIFR.replace(galaxie_polaris_book, {
    selector: '#web-title',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: '.sIFR-root { background-color: #EDE9E6; color: #322a21; }',
    opaque: true,
    fixFocus: true
  });

  // Hlavni nadpis stranky v Archivu
  sIFR.replace(galaxie_polaris_light, {
    selector: '.archive #content-head h1',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35], 
    css: '.sIFR-root { background-color: #EDE9E6; color: #71685c; }',
    opaque: true,
    fixFocus: true
  });
   
  // Hlavni nadpis stranky
  sIFR.replace(galaxie_polaris_light, {
    selector: '#content-head h1',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35], 
    css: '.sIFR-root { background-color: #EDE9E6; color: #322a21; }',
    opaque: true,
    fixFocus: true
  });
  
   

  // Nadpis sekce (napr. Archiv)
  sIFR.replace(galaxie_polaris_light, {
    selector: '#section-head h2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35], 
    css: '.sIFR-root { color: #322a21; background-color: #E4DFDB; }',
    opaque: true,
    fixFocus: true
  });  
  
  // Nadpis druhe urovne, centrovany - uvodni stranka souteze
  sIFR.replace(galaxie_polaris_book, {
    selector: '#competition-results #prices-handover h2, #competition-results .instrument  .round h3',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: [
      '.sIFR-root {background-color: #ffffff; color: #322a21; text-align: center; }',
      'a { text-decoration: none; color: #322a21; }',
      'a:hover { text-decoration: none; color: #0084CD; }'
    ],
    opaque: true,
    fixFocus: true
  });    
  
  // Nadpis s tmavym pozadim, centrovany - nazev nastroje ve vysledcich souteze
  sIFR.replace(galaxie_polaris_light, {
    selector: '#competition-results .instrument .heading h2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35], 
    css: [
      '.sIFR-root {background-color: #ede9e6; color: #322a21; text-align: center; }',
      'a { text-decoration: none; color: #0084CD; }',
      'a:hover { text-decoration: none; color: #0084CD; }'
    ],
    opaque: true,
    fixFocus: true
  });  
  
  
  // Nadpisy v detailu akce, detailu mista konani, nazvu clanku, nazvu stranky souteze, nazvu umelce
  sIFR.replace(galaxie_polaris_light, {
    selector: '.program_events #content h2, .venues #content h2, #content h1, #competition-articles .article h2, .competition_pages.show #content h1, #artist h2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35], 
    css: [
      '.sIFR-root {background-color: #ffffff; color: #322a21; }',
      'a { text-decoration: none; color: #0084CD; }',
      'a:hover { text-decoration: none; color: #0084CD; }'
    ],
    opaque: true,
    fixFocus: true
  });
  
  // Nadpis druhe urovne - v obsahu stranky
  sIFR.replace(galaxie_polaris_book, {
    selector: '.soutezni-podminky #content h2, .vstupenky #content h2, .competition_submissions #content h2, #articles-for-homepage h2, .prodejni_mista #content h2, .organizacni_struktura #content h2, .tiskovy_servis #content h2, .error-page #content h2, #content .search-results h2, #content #article-sections h2, .articles.show #content h2, .competition-pre-selection #content h2, .pages.index #news h2, .competitions.pages.show #content h2, .friends #content h2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: [
      '.sIFR-root {background-color: #ffffff; color: #322a21;  }',
      'a { text-decoration: none; color: #322a21; }',
      'a:hover { text-decoration: none; color: #0084CD; }'
    ],
    opaque: true,
    fixFocus: true
  });
  

  
  
  // Barevne nadpisy v Abonentnich koncertech
  sIFR.replace(galaxie_polaris_book, {
    selector: '.abonentni_koncerty #content h2.category-color-1',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: '.sIFR-root { background-color: #ffffff; color: #B14289; }',
    opaque: true,
    fixFocus: true
  });
  
  sIFR.replace(galaxie_polaris_book, {
    selector: '.abonentni_koncerty #content h2.category-color-2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: '.sIFR-root { background-color: #ffffff; color: #623287; }',
    opaque: true,
    fixFocus: true
  });
  
  sIFR.replace(galaxie_polaris_book, {
    selector: '.abonentni_koncerty #content h2.category-color-3',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: '.sIFR-root { background-color: #ffffff; color: #046F8F; }',
    opaque: true,
    fixFocus: true
  });
  
  sIFR.replace(galaxie_polaris_book, {
    selector: '.abonentni_koncerty #content h2.category-color-4',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: '.sIFR-root { background-color: #ffffff; color: #40925B; }',
    opaque: true,
    fixFocus: true
  });
  
  sIFR.replace(galaxie_polaris_book, {
    selector: '.abonentni_koncerty #content h2.category-color-5',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: '.sIFR-root { background-color: #ffffff; color: #8C9C00; }',
    opaque: true,
    fixFocus: true
  });
  
  sIFR.replace(galaxie_polaris_book, {
    selector: '.abonentni_koncerty #content h2.category-color-6',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: '.sIFR-root { background-color: #ffffff; color: #C56600; }',
    opaque: true,
    fixFocus: true
  });
  
  sIFR.replace(galaxie_polaris_book, {
    selector: '.abonentni_koncerty #content h2.category-color-7',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: '.sIFR-root { background-color: #ffffff; color: #A41F18; }',
    opaque: true,
    fixFocus: true
  });
  
  // Barevne nadpisy v Clancich
  
  sIFR.replace(galaxie_polaris_light, {
    selector: '.articles #content .block-category-color-1 h2, .article_sections #content .block-category-color-1 h2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: [
      '.sIFR-root {background-color: #ffffff; color: #322a21; }',
      'a { text-decoration: none; color: #B14289; }',
      'a:hover { text-decoration: none; color: #B14289; }'
    ],
    opaque: true,
    fixFocus: true
  });
  
  sIFR.replace(galaxie_polaris_light, {
    selector: '.articles #content .block-category-color-2 h2, .article_sections #content .block-category-color-2 h2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: [
      '.sIFR-root {background-color: #ffffff; color: #322a21; }',
      'a { text-decoration: none; color: #623287; }',
      'a:hover { text-decoration: none; color: #623287; }'
    ],
    opaque: true,
    fixFocus: true
  });
  
  sIFR.replace(galaxie_polaris_light, {
    selector: '.articles #content .block-category-color-3 h2, .article_sections #content .block-category-color-3 h2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: [
      '.sIFR-root {background-color: #ffffff; color: #322a21; }',
      'a { text-decoration: none; color: #046F8F; }',
      'a:hover { text-decoration: none; color: #046F8F; }'
    ],
    opaque: true,
    fixFocus: true
  });
  
  sIFR.replace(galaxie_polaris_light, {
    selector: '.articles #content .block-category-color-4 h2, .article_sections #content .block-category-color-4 h2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: [
      '.sIFR-root {background-color: #ffffff; color: #322a21; }',
      'a { text-decoration: none; color: #40925B; }',
      'a:hover { text-decoration: none; color: #40925B; }'
    ],
    opaque: true,
    fixFocus: true
  });
  
  sIFR.replace(galaxie_polaris_light, {
    selector: '.articles #content .block-category-color-5 h2, .article_sections #content .block-category-color-5 h2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: [
      '.sIFR-root {background-color: #ffffff; color: #322a21; }',
      'a { text-decoration: none; color: #8C9C00; }',
      'a:hover { text-decoration: none; color: #8C9C00; }'
    ],
    opaque: true,
    fixFocus: true
  });
  
  sIFR.replace(galaxie_polaris_light, {
    selector: '.articles #content .block-category-color-6 h2, .article_sections #content .block-category-color-6 h2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: [
      '.sIFR-root {background-color: #ffffff; color: #322a21; }',
      'a { text-decoration: none; color: #C56600; }',
      'a:hover { text-decoration: none; color: #C56600; }'
    ],
    opaque: true,
    fixFocus: true
  });
  
  sIFR.replace(galaxie_polaris_light, {
    selector: '.articles #content .block-category-color-7 h2, .article_sections #content .block-category-color-7 h2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35],
    css: [
      '.sIFR-root {background-color: #ffffff; color: #322a21; }',
      'a { text-decoration: none; color: #A41F18; }',
      'a:hover { text-decoration: none; color: #A41F18; }'
    ],
    opaque: true,
    fixFocus: true
  });
  
  // Nazev clanku bez barvy
  sIFR.replace(galaxie_polaris_light, {
    selector: '.articles #content h2, .article_sections #content h2',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35], 
    css: [
      '.sIFR-root {background-color: #ffffff; color: #322a21; }',
      'a { text-decoration: none; color: #0084CD; }',
      'a:hover { text-decoration: none; color: #0084CD; }'
    ],
    opaque: true,
    fixFocus: true
  });
  
  
  // Uvodni text v Pratelich PJ
  sIFR.replace(galaxie_polaris_light, {
    selector: '.friends.index #content big',
    ratios: [7, 1.58, 8, 1.48, 10, 1.5, 14, 1.45, 17, 1.43, 20, 1.41, 23, 1.4, 29, 1.39, 38, 1.38, 40, 1.37, 43, 1.38, 58, 1.37, 66, 1.36, 67, 1.37, 95, 1.36, 96, 1.35, 98, 1.36, 99, 1.35, 103, 1.36, 104, 1.35, 105, 1.36, 107, 1.35, 108, 1.36, 110, 1.35, 111, 1.36, 1.35], 
    css: [
      '.sIFR-root {background-color: #ffffff; color: #0084CD; }'
    ],
    opaque: true,
    fixFocus: true
  });  
    

} // end if

sifr_initialize()
