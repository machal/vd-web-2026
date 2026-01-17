// Konfigurace kategorií článků
export interface CategoryConfig {
  slug: string;
  title: string;
  description: string;
  hasTOC: boolean;
  tags: string[]; // Tagy pro filtrování článků
}

export const categories: CategoryConfig[] = [
  {
    slug: 'dovednosti',
    title: 'Dovednosti',
    description: 'Měkké, ale i jiné dovednosti, sepisuji v článcích na Vzhůru dolů. Číst o nich znamená pochopit, jak se stát lepším profesionálem. A možná i člověkem.',
    hasTOC: false,
    tags: ['dovednosti'],
  },
  {
    slug: 'responzivni-design',
    title: 'Responzivní design',
    description: 'Zde najdete všechny naše články na témat responzivní design. Udělejte pružný layout, doplňte to pružnými obrázky a přidejte Media Queries. Jenže to většinou nestačí, responzivní design je také o způsobu uvažování. Mobily jsou dnes všude a proto je „responzivita" tak důležitá.',
    hasTOC: true,
    tags: ['responzivni-design'],
  },
  {
    slug: 'organizace-css',
    title: 'Organizace CSS',
    description: 'Napsat hodně CSS kódu není žádný problém. Horší je to s jeho údržbou, to všichni víme. Tady najdete všechny naše text na téma organizace a psaní CSS kódu.',
    hasTOC: true,
    tags: ['organizace-css'],
  },
  {
    slug: 'nastroje',
    title: 'Nástroje',
    description: 'Všechny naše texty o nástrojích moderní frontendové kodéřiny najdete zde. Zabýváme se hlavně ekosystémem kolem Node.js, automatizací a rychlostí webu.',
    hasTOC: true,
    tags: ['nastroje'],
  },
  {
    slug: 'rychlost-nacitani',
    title: 'Rychlost načítání webu',
    description: 'Wallmart změřil, že se jim každá vteřina zrychlení načtení stránky vrátí v podobě dvouprocentního navýšení konverzí. Rychlost webu je důležitá a tady najdete všechny naše články na toto téma.',
    hasTOC: true,
    tags: ['rychlost-nacitani'],
  },
  {
    slug: 'css',
    title: 'CSS',
    description: 'Zde najdete všechny naše články na téma CSS. Zabýváme se novějšími (CSS3) vlastnostmi a v další kategorii také organizací kaskádových stylů.',
    hasTOC: true,
    tags: ['css'],
  },
  {
    slug: 'javascript',
    title: 'JavaScript',
    description: 'Články o JavaScriptu',
    hasTOC: false,
    tags: ['javascript'],
  },
  {
    slug: 'html',
    title: 'HTML',
    description: 'Články o HTML',
    hasTOC: false,
    tags: ['html'],
  },
  {
    slug: 'svg',
    title: 'SVG',
    description: 'Články o SVG',
    hasTOC: false,
    tags: ['svg'],
  },
  {
    slug: 'bootstrap',
    title: 'Bootstrap',
    description: 'Články o Bootstrapu',
    hasTOC: false,
    tags: ['bootstrap'],
  },
  {
    slug: 'prohlizece',
    title: 'Prohlížeče',
    description: 'Články o prohlížečích',
    hasTOC: false,
    tags: ['prohlizece'],
  },
  {
    slug: 'netechnicke',
    title: 'Netechnické',
    description: 'Netechnické články',
    hasTOC: false,
    tags: ['netechnicke'],
  },
  {
    slug: 'skoleni',
    title: 'Školení',
    description: 'Články o školeních',
    hasTOC: false,
    tags: ['skoleni'],
  },
  {
    slug: 'pristupnost',
    title: 'Přístupnost',
    description: 'Články o přístupnosti',
    hasTOC: false,
    tags: ['pristupnost'],
  },
  {
    slug: 'wordpress',
    title: 'WordPress',
    description: 'Články o WordPressu',
    hasTOC: false,
    tags: ['wordpress'],
  },
  {
    slug: 'amp',
    title: 'AMP',
    description: 'Články o AMP',
    hasTOC: false,
    tags: ['amp'],
  },
  {
    slug: 'webdesign',
    title: 'Design',
    description: 'Články o designu',
    hasTOC: false,
    tags: ['webdesign'],
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return categories.find(cat => cat.slug === slug);
}
