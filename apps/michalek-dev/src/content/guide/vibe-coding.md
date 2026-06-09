---
title: "Vibe coding: 25 years of building websites, last two months completely different"
description: "AI-assisted coding democratises building software — and sets traps for people who skip engineering thinking. Notes from the hype cycle."
date: 2026-02-10
published: true
pairId: vibe-coding
author: Martin Michálek
adaptedFrom:
  title: "Vibe Coding: Přes 25 let dělám weby, ale poslední dva měsíce úplně jinak"
  url: "https://www.vzhurudolu.cz/prirucka/vibe-coding"
tags:
  - ai
  - vibe-coding
  - development
---

# Vibe coding: 25 years of building websites, last two months completely different

Vibe coding is a revolution. It deflates the cost of writing code and opens digital product building to far more people.

It is also a trap — for anyone who thinks developers (or developer thinking) become optional. For some engineers it is opportunity; for others pain.

I thought Vzhůru dolů was nearly done. Vibe coding revived it — technically and editorially. If I publish one long piece this year, it is this one: motivation, caution, and practical notes in one collage.

Heads up: I am mid-explosion phase. Take the enthusiasm with salt.

## Riding the wave {#u-vytrzeni}

Twenty-plus years shipping web apps; twenty-seven around web tech. I have not seen anything like this.

> "I sat down with Windsurf and in three days had a new version that will do more in a week than my nine-month build. It's insane."
>
> – *<cite>[Petr Pixy Staníček](https://www.linkedin.com/feed/update/urn:li:activity:7421846795984683008)</cite>*

Democratisation cuts both ways:

> "I used Wix Vibe — election site with CMS in two hours. That used to be weeks of evening WordPress work."
>
> – *<cite>[Michal Berg](https://www.linkedin.com/feed/update/urn:li:activity:7421846795984683008)</cite>*

Technically skilled people keep an edge — if they use it. The window is wide open.

Sober counterpoint:

> "When you know exactly what you want and how to build it, AI saves masses of work. When you don't, results can be very bad."
>
> – *<cite>[Marek Prokop](https://www.linkedin.com/posts/marekprokop_m%C3%A1m-hodn%C4%9B-p%C5%99%C3%A1tel-kte%C5%99%C3%AD-te%C4%8F-uj%C3%AD%C5%BEd%C4%9Bj%C3%AD-na-vibe-activity-7366146403502329858-4m91)</cite>*

## "Vibe… what?" {#vajb-coze}

**Vibe coding** means describing intent in natural language and letting AI generate code. You steer; the model types.

The term comes from [Andrej Karpathy](https://x.com/karpathy/status/1886192184808149383):

> "…you fully give in to the vibes, embrace exponentials, and forget that the code even exists."

My main tool is [Cursor](https://cursor.com/) — VS Code plus project-aware AI. Alternatives: [Windsurf](https://windsurf.com/), [GitHub Copilot](https://github.com/features/copilot), Google's [Antigravity](https://antigravity.codes/), and more.

<figure>
<img src="/prirucka/images/vibe-coding-cursor.jpg" alt="Cursor editor in Agent mode">
<figcaption markdown="1">
*Agent mode shines when you still think like an engineer. The UI is familiar from [VS Code](https://code.visualstudio.com/).*
</figcaption>
</figure>

**Agent mode** runs terminal commands, edits multiple files, installs packages — you approve or redirect. Less syntax googling; more architecture and review. Like a fast junior who needs supervision.

## Vibe coding vs vibe engineering {#vibe-coding-vs-vibe-engineering}

Two levels:

* **Vibe coding** — describe, iterate, ship a prototype or landing page; code may be disposable.
* **Vibe engineering** — you own architecture, decomposition, specs; AI implements under your constraints.

Prokop's line matters: **learn to program — still, in the AI era.**

Complex work needs engineers who can call out AI nonsense.

## Where to start {#cim-zacit-novacek}

[Jindra Fáborský's levels](https://www.facebook.com/faborsky/posts/pfbid0tRgVkByRZY8qgVVyGy8asoD2ZA1h7uPcwqjv9czxYFwdYbw13RAQbL6ddsgXUvNwl) help:

* **0** — one-off utilities
* **1** — landing pages
* **2** — whole sites
* **3** — app prototypes
* **4** — internal tools
* **5** — production apps

Higher levels demand engineering discipline. Do not rewrite your revenue app on week one of Cursor.

## Four things I actually built {#ja-a-vajbeni-ctyri-priklady}

### FrontKon prototype {#priklad-prvni-frontkon}

One day for a [throwaway prototype](https://machal.github.io/frontkon-2026-prototype/cs/) showing conference direction — content nearly final. Old me: weeks, often discarded. First head explosion; learned vibe coding alone is not enough.

### Site for my son {#priklad-druhy-web-pro-syna}

Teen side hustle [Clipcut](https://clipcut.cz/). Two-sentence prompt; teen rejects design; Cursor suggests Gen Z styles; fifteen minutes later he is thrilled. I laughed hysterically. Small-site tinkerers face real competition from tools like [Macaly](https://www.macaly.com/).

<figure>
<img src="/prirucka/images/vibe-coding-clipcut.jpg" alt="Clipcut website screenshot">
<figcaption markdown="1">
*Fifteen minutes, Gen-Z palette chosen via AI suggestions.*
</figcaption>
</figure>

### PageSpeed.ONE docs {#priklad-treti-pagespeed}

Cursor edits [PageSpeed.ONE](https://pagespeed.one/) help texts in my voice, adds links, checks consistency. As Michal Matuška says: "We all have to be full-stack" — including content people.

<figure>
<img src="/prirucka/images/vibe-coding-vd-writing.jpg" alt="Writing and editing markdown with AI assistance">
<figcaption markdown="1">
*Vibe writing — context-aware iteration similar to code.*
</figcaption>
</figure>

### Migrating Vzhůru dolů to Astro {#priklad-ctvrty-migrace-vd}

Two years avoiding a legacy PHP/[Perch](https://grabaperch.com/) stack. Old world: sacrificed weekends or ~100k CZK contractor bill. First Cursor pass drowned in dual-stack context. Learning the new stack, writing good prompts, staying architect-not-audience — 2–3 days total, [live since January](https://www.vzhurudolu.cz/) on [Astro](https://astro.build/) and GitHub.

<figure>
<img src="/prirucka/images/vibe-coding-vd.jpg" alt="Vzhuru dolu site rebuilt on Astro">
<figcaption markdown="1">
*Migration finished in a long weekend, not a long quarter.*
</figcaption>
</figure>

## Developers unemployed? {#vyvojari-bez-prace}

Copy-paste coders should worry. Engineers who decompose problems, design systems, and push back on bad AI output? More valuable than ever.

Two motivations among developers:

* product builders — care about outcomes
* craft lovers — care about the code itself

AI favours the first group and pressures the second. You can ship great products with LLMs and barely hand-write syntax — hard for craft-first identities to accept.

You still need engineering judgment. Cursor once proposed SSR via headless Chrome for a static conference site — clever nonsense without experience.

## Cursor tips {#tipy-ke-cursoru}

Modes:

<div class="rwd-scrollable f-6" markdown="1">

| Mode | Writes code | Autonomy | Use for |
| :---- | :---- | :---- | :---- |
| **Agent** | Yes (multi-file) | High | New features, refactors |
| **Plan** | After plan | Medium | Complex integrations |
| **Debug** | Targeted fixes | High | Bugs, logs |
| **Ask** | No | None | Understanding code |

</div>

Context shortcuts: `@Codebase`, `@Files`, `@Docs`, `@Web`. In-browser element picking is killer.

Rules that stick:

1. **Decompose** — small iterations.
2. **Cursor rules** — [`.cursor/rules`](https://docs.cursor.com/context/rules) for stack conventions.
3. **Sniper vs shotgun** — inline `Ctrl+K` for tiny edits.

Models: default Composer for speed; Claude for stuck text tasks; Gemini for huge repos — your mileage varies.

## Flow still exists {#flow}

I feared losing craft joy. Deep work moved up-stack: direction, architecture, product shape. Less semicolon tuning; more "does this system make sense?" Flow remains — different problem shape.

## People still matter {#lidi-potrebujeme}

AI multiplies; it does not replace accountability. Meetings, kitchen conversations, security, [SaaS responsibility](../guide/ai-saas.md) — humans stay in the loop.

Vibe coding democratises building. Technical people have head start — if they use it.

---
