---
title: "CSS selectors: a complete guide to selectors and combinators"
description: "A practical reference to CSS selectors and combinators — elements, classes, IDs, attribute selectors, and how to combine them."
published: true
pairId: css-selectors
author: Martin Michálek
adaptedFrom:
  title: "CSS selektory"
  url: "https://www.vzhurudolu.cz/prirucka/css-selektory"
tags:
  - css
  - selectors
  - html
---

# CSS selectors

This guide fills a gap in my coverage of [CSS](https://www.vzhurudolu.cz/css) fundamentals.

While researching it, I noticed that surprisingly few resources cover selectors this comprehensively in one place. So here is one.

I'm aiming primarily at beginners, but I think refreshing this topic won't hurt more advanced readers either. Let's start with a table summarizing the most important things you'll find in this article.

## The most important selectors {#key-selectors}

Selectors pick a particular group of elements in the DOM and let you style them.

<div class="rwd-scrollable f-6" markdown="1">

| Selector                  | Syntax     |
|:--------------------------|:-----------|
| [Class](#class)           | `.class`   |
| [Element](#type)          | `tag`      |
| [Identifier](#id)         | `#id`      |
| [Attribute](#attributes)  | `[attr]`   |
| [Everything](#universal)  | `*`        |

</div>

## The most important combinators {#key-combinators}

Combinators join simple selectors into more complex groups and let styling apply only under certain conditions.

<div class="rwd-scrollable f-6" markdown="1">

| Combinator                              | Syntax                 |
|:----------------------------------------|:-----------------------|
| [Descendant](#descendant)               | `A B`                  |
| [Child](#child)                         | <code>A &gt; B</code>  |
| [Next sibling](#next-sibling)           | `A + B`                |
| [Subsequent sibling](#subsequent-sibling) | `A ~ B`              |

</div>

I'm deliberately leaving out [pseudo-classes](https://www.vzhurudolu.cz/prirucka/css-pseudotridy), which undoubtedly belong among CSS selectors. But I want to keep this within the scope of an article, not a book.

## Element selectors {#elements}

These selectors pick elements from the DOM by HTML tag name.

### Type selector – `tag` {#type}

This contains the name of an HTML element and represents an instance of that element type in the document tree.

Examples:

- `h1` — represents all `<h1>` elements in the document.
- `li span` — selects all `<span>` elements nested inside an `<li>` element.

### Universal selector – `*` {#universal}

A special variant of the type selector that represents an element of any type.

Examples:

- `*` — represents all elements in the document.
- `body * .box` — represents an element with the `.box` class that is nested at the second level inside a `<body>` element.

## Attribute selectors {#attributes}

Selectors that pick elements by attributes — their presence, a match against their entire value, or a match against part of the value.

### Class selector – `.className` {#class}

One of the best-known and probably the single most useful selector, which picks elements by class.

It represents elements belonging to the class identified by the `class` attribute in HTML.

Example:

```html
<div class="box">
  <p class="a"><span class="a">…</span></p>
  <p class="b"><span class="a">…</span></p>
  <p class="c"><span class="a">…</span></p>
</div>
```

The `.a` selector picks both `<p class="a">` and all the `<span class="a">` elements.

More examples:

- `.heading` — all elements that have the `class` attribute set to `heading`.
- `h1.heading` — all `<h1>` elements that have the `heading` class.
- `h1.heading.heading-large` — all `<h1>` elements that have both the `heading` class and `heading-large`.

You may have noticed that the syntax `.heading` is equivalent to the tilde attribute selector (i.e. `[class~=heading]`).

Class selectors are the foundation of almost all web styling today — think of methodologies like OOCSS, [BEM](../guide/bem.md), but also newer [utility CSS](https://www.vzhurudolu.cz/prirucka/css-utility).

### ID selector – `#id` {#id}

The ID selector represents an instance of an element whose identifier matches the value of the `id` attribute.

Example:

```html
<div class="box">
  <p class="a"><span class="a" id="first">…</span></p>
  <p class="b"><span class="a">…</span></p>
  <p class="c"><span class="a">…</span></p>
</div>
```

The `.a#first` selector picks only `<span class="a" id="first">`.

In HTML documents it's possible for multiple elements to match a single ID selector. That's fine from the CSS selector's point of view — but of course not from the standpoint of HTML semantics or accessibility.

### Attribute presence and value selectors – `[attr]` {#attr-value}

Here we test whether an attribute exists on an HTML element, or detect its value.

These are the selectors that look for the presence of an attribute or a specific value on an HTML element.

Types of attribute selectors:

<div class="rwd-scrollable f-6" markdown="1">

| Selector          | Explanation         |
|:------------------|:--------------------|
| `h1[title]`       | An `<h1>` element that has a `title` attribute with _any_ value. |
| `h1[title=Hello]`  | Exact-match attribute selector. An `<h1>` element whose `title` attribute is _exactly_ `Hello`. |
| `h1[title~=Hello]` | Tilde attribute selector matching one value. An `<h1>` element whose `title` attribute _contains_ the string `Hello` in at least one value. Values are separated by spaces for the selector's purposes, so `<h1 title="Hello world">` satisfies it. |
| <code>h1[title\|=Hello]</code> | Prefix-match selector. This one is peculiar. The matched value must be either exactly `Hello`, or start with `Hello` immediately followed by a `-`. It really only makes sense for matching language codes. For example, <code>[hreflang\|="en"]</code> matches both `en` and `en-US`. |

</div>

### Substring attribute selectors – `[attr^=]` {#attr-substring}

Here we pick elements by matching part of an attribute's value. These are selectors for finding substrings within an attribute value.

Types of substring attribute selectors:

<div class="rwd-scrollable f-6" markdown="1">

| Selector          | Explanation         |
|:------------------|:--------------------|
| `h1[title^=Hello]` | The caret attribute selector represents an `<h1>` element with a `title` attribute whose value _begins with_ `Hello`. |
| `h1[title$=Hello]` | The dollar attribute selector represents an `<h1>` element with a `title` attribute whose value _ends with_ `Hello`. |
| `h1[title*=Hello]` | The asterisk attribute selector represents an `<h1>` element with a `title` attribute whose value _contains_ `Hello`. |

</div>

In all substring selectors, if the value were an empty string, the selector represents nothing. The element simply isn't selected.

### Case-insensitivity flag `[ i]` {#attr-case}

Thanks to this newer flag, we can turn off case sensitivity.

By default, selectors for HTML do distinguish between uppercase and lowercase.

The `i` identifier stands for "insensitive" — that is, not distinguishing uppercase and lowercase in the selector.

Examples:

- `h1[title=Hello]` — picks `<h1>` elements with a `title` attribute valued `Hello`, but not `hello`.
- `h1[title=Hello i]` — picks `<h1>` elements with a `title` attribute valued `Hello` and also `hello`.

By the way, even this relatively new flag is supported by all modern browsers. See [CanIUse.com](https://caniuse.com/css-case-insensitive).

Take a look at a demo from reader Lukáš Chylík.

CodePen: [cdpn.io/e/eYVWOEQ](https://codepen.io/luko248/pen/eYVWOEQ?editors=1100)

The `s` identifier before the closing bracket (`]`) stands for "sensitive" — case sensitivity. Currently only Firefox supports it, but `s]` isn't really needed in HTML, because it just replicates the browsers' default behavior.

## Combinators {#combinators}

Combinators are special characters that let you combine simple selectors into more complex ones and extend a selector's reach only when certain conditions are met — such as an element being nested inside a particular parent in the DOM.

### Descendant combinator – `A B` {#descendant}

The whitespace combinator separates two selectors (`A B`) and selects a descendant (`B`) that is nested inside a particular element `A`.

A selector in the form `A B` represents an element `B` that is any descendant of some ancestor element `A`.

Example:

```html
<div class="box">
  <p class="a"><span class="a">…</span></p>
  <p class="b"><span class="a">…</span></p>
  <p class="c"><span class="a">…</span></p>
</div>      
```

The `.box .a` selector picks the `<p class="a">` element and also all the `<span class="a">` elements.

More examples:

- `.heading span` — all `<span>` elements that are descendants of elements with the `heading` class.
- `h1 em` — all `<em>` elements that are descendants of an `<h1>` element.
- `h1 * em` — all `<em>` elements that are descendants at the second level or deeper inside an `<h1>` element.

### Child combinator `A > B` {#child}

The greater-than combinator (`A > B`) selects element `B` that is a direct descendant of element `A`.

So while `A B` selects `B` at any level of nesting inside `A`, `A > B` selects only the `B` elements that are direct descendants of `A` — its "children."

Take an example:

```html
<div class="box">
  <p class="a"><span class="a">…</span></p>
  <p class="b"><span class="a">…</span></p>
  <p class="c"><span class="a">…</span></p>
</div>      
```

The `.box > .a` selector picks only the `<p class="a">` element.

More examples:

- `.heading > span` — all `<span>` elements that are direct descendants of elements with the `heading` class.
- `h1 > em` — all `<em>` elements that are direct descendants of an `<h1>` element.
- `.box ol > li p` — all `<p>` elements that are descendants of `<li>`, where `<li>` must be a direct descendant of `<ol>` and a descendant at any level of an element with the `.box` class.

Whitespace around the child combinator is optional. `h1 > em` and `h1>em` are identical. The spaced form is preferred for readability.

### Next-sibling combinator `A + B` {#next-sibling}

The plus combinator (`A + B`) selects element `B` that is an adjacent sibling of `A`.

The elements represented by both selectors share the same parent in the document tree, and the element represented by the first (`A`) immediately precedes the element represented by the second (`B`).

Here's an example:

```html
<div class="box">
  <p class="a"><span class="a">…</span></p>
  <p class="b"><span class="a">…</span></p>
  <p class="c"><span class="a">…</span></p>
</div>      
```

The `.a + p` selector picks only the `<p class="b">` element.

More examples:

- `h1 + p` — the `<p>` element that immediately follows each `<h1>`.
- `h1.heading + h2` — the `<h2>` element that immediately follows each `<h1>` with the `heading` class.

Spaces are again optional. `h1 + p` is the same as `h1+p`, but prefer the former.

### Subsequent-sibling combinator – `A ~ B` {#subsequent-sibling}

The tilde combinator (`A ~ B`) selects element `B` that is a sibling of `A` but does not immediately follow it.

Both elements share the same parent. The difference from `A + B` is that with the tilde combinator the elements need not be adjacent.

Back to the example:

```html
<div class="box">
  <p class="a"><span class="a">…</span></p>
  <p class="b"><span class="a">…</span></p>
  <p class="c"><span class="a">…</span></p>
</div>      
```

The `.a ~ p` selector picks the `<p class="b">` and `<p class="c">` elements.

More examples:

- `h1 ~ p` — all `<p>` elements that share the same parent as `<h1>`.
- `h1.heading ~ h2` — all `<h2>` elements that share the same parent as an `<h1>` with the `heading` class.

Spaces in the selector are again optional.

## Browser support {#support}

All the CSS selectors I mention here are fully supported in every browser, including MSIE. The only exception is the case-sensitivity flag (`[title=Hello s]`), which you won't get working in that old browser.

There is, however, one group of selectors — mentioned in the Selectors Level 4 specification — that has no support.

### Column selectors – `A || B` {#column}

`A || B` — the column combinator. It selects element `A` belonging to column `B`. See, for example, `col.selected || td` in tables.

It would be useful to have such a selector, but no browser supports it yet, just like the similarly focused `:nth-col()` and `:nth-last-col()` pseudo-classes.

- [CanIUse.com](https://caniuse.com/mdn-css_selectors_column)
- [Specification](https://www.w3.org/TR/selectors-4/#table-pseudos)

In the continuation of this text, I'll focus on [pseudo-classes in CSS](https://www.vzhurudolu.cz/prirucka/css-pseudotridy), which are really just slightly peculiar selectors.
