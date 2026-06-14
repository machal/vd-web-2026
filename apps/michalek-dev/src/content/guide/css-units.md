---
title: "CSS Units (em, rem, %, px, vh, vw): Which One to Use Where?"
description: "A practical guide to CSS units for web design — em, rem, %, px, vh, and vw — and which one fits each situation."
date: 2018-12-03
published: true
pairId: css-units
author: Martin Michálek
adaptedFrom:
  title: "Jednotky pro tvorbu webu (em, rem, %, px, vh, vw): Kde použít jakou?"
  url: "https://www.vzhurudolu.cz/prirucka/jednotky"
tags:
  - css
  - typography
  - responsive-design
---

# CSS Units (em, rem, %, px, vh, vw): Which One to Use Where?

Let's round up all the CSS units you can reasonably use in modern web design — and show, with examples, what each one is good for.

My go-to units are the ones relative to font size: `rem` and `em`.

But I don't treat them as Supermen among CSS units either. They simply aren't right for everything. For different jobs we'll still need Spider-Man, Batman, and the rest of their colleagues.

## A quick overview of useful units {#overview}

These are the six worth committing to memory.

<div class="rwd-scrollable f-6" markdown="1">

| **Unit** | **How it computes the size?**                 |
|----------|-----------------------------------------------|
| `rem`    | relative to the font size on the `html` element |
| `em`     | relative to the font size on the element      |
| `px`     | the reference pixel, the CSS pixel            |
| `%`      | percentage relative to the parent element     |
| `vw`     | a percentage of the browser window's width    |
| `vh`     | a percentage of the browser window's height   |

</div>

There are of course others — `pt`, `ex`, or `vmax`, to name a few. But their usefulness is either small or close to none, so to keep things simple I'll leave them out of this text entirely.

## Which units to use in which situations? {#scenarios}

Throughout this text I care a lot about not breaking the natural inheritance of font size in browsers. Besides us, the page authors, the user may want to change it — and sometimes browsers change it too. So for different uses I recommend different units:

- Base font size of the document: [%](#document-font-size)
- Dimensions derived from the document's font size: [rem](#rem)
- Dimensions derived from the parent's font size: [em](#em)
- Media Queries: [em](#media-queries)
- Line height: [a unitless number](#line-height)
- Borders, decoration: [px](#decoration)
- Typography based on window size: [vw](#viewport-typography)

It's quite possible you'll get by with `px` almost everywhere. I'll get to that [at the end of the text](#px).

## Base font size of the document: % {#document-font-size}

The default font size in the vast majority of browsers is `16px`. But there are less prominent browsers that set the font size differently — simply so that reading is more comfortable on a particular device.

For example, the browser on the Kindle 3 had a default font size of `26px`, and Opera Mini 7 used `17px`. We could bet that most of the most widespread browsers don't change the default font size, but my experience says it's better not to.

Nicolas Hoizey wrote a nice article on default font sizes in browsers, "People don't change the default 16px font size in their browser (You wish!)": [nicolas-hoizey.com](https://nicolas-hoizey.com/2016/03/people-don-t-change-the-default-16px-font-size-in-their-browser.html)

If the default font size doesn't suit you, change it with relative units — ideally percentages:

```css
html {
  font-size: 125%;
}
```

This sets the text a quarter larger than the default. In nearly all browsers that means `20px`. On the Kindle 3 it would be `33px`. It's important to realize that this is fine. If a browser sets a different font size, it does so for sensible reasons.

### Why not px? Because people enlarge text in their browsers {#why-not-px}

If we used `px` here, we'd be forbidding our dear users from changing the default font size in their browsers.

To be clear, we're not talking about "zooming," which is available via a keyboard shortcut or easily set in the browser interface, but about increasing the font size for all websites. That feature still exists in browsers and operating systems. And yes, people use it. We probably will too one day. It's used by people with weaker eyesight, or simply with lower-quality displays.

Evan Minto, a developer at Archive.org, measured this and found that 3% of users had changed the font size in their browser. As he aptly noted, that's more than the share of visitors using Internet Explorer, Edge, or Opera Mini at the time.

Because we want to build solutions with the widest possible reach, we shouldn't ignore this. He writes about it in "Pixels vs. Ems: Users DO Change Font Size": [medium.com](https://medium.com/@vamptvo/pixels-vs-ems-users-do-change-font-size-5cfb20831773)

## Dimensions derived from the document's font size: rem {#rem}

I set the font size of individual parts of the document, the outer and inner spacing, and other properties across the document and components, in `rem`.

`1rem` (1 root `em`) holds the default font size set by the author for the document — possibly further adjusted by the user or the browser, as we've already seen.

If we don't change it on the document, `1rem` = `16px`.

```css
p { margin-bottom: 1rem; }
h1 { font-size: 2rem; }
```

With this code I set the paragraphs' bottom margin to the height of the text. First-level headings will be twice as large as the standard font size.

Using `rem` is also handy from a developer's point of view:

- `1rem` holds the base font size, so you don't have to remember whether it's 12, 14, 16, or however many pixels.
- A layout width set in `rem` will keep an optimal line length even when the user enlarges the text.
- Thanks to `rem` you can also scale the whole document up within specific ranges between design breakpoints.

### What if I get assets in px? {#assets-in-px}

You may be used to working in `px` when turning a design into code, because designers deliver assets in those units. But as I've written, setting anything derived from the main font size in `px` complicates life for many users.

How to get out of the design-versus-accessibility conflict? Automatic CSS processing can help.

You may know the PostCSS library, which enables automated processing of styles. The PostCSS plugin "postcss-pxtorem" handles converting `px` to `rem` for selected properties. It simply turns `font-size:16px` into `font-size:1rem`: [github.com](https://github.com/cuth/postcss-pxtorem)

So I consider `rem` the main unit for building interfaces. But `em` is very useful too.

## Dimensions derived from the parent's font size: em {#em}

The `em` unit holds the font size of the element, not the document.

```css
html {
  font-size: 100%; /* = 16px */
}

p {
  padding: 1em; /* = 16px */
}

.button {
  font-size: 75%;
  padding: 1em; /* = 12px */
}
```

You can see that `1em` means different things in different places in the document. Sometimes that's a good thing: for example, when you're coding a component whose size should be determined precisely by the font size on the parent element.

Of course, developers find "ems" a bit harder to work with than "rems." Not everyone wants to become a walking calculator for converting between `em` and pixels.

### Just note that em is not the typographic em quad {#em-is-not-em-quad}

The "em quad" is a typographic unit measured from the width of the capital "M." `em` is sometimes inaccurately called the em quad. But then it would be a different size for different typefaces.

And it isn't. The W3C defined `em` differently. Its size at the root of the document is the same in all browsers and with any typeface — `16px`. Unless, that is, it's changed by the treacherous trio of user, browser, or page author.

## Media Queries: em {#media-queries}

Why not use `px`? I'd recommend avoiding pixels because of the inability of Media Queries to respond to font-size enlargement.

```css
@media screen and (min-width: 30em) { }
```

In "PX, EM, or REM? Examining Media Query Units in 2021," Iris Winter writes that because of an imperfect implementation in Safari it's still better not to use pixels, and to prefer `em` or possibly `rem`. Both units refer, in Media Queries, to the document's font size, so they're freely interchangeable: [betterprogramming.pub](https://betterprogramming.pub/px-em-or-rem-examining-media-query-units-in-2021-e00cf37b91a9)

In coding practice, though, you can use automatic conversion from `px`, because CSS pixels are easier to work with here. A handy PostCSS plugin called "postcss-em-media-query" will help: [github.com](https://github.com/niksy/postcss-em-media-query)

## Line height: a unitless number {#line-height}

A unitless value is specific to line height, but it makes perfect sense:

```css
h1 {
  line-height: 1.5;
}
```

In the CodePen example (see below) the line height is simply one and a half times the font size of the first-level heading. And then it doesn't matter at all how anyone sets their font size.

Why is this better than setting it "hard" in `rem`, `em`, or `px`? If the font size changes in some context — by the author or the user — you then don't have to change the line-height setting too.

## Layout: percentages, but other units too {#layout}

Percentages work well for layout. For example:

```css
.layout-col {
  width: 50%;
}
```

A reminder: they're always calculated from the width of the nearest parent element.

But there are more usable units for layout:

- Percentages or `vw` stretch with the window's width, `vh` with its height.
- `rem` and `em` go by the font size.
- In flexbox you can also use absolute units (`flex:1`).
- In CSS grid there are the so-called fractional `fr` units (`grid-template-columns:3fr 1fr`).
- Sometimes fixed dimensions in `px` come in handy too.

## Borders, decoration: px {#decoration}

I recommend using `px` only where you need a precise expression in pixels. For example, for borders between navigation items:

```css
.nav-item {
  border-left: 1px solid white;
}
```

Just to be safe, a reminder that this is no longer a hardware pixel, but the reference — or so-called "CSS pixel." I write about it on Vzhůru dolů: [vzhurudolu.cz/prirucka/css-pixel](https://www.vzhurudolu.cz/prirucka/css-pixel)

## Typography based on window size: vw {#viewport-typography}

You may also need to grow and shrink the font size according to the window's width or height. In that case, remember the `vw` (viewport width) or `vh` (viewport height) units.

For example, this heading from the example will have a font size of `2rem` plus, always, two percent of the window's width:

```css
.heading {
  font-size: calc(2rem + 2vw);
}
```

Finally, I'm adding a link to a CodePen that uses what I consider an optimal unit setup on a simple example.

CodePen: [codepen.io/machal](https://codepen.io/machal/pen/dvdxWG)

## What if I still want to use mainly px? {#px}

In web design there's always a whole range of possible solutions. Some are optimal for users but demanding to implement; others are a compromise. Units are no different. I don't think a lot of kittens will die if you favor "CSS pixels." Using `px` is significantly more convenient to implement for a large share of design types.

Still, make sure the text in the design is large enough for most users to read. As a baseline, at least those `16px` are generally recommended. You should also ask yourself whether you're bothered by anything on the following list:

- Users who changed their font size in the system or browser (about 3% on Archive.org) won't see their setting reflected on your site. They're left with the option of zooming the whole page.
- A change in font size won't be correctly reflected in Media Queries.
- The design doesn't account for fluid typography that grows with the viewport.
- The designer likewise didn't account for a flexible change in a component's size based on the parent's font size, nor for a global change in font size at certain design breakpoints.
