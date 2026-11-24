---
title: "Knowing how to make the web fast is not enough. My performance.now() 2026 report"
description: "In Amsterdam I spoke about the least technical part of web performance: getting a company to care in the first place. Plus three talks I keep thinking about and a note on why this community behaves unlike any other conference crowd."
date: 2026-11-24
published: true
pairId: performance-now-2026
author: Martin Michálek
adaptedFrom:
  title: "Pro rychlejší web nestačí jen umět zrychlovat. Můj report z konference performance.now() 2026"
  url: "https://www.vzhurudolu.cz/blog/269-performance-now-2026"
tags:
  - performance
  - soft-skills
ogImage: /assets/img/content/dest/performance-now-2026-og.webp
---

# Knowing how to make the web fast is not enough. My report from performance.now() 2026

Last week I flew to Amsterdam for [performance.now()](https://www.perfnow.nl/), where I had been invited to share what we have learned about making websites faster at [PageSpeed.ONE](https://pagespeed.one/).

An honour and a pleasure. Also: right before I walked on stage I was shaking like a chihuahua. This is the best conference in our field anywhere in the world, and I knew exactly who was sitting in that room.

A few hours later I felt at home — as if I were at a slightly oversized Prague meetup where everyone somehow knows everyone. The web performance community is small and genuinely warm. The trip also confirmed something I had only half believed: what we do as a company sits right at the top of this field, technically and as a business. I came back happy in every possible direction.

## My talk: why is fast so hard to sell? {#talk}

I talked about the least technical part of our work — convincing companies to care about speed at all. It is hard. It is also the foundation, because without it there is nothing for us to optimise.

Making a site faster is rarely the problem. Getting the people who decide onto your side is. And a pile of numbers often loses to one simple move: open the slow site on a real phone and hand it to them.

<figure>
<img src="/assets/img/content/dest/performance-now-2026-talk.webp" alt="Collage: the Why Is Fast So Hard to Sell talk at performance.now(), Martin on stage, and a selfie after the event">
<figcaption markdown="1">
*Why Is Fast So Hard to Sell? at performance.now() — and the evening afterwards with Michal.*
</figcaption>
</figure>

[Speed monitoring](https://pagespeed.one/znalosti/monitoring) helps you spot problems before your customers do. Just as importantly, it gives the team a reason to talk about speed regularly instead of once a year.

Case studies work too, but mind the weak evidence. A correlation between speed and conversions is not proof of cause, and pretending otherwise costs you the trust of the one person in the room who knows statistics. I showed our [deNatura study](https://pagespeed.one/denatura) as an example of doing it more carefully.

And I talked about selling itself. Selling is not pushing your offer across the table. It is looking for needs, for fears, and for whatever is quietly blocking the collaboration.

The talk materials are on the [PageSpeed.ONE site](https://pagespeed.one/en/perfnow), [slides](https://docs.google.com/presentation/d/1SHA0xy27RFABVPZzyLpd6LoZRmbGV6E_nvQ5vT8jc1k/edit) included. A proper write-up will follow.

<figure>
<img src="/assets/img/content/dest/performance-now-2026-funnel.webp" alt="An eight-step funnel: from speed awareness to long-term collaboration">
<figcaption markdown="1">
*The funnel we use to move clients from "our site is slow" to long-term work on speed. Source: [talk materials](https://pagespeed.one/en/perfnow).*
</figcaption>
</figure>

What drew the most interest was one plain fact: we do nothing but website speed, and we served around 90 clients over the past year. That single sentence started more hallway conversations than anything on my slides.

## Three talks I keep thinking about {#three-talks}

From where I was sitting, these three were the strongest.

**[Harry Roberts](https://speakerdeck.com/csswizardry/well-thats-weird)** on how he hunts down the cause behind a change in the data — and how readily one number lies to you. In one case a site looked slower until the client mentioned an aggressive campaign in French-speaking countries: the audience had changed, not the page. In another, the 75th percentile barely moved while a [CDF chart](https://fzakaria.com/2026/07/27/the-mean-means-nothing) showed the 90th percentile a full 1.5 s faster. Harry's advice: never judge success on a single percentile, and when you compare before and after, use multiples of seven days — then throw away the release day.

**[Tammy Everts](https://speakerdeck.com/tammyeverts/performance-is-a-journey-perfnow-2026)** named the two paradoxes that keep web performance running in place. **Jevons paradox:** make performance cheaper and we spend the savings on more features and more complexity. **Wirth's law:** software grows heavier faster than hardware grows quicker, so users never feel the win. Her other point deserves a poster in every office: green [Core Web Vitals](../guide/web-vitals.md) do not mean your site is fast. Google's thresholds are a floor you step over, not a target you aim at.

**[Annie Sullivan](https://docs.google.com/presentation/d/1lU6jNl1M4rO2ZK-jSH0Obt7knzNvoZQTKqUNWJ66D-k/edit)** measured more than 90,000 live "vibe-coded" sites. In Android CrUX, **18.8%** of them had all Core Web Vitals in the good range. Among ordinary sites of comparable popularity it was **52.1%**. A site that works after a few minutes of prompting is not the same thing as a site that is fast.

<figure>
<img src="/assets/img/content/dest/performance-now-2026-talks.webp" alt="Collage of three performance.now() talks: Tammy Everts, Harry Roberts, and the Performance is cultural talk">
<figcaption markdown="1">
*From the programme: Tammy Everts, Harry Roberts, and other strong moments on stage.*
</figcaption>
</figure>

## What else stuck with me {#more}

- **[Risko Ruus](https://nullp2ike.github.io/perf-now-slides/)** showed performance through the eyes of a tester. Even Lighthouse earns its keep when it helps a team catch a regression before the release does.
- **Tim Vereecke** has been tuning his own site for years. His goal? Good Core Web Vitals for 99% of users. Pure geekery — and very funny with it.
- **Stéphanie Walter** thinks about speed from a designer's seat. What is the user actually looking at while they wait? And what happens when something fails? She has [practical materials](https://shop.stephaniewalter.design/b/tools-to-design-performance) for exactly that.
- **[Max Inden](https://mxinden-bot.github.io/slides/15-perfnow/)** gave the clearest explanation of network round trips I have heard. On the same topic, I recommend the [Save a Round Trip](https://savearoundtrip.com/?d=cloudflare.com) tool.

If the numbers start blurring together, PageSpeed.ONE has a [metrics glossary](https://pagespeed.one/metriky) and a [walkthrough of how to measure speed properly](https://pagespeed.one/znalosti/mereni-rychlosti).

<figure>
<img src="/assets/img/content/dest/performance-now-2026-hall.webp" alt="The performance.now() hall with the audience and a slide about CrUX and HTTP Archive">
<figcaption markdown="1">
*The performance.now() hall in Amsterdam — the audience, the stage, and a chandelier in a historic room.*
</figcaption>
</figure>

## The vibe: I love #perfnow and #amsterdam {#atmosphere}

This is the part that is hardest to pass on to anyone who was not there, and it is the part that matters most. The community here is strong and friendly in a way I rarely see. Nobody was handing out business cards. People were handing over experience and half-finished technical ideas.

And on top of all that: Amsterdam.

I'll be back!

<figure>
<img src="/assets/img/content/dest/performance-now-2026-amsterdam.webp" alt="Amsterdam collage: the view from the plane, an autumn canal, and the harbour with a boat">
<figcaption markdown="1">
*Amsterdam around the conference — the arrival, the canals, and the harbour.*
</figcaption>
</figure>

<small>*Were you at performance.now(), or are you fighting the same battle over arguing for speed? Email me at [martin@pagespeed.cz](mailto:martin@pagespeed.cz).*</small>
