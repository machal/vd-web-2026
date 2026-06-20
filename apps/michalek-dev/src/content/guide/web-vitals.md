---
title: "Web Vitals: Google's core metrics for real-world speed"
description: "An introduction to Core Web Vitals — LCP, INP, CLS — how Google uses them, and where to measure them on your site."
date: 2020-06-02
published: true
pairId: web-vitals
author: Martin Michálek
adaptedFrom:
  title: "Web Vitals: Co jsou zač ty nové metriky rychlosti webu od Googlu?"
  url: "https://www.vzhurudolu.cz/prirucka/web-vitals"
tags:
  - performance
  - web-vitals
  - seo
---

# Web Vitals: Google's core metrics for real-world speed

Web Vitals is Google's label for metrics that describe real user experience on the web.

Measuring performance (and UX) used to be a specialist discipline. For everyone else the landscape was noisy. Google narrowed the focus to a small set of metrics — with tooling and a promise they would not change every month.

Today we mainly track **LCP**, **INP** (replacing FID), and **CLS**. Google folds them into [page experience signals](https://developers.google.com/search/docs/appearance/core-web-vitals). If you need the business case first, [PageSpeed.ONE explains why speed matters](https://pagespeed.one/znalosti/proc-resit-rychlost).

This guide is a quick tour of the metrics and how to read them.

## The metrics {#metriky}

Web Vitals includes more than three numbers, but Google highlights **Core Web Vitals (CWV)** as the baseline every site owner should know.

### Core Web Vitals {#core}

The headline trio — [Core Web Vitals](https://pagespeed.one/metriky/cwv):

* **Largest Contentful Paint (LCP)** — how fast main content appears; a loading metric between [First Contentful Paint](https://web.dev/fcp/) and [Speed Index](https://web.dev/speed-index/).
* **Interaction to Next Paint (INP)** — responsiveness after user input; [INP replaced FID](https://web.dev/inp-cwv/) as a Core Web Vital in March 2024.
* **Cumulative Layout Shift (CLS)** — visual stability while the page renders.

Google buckets each metric into three states:

* **Good**
* **Needs improvement**
* **Poor**

Thresholds from [Google's documentation](https://web.dev/defining-core-web-vitals-thresholds/):

<div class="rwd-scrollable f-6" markdown="1">

| Metric | Good | Needs improvement | Poor |
|:-------|-----:|------------------:|-----:|
| LCP | ≤ 2.5 s | 2.5 – 4 s | > 4 s |
| INP | ≤ 200 ms | 200 – 500 ms | > 500 ms |
| CLS | ≤ 0.1 | 0.1 – 0.25 | > 0.25 |

</div>

For a single score per URL, Google recommends the **75th percentile** across mobile and desktop field data. The worst metric wins — that is how [PageSpeed Insights](https://pagespeed.web.dev/) reports pass/fail today.

<figure>
<img src="/prirucka/images/web-vitals.jpg" alt="Diagram of Core Web Vitals metrics LCP, INP, and CLS">
<figcaption markdown="1">
*Core Web Vitals at a glance. Source: [web.dev](https://web.dev/vitals/).*
</figcaption>
</figure>

Optimization guides on web.dev:

* [Optimize LCP](https://web.dev/optimize-lcp/) — also [LCP on PageSpeed.ONE](https://pagespeed.one/metriky/lcp)
* [Optimize INP](https://web.dev/optimize-inp/) — also [INP on PageSpeed.ONE](https://pagespeed.one/metriky/inp)
* [Optimize CLS](https://web.dev/optimize-cls/) — also [CLS on PageSpeed.ONE](https://pagespeed.one/metriky/cls)

### What about the other metrics? {#dalsi-metriky}

Specialists still care about [TTFB](https://web.dev/ttfb/), FCP, TBT, and the rest. LCP alone will not reveal a slow backend or a late hero image without measuring upstream.

## How to measure Web Vitals {#mereni}

Google updated its tooling quickly when Vitals landed.

<figure>
<img src="/prirucka/images/web-vitals-psi.jpg" width="1920" height="540" alt="Core Web Vitals section in PageSpeed Insights">
<figcaption markdown="1">
*Web Vitals in PageSpeed Insights. Lab data may still list FCP even though it is not part of CWV.*
</figcaption>
</figure>

Practical entry points:

* [**PageSpeed Insights**](https://pagespeed.web.dev/) — field data in the CrUX section; try it on your URL now.
* [**Search Console**](https://search.google.com/search-console) — Core Web Vitals report by URL group.
* [**Chrome UX Report**](https://developer.chrome.com/docs/crux) — raw field data; [CrUX Dashboard](http://g.co/chromeuxdash) in Looker Studio.
* **WebPageTest** — highlights Vitals in results ([example run](https://www.webpagetest.org/)).
* [**Web Vitals extension**](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma) — live values in Chrome.
* [**web-vitals JS library**](https://github.com/GoogleChrome/web-vitals) — send metrics to analytics.

INP and FID require **real-user (RUM)** data. Synthetic tools such as Lighthouse or WebPageTest approximate interactivity with **Total Blocking Time (TBT)** instead.

Google says Core Web Vitals should change at most once a year — but they also admit the set is not final. This article will keep evolving.

---
