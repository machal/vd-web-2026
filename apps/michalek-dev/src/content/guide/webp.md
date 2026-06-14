---
title: "WebP images: the leaner alternative to JPEG, PNG, and GIF"
description: "WebP cuts image weight versus JPEG and PNG, adds transparency and animation, and ships everywhere. When it pays off and how to serve it safely."
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
  - web-vitals
---

# WebP: smaller images without dropping anyone

[WebP](https://developers.google.com/speed/webp/) is a raster image format Google introduced back in 2010. More than a decade later it is the boring, dependable choice: supported by practically every browser worth targeting, with Internet Explorer being the only notable holdout — and almost nobody is shipping for IE anymore.

Here is why it earned its place:

- meaningfully smaller files than both JPEG and PNG
- alpha transparency, which used to be PNG's party trick
- animation, the one thing GIF was good for

WebP does give up a couple of things JPEG offers. It does not do [chroma subsampling](https://en.wikipedia.org/wiki/Chroma_subsampling) the same way, and progressive rendering is not part of the picture either.

It is also sometimes described as slower to decode and harder on the CPU. [images.guide](https://images.guide/#how-does-webp-perform) keeps that worry honest:

> Back in 2013, the compression speed of WebP was ~10× slower than JPEG but is now negligible (some images may be 2× slower). For static images that are processed as part of your build, this shouldn't be a large issue. Dynamically generated images will likely cause a perceivable CPU overhead and will be something you will need to evaluate.

In other words: only worth a second thought if you are generating images on the fly. For build-time assets, ship it and move on.

## Browser support: the Chromium crowd, plus Firefox and Safari {#browser-support}

Since WebP comes from Google, every Chromium-based browser ships it out of the box — Chrome, Edge, Opera, Brave, and the rest. Firefox has supported it for years, and Safari joined the club too. For most global audiences that puts you comfortably above 90% coverage today.

- Supported: Chrome and Chromium derivatives, Firefox, [Safari 14 and up](https://developer.apple.com/documentation/safari-release-notes/safari-14-beta-release-notes#Media)
- Not supported, and never will be: every version of Internet Explorer

For the current numbers, check [caniuse.com/webp](https://caniuse.com/#feat=webp).

So what about the small slice of users on browsers without support? No drama — you do not have to serve them a page with no images.

## A JPEG fallback with `<picture>` {#fallback}

The clean answer is to generate two sets of images — WebP and JPEG — and let the browser pick the right one using the [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) element:

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="…">
</picture>
```

Chromium and friends download only the WebP; everyone else quietly gets the JPEG.

If you cannot use `<picture>`, there are alternatives — server-side content negotiation or [`.htaccess` rules](https://github.com/vincentorback/WebP-images-with-htaccess). But the `<picture>` approach is the most predictable and the most performance-friendly.

For images referenced from CSS, you can detect WebP support — and its individual features — with a library like [Modernizr](https://modernizr.com/download). The CSS then looks like this:

```css
.box {
  background-image: url("image.jpg");
}

.webp .box {
  background-image: url("image.webp");
}
```

Google also publishes a tiny [detection snippet](https://developers.google.com/speed/webp/faq#in_your_own_javascript) on its WebP pages.

Is it worth maintaining two copies of every image? It depends — but on larger sites, in my experience, it pays off handsomely.

## How much data does WebP actually save? {#savings}

On one client e-commerce project I [wrote about](https://www.vzhurudolu.cz/prirucka/rychlost-designeri), the team's results were concrete:

> After switching to WebP they cut 30% off the homepage weight (1250 kB → 950 kB) and shaved a fifth off page load time (19.8 s → 16.8 s).

I see similar numbers across other tests and client work. Halving image payload is not unusual.

[Google's own studies](https://developers.google.com/speed/webp/) put the general savings at roughly:

- 26% smaller than lossless PNG
- 25–34% smaller than lossy JPEG

## How to produce WebP {#how-to-produce}

There is no shortage of ways to generate WebP these days:

- **Design apps:** Sketch, Pixelmator, and GIMP export directly. Photoshop and other Adobe tools do not, but there is a [plugin](https://github.com/fnordware/AdobeWebM).
- **CLI and libraries:** [cwebp](https://developers.google.com/speed/webp/docs/cwebp) for the [libwebp](https://developers.google.com/speed/webp/docs/using) codec.
- **Build pipelines:** plugins like [imagemin-webp](https://github.com/imagemin/imagemin-webp) for Gulp, Grunt, or whatever bundler you run.
- **Server-side:** [ImageMagick](https://imagemagick.org/script/webp.php) and similar libraries.
- **Online services:** [Kraken.io](https://kraken.io/) and others — excellent compression, usually paid, sometimes not cheap.

For more options, see [web.dev](https://web.dev/serve-images-webp/) or [images.guide](https://images.guide/#how-do-i-convert-to-webp).
