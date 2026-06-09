---
title: "WebP images: a leaner alternative to JPEG, PNG, and GIF"
description: "WebP has become the default image format on the modern web. When it pays off, how much data you save, and how to serve it with a JPEG fallback."
date: 2024-07-07
published: true
pairId: webp
author: Martin Michálek
adaptedFrom:
  title: "WebP obrázky: datově úsporná alternativa k JPEG, PNG i GIF"
  url: "https://www.vzhurudolu.cz/prirucka/webp"
tags:
  - images
  - webp
  - performance
---

# WebP images: a leaner alternative to JPEG, PNG, and GIF

[WebP](https://developers.google.com/speed/webp/) is a raster image format Google introduced in 2010.

Today it is supported by virtually every browser worth targeting — Internet Explorer being the well-known exception.

The main benefits:

- noticeably smaller files compared with JPEG and PNG
- alpha transparency, previously the domain of PNG
- animation, something GIF could do but rarely did well

WebP does not support everything JPEG offers — for example [chroma subsampling](https://en.wikipedia.org/wiki/Chroma_subsampling) and progressive rendering work differently or not at all.

WebP can also be slower to decode and more CPU-hungry. [images.guide](https://images.guide/#how-does-webp-perform) puts it in perspective:

> Back in 2013, the compression speed of WebP was ~10× slower than JPEG but is now negligible (some images may be 2× slower). For static images that are processed as part of your build, this shouldn't be a large issue. Dynamically generated images will likely cause a perceivable CPU overhead and will be something you will need to evaluate.

So weigh decode cost mainly when you generate images on the fly.

## Browser support {#support}

Because WebP comes from Google, Chromium-based browsers ship it out of the box — Edge, Opera, Brave, and others. Firefox and Safari support it too. For most global audiences you are looking at well over 90% coverage.

- Supported: Chrome and Chromium derivatives, Firefox, [Safari 14+](https://developer.apple.com/documentation/safari-release-notes/safari-14-beta-release-notes#Media)
- Not supported: any version of Internet Explorer

What about the minority still on unsupported browsers? You do not have to drop images altogether.

## Fallback to JPEG {#fallback}

Generate two sets — WebP and JPEG — and let the browser choose with [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture):

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="…">
</picture>
```

Chromium users download WebP; everyone else gets JPEG.

If `<picture>` is not an option, server-side detection or [`.htaccess` rules](https://github.com/vincentorback/WebP-images-with-htaccess) exist — but `<picture>` is usually the cleanest and most predictable approach.

For CSS backgrounds, libraries like [Modernizr](https://modernizr.com/download) can expose feature classes:

```css
.box {
  background-image: url("image.jpg");
}

.webp .box {
  background-image: url("image.webp");
}
```

Google also documents a small [detection snippet](https://developers.google.com/speed/webp/faq#in_your_own_javascript).

Is doubling assets worth it? On larger sites, very often yes.

## How much data does WebP save? {#savings}

On one client e-commerce project we [documented](https://www.vzhurudolu.cz/prirucka/rychlost-designeri) a 30% reduction in homepage weight (1250 kB → 950 kB) and a fifth off page load time (19.8 s → 16.8 s on a slow connection).

Similar results show up in audits I run. Halving image weight is not unusual.

[Google's own benchmarks](https://developers.google.com/speed/webp/) report roughly:

- 26% smaller lossless PNG equivalents
- 25–34% smaller lossy JPEG equivalents

## How to produce WebP {#how-to}

As of 2024 you have plenty of options:

- Design tools: Sketch, Pixelmator, GIMP export directly; Adobe apps need a [plugin](https://github.com/fnordware/AdobeWebM)
- CLI: [cwebp](https://developers.google.com/speed/webp/docs/cwebp) and [libwebp](https://developers.google.com/speed/webp/docs/using)
- Build pipelines: [imagemin-webp](https://github.com/imagemin/imagemin-webp) with Grunt, Gulp, or similar
- Server-side: [ImageMagick](https://imagemagick.org/script/webp.php)
- Services: [Kraken.io](https://kraken.io/) and others (often paid, often excellent)

More pointers: [web.dev](https://web.dev/serve-images-webp/) and [images.guide](https://images.guide/#how-do-i-convert-to-webp).

---
