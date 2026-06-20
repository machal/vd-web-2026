export interface EbookCatalogItem {
  slug: string;
  href: string;
  title: string;
  image: {
    avif: string;
    webp: string;
    alt: string;
    width: number;
    height: number;
  };
  descriptionHtml: string;
  buttonClass?: string;
  descriptionClass?: string;
}

export const ebooksCatalog: EbookCatalogItem[] = [
  {
    slug: 'css-layout',
    href: '/css-layout/',
    title: 'CSS: moderní layout',
    image: {
      avif: '/assets/img/content/handmade/ebooks/vdlayout/vdlayout-front-both.avif',
      webp: '/assets/img/content/handmade/ebooks/vdlayout/vdlayout-front-both.webp',
      alt: 'CSS: moderní layout',
      width: 130,
      height: 130,
    },
    descriptionHtml:
      'Grid, flexbox a nové metody rozvržení webů v příkladech. E-book a tištěná kniha. Vydáno:&nbsp;2022.<br>Cena: <strong>199-449&nbsp;Kč</strong>',
    buttonClass: 'mx-1',
  },
  {
    slug: 'vdwd',
    href: '/kniha-responzivni-design/',
    title: 'Vzhůru do (responzivního) webdesignu',
    image: {
      avif: '/assets/img/content/handmade/ebooks/vdwd/vdwd-ebook.avif',
      webp: '/assets/img/content/handmade/ebooks/vdwd/vdwd-ebook.webp',
      alt: 'Vzhůru do (responzivního) webdesignu',
      width: 130,
      height: 130,
    },
    descriptionHtml:
      'Kompletní průvodce návrhem a&nbsp;implementací responzivních webů. Vydáno:&nbsp;2017.<br>Cena: <strong>199&nbsp;Kč</strong>',
    buttonClass: 'mx-1',
  },
  {
    slug: 'vdamp',
    href: '/ebook-amp/',
    title: 'Vzhůru do AMP',
    image: {
      avif: '/assets/img/content/handmade/ebooks/vdamp/vdamp-ebook.avif',
      webp: '/assets/img/content/handmade/ebooks/vdamp/vdamp-ebook.webp',
      alt: 'Vzhůru do AMP',
      width: 130,
      height: 130,
    },
    descriptionHtml:
      'Vše o technologii pro tvorbu bezkonkurenčně rychlých webů v jednom e-booku. Vydáno:&nbsp;2019.<br>Cena:&nbsp;<strong>99&nbsp;Kč</strong>',
    buttonClass: 'px-1',
    descriptionClass: 'p-r',
  },
  {
    slug: 'vdcss3',
    href: '/ebook-css3/',
    title: 'Vzhůru do CSS3',
    image: {
      avif: '/assets/img/content/handmade/ebooks/vdcss3/vdcss3-ebook.avif',
      webp: '/assets/img/content/handmade/ebooks/vdcss3/vdcss3-ebook.webp',
      alt: 'Vzhůru do CSS3',
      width: 130,
      height: 130,
    },
    descriptionHtml:
      'Změny frontend kodéřiny, nástroje, postupy a &nbsp;nové CSS3 vlastnosti v&nbsp;jednom e-booku. Vydáno:&nbsp;2015.<br><strong>Zdarma ke stažení</strong>',
    buttonClass: 'mx-1',
  },
];
