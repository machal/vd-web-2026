---
title: "BEM: A naming convention for CSS classes"
description: "Block, Element, Modifier — a simple, widely adopted way to name CSS classes so component styles stay readable and easy to maintain."
date: 2017-06-05
published: true
pairId: bem
author: Martin Michálek
adaptedFrom:
  title: "BEM: Pojmenovávací konvence pro třídy v CSS"
  url: "https://www.vzhurudolu.cz/prirucka/bem"
tags:
  - css
  - bem
  - css-architecture
---

# BEM: A naming convention for CSS classes

BEM is a way to name CSS classes so that their different types never get confused with one another.

There are two ways to look at BEM:

1. A full-blown methodology for organizing CSS. See the complete documentation at [bem.info](https://en.bem.info/methodology/). It was invented and is used at Russian search company Yandex.
2. A naming convention for classes. See [getbem.com](http://getbem.com/). This is the trimmed-down version that other authors extracted from the original methodology, and it is the one I will cover here.

I do not use BEM as a full methodology — I usually reach for my own ways of organizing CSS instead. That is a fairly common scenario, I think. You might also want to combine BEM with another system: SMACSS, ITCSS, or others.

For me the biggest value of BEM lies in the naming convention. At first glance this might look like a very short topic, but there is still plenty to say. You will see in a moment.

## BEM as Block, Element, Modifier {#block-element-modifier}

First the quick overview, with links to more detailed explanations below.

<div class="rwd-scrollable f-6" markdown="1">

| Class type | Naming pattern |
|-----------|----------------------|
| [Block](#block) | `.block` |
| [Element](#element) | `.block__element` |
| [Modifier](#modifier) | `.block--modifier` |
| [Element modifier](#element-modifier) | `.block__element--modifier` |

</div>

## Why use BEM and where does it fit? {#why-bem}

I consider BEM an extension of [object-oriented CSS (OOCSS)](https://www.vzhurudolu.cz/prirucka/oocss) for medium-sized and large projects. To adopt BEM you therefore need to be able to write styles componentwise, keep the specificity of your [CSS selectors](../guide/css-selectors.md) low, and so on.

### Unambiguous meaning of classes in CSS and HTML {#unambiguous-meaning}

If your project has, say, more than twenty components and you write CSS in an object-oriented way, there is a high chance the meaning of your classes will start to blur:

```html
<nav class="nav nav-secondary nav-visible">
```

Reading this code, you might wonder whether `nav-secondary` and `nav-visible` modify the original component or are standalone objects. Is `nav-secondary` independent? What about `nav-visible`? Should you look in `nav.css` or in `nav-secondary.css`?

With BEM everything is clear:

```html
<nav class="nav nav--secondary nav--visible">
```

`nav` is a block — in other words, a standalone component. `nav--secondary` and `nav--visible` are its modifiers. We will most likely find them all in `nav.css`, or in a file with an extension matching whichever [preprocessor](https://www.vzhurudolu.cz/blog/12-css-preprocesory-1) you use.

A component marked up with BEM therefore carries more information than one marked up with plain OOCSS — both in CSS and in HTML. The code is easier to understand, you need less documentation and fewer comments, and it is easier to move around within a project or across projects.

### It is simple and widely adopted {#simple-and-widespread}

The BEM principle is not complicated, and it is easy to explain to colleagues who do not work with CSS much. They certainly do look at HTML, though, and thanks to BEM they get more information about a component's structure there — even without documentation.

On top of that, BEM is nothing new and is well established among front-end developers. So if you stick to what is described here, new colleagues will have no trouble finding their way around the project.

### Is it "ugly"? {#is-it-ugly}

That is a common objection, especially from programmers. Aesthetics are subjective, so it is hard to base the decision to use a methodology on them.

Yes, it can look ugly. But either BEM solves a problem for you or it does not. If it does, use it. I *definitely* recommend it. The exception is tiny projects, or [generating CSS with JavaScript](https://www.vzhurudolu.cz/podcast/css-v-js) in apps that fully depend on JS.

And now let's dive deeper into BEM.

## BEM in detail {#bem-in-detail}

### Block {#block}

A block is essentially a UI component — an independent, reusable element of the user interface. Blocks can be nested inside one another freely.

It is denoted by a class whose words are separated by a hyphen: `.block-name`.

### Element {#element}

A part inside a block that we need to style. An element cannot be used on its own in the interface; its existence only makes sense within a block.

You recognize it by a class prefixed with the block name and completed with the element name, separated by two underscores: `.block-name__element-name`.

### Modifier {#modifier}

A variant of a component. It describes visual properties (`.block--small`), state (`.block--disabled`), or behavior (`.block--animated-to-left`). It should not carry a name tied to appearance (`.block--green`).

In code it is a class prefixed with the block name and completed with the modifier name, separated by two hyphens: `.block-name--modifier-name`.

You may have come across modifiers written with a single underscore (`.block_modifier`). That is the "classic" BEM syntax. It [appears](http://stackoverflow.com/a/25213997/889682) to have been Harry Roberts who reshaped it into the double-hyphen form — or at least popularized that variant.

The "classic" notation lets you split modifiers into two types — "boolean" and "key-value". Honestly, I cannot remember when I ever needed that. So for its simplicity and clarity I, too, prefer the "Roberts" variant.

### Element modifier {#element-modifier}

A variant of an element is also possible. You may need it especially in more complex components. As an example, take the active item in a tabbed navigation: `.tabs-nav__tab-item--active`.

The same naming rules apply as for modifiers. In code it is a class prefixed with the block name and completed with the element name, separated by two hyphens: `.block-name__element-name--modifier-name`.

### Names are separated by a hyphen {#hyphen-separated-names}

As you can see from the examples above, the words in block, element, and modifier names are separated by a single hyphen. For example `.block-name--modifier-name`.

## BEM and CSS organization systems {#bem-and-css-systems}

As I wrote, BEM builds on [OOCSS](https://www.vzhurudolu.cz/prirucka/oocss). It is also nice that it complements broader CSS organization systems such as SMACSS or ITCSS.

Let's sort out those methodologies:

- *OOCSS* is a methodology for writing the component part of your styles. It is a necessary foundation for a sensible way of writing the component part of the code on every project.
- *BEM* is a methodology for naming the component part of your styles. It is only unnecessary on tiny projects.
- *ITCSS* or *SMACSS* are methodologies for organizing the whole of your CSS, including the non-component parts: the typographic baseline, helpers, and so on. How suitable these high-level organization methodologies are differs from project to project, and sometimes you have to come up with your own.

BEM does not conflict with any of these methodologies. It usually just adds a way of naming classes on top of them.

## A navigation example {#navigation-example}

Take this HTML:

```html
<ul class="nav nav--secondary" role="navigation">
  <li class="nav__item">
    <a href="/">Home</a>
  </li>
  <li class="nav__item nav__item--active">
    <a href="/">Products</a>
  </li>  
  <!-- … -->
</ul>
```

Then:

- `.nav` is a block (the component name)
- `.nav--secondary` is a modifier (a variant of the component)
- `.nav__item` is an element (a DOM element inside the component)
- `.nav__item--active` is an element modifier (a variant of the element)

I include the `role` attribute here for good measure, so we don't forget about [accessibility](https://www.vzhurudolu.cz/prirucka/html5-struktura).

## Selector specificity in BEM {#specificity}

Because BEM stems from OOCSS, the goal is to keep selector specificity (weight) as low as possible. We then write the CSS like this:

```css
.nav { 
  /* Rules common to all navigations */ 
}

.nav--secondary { 
  /* Changing rules for this modification */ 
}

.nav__item {
  /* Rules for this element */ 
}

.nav__item--active {
  /* Changing rules for this element modification */ 
}
```

This has two benefits: selectors keep a low specificity, and we don't repeat CSS code.

### Keeping selector weight low {#low-weight}

Selectors like `.nav.nav--secondary` then become pointless, thanks to prefixing the modifier.

### Not repeating code needlessly {#no-repetition}

A common problem with non-object-oriented CSS is repeating declarations from `.nav` in modifiers like `.nav--secondary`.

True, we could then allow ourselves simpler HTML such as `<nav class="nav--secondary">`, but the CSS would be complex and horribly hard to maintain. Simpler HTML is no advantage either, because we can no longer see from it what is a component and what is its modifier.

You can find more about specificity in [the OOCSS article](https://www.vzhurudolu.cz/prirucka/oocss).

## An element within a modifier {#element-in-modifier}

The only exception where a two-class selector is acceptable is an element inside a modified block:

```css
.nav--secondary .nav__item {
  /* Changing rules for the navigation item
     in the secondary navigation */
}
```

An element is always dependent on its parent block, and it would make no sense to make it standalone. At the same time, it would be quite annoying to create modifiers for all the elements inside a modified block (`.nav__item--secondary`).

For practical reasons it is therefore the only thing in the BEM naming system allowed to have double the selector specificity.

## What not to do {#what-not-to-do}

Let me point out a few more pitfalls.

### BEM and the trap of nesting in preprocessors {#preprocessor-nesting}

Some people make writing BEM syntax easier [in CSS preprocessors](https://www.vzhurudolu.cz/blog/12-css-preprocesory-1) by nesting:

```less
/* Better not do this: */
.nav {
  &__item { }
  &--secondary { }
}
```

Just please don't overdo it. Nesting in preprocessors is a good servant but a bad master. It is not problematic in itself, but in the code of less experienced CSS authors it leads [to monolithic blocks and bracket hell](https://www.vzhurudolu.cz/blog/65-css-kod-problemy).

Another problem can arise when searching in editors. You might find yourself searching for `.nav__item` — and in code with the "ampersand" syntax that simply won't work.

### Multiple block nesting {#multiple-nesting}

In the DOM structure you can nest freely. The hierarchy of CSS selectors, however, should always stay single-level. So `.block__element__heading` is wrong. It should be `.block__element-heading`.

This is so that the CSS selector does not depend on the DOM structure and you don't have to change it with every HTML tweak. [Don't mirror the DOM structure in your CSS](https://www.vzhurudolu.cz/blog/63-bem-chyby).

### Crossing components {#crossing-components}

I often see constructs like this in CSS:

```css
.button {
  /* Code for the Button component */
}

.card .button {
  /* Changes to the Button component when it appears inside Card */
}
```

Sometimes there is no way around it, but in principle crossing components is wrong. It then becomes hard to say whether the code belongs to the `card` component or to `button`. It is better to create a modifier like `button--small`. [Leave crossbreeding to the gardeners](https://www.vzhurudolu.cz/blog/63-bem-chyby) — don't try it with components.

We are almost at the end. The last part of the text is devoted to using BEM in inhospitable conditions.

## Using BEM in a non-BEM environment {#bem-in-non-bem}

What if your project uses something like Bootstrap, which is written in an object-oriented way but without BEM naming?

If Bootstrap or another library dominates the codebase, I would drop BEM for the sake of consistency. Bootstrap also has [its own coding standards](http://codeguide.co/), so I recommend staying within their guard rails. Code Guide is not very strict, but it is a perfectly adequate guideline for most situations.

If, however, you were using Bootstrap or another library only as an add-on to your own robust code base, I would consider either prefixing the library selectors or your own parts of the code. In the early days of one of my projects, for example, we used the `vc-` prefix to distinguish our components from the Bootstrap ones.

You have reached the end. There would be more to say about BEM, but I will save that for another time.
