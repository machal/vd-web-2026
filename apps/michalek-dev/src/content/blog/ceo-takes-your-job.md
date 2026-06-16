---
title: "Developers, do you know why your CEO is taking your job — and why that can be good?"
description: "Product people, marketers, and company leaders are getting into your codebase more often. I think developers can benefit — and I'll show how on my own example."
date: 2026-06-15
published: true
pairId: ceo-takes-your-job
author: Martin Michálek
adaptedFrom:
  title: "Vývojáři, víte, proč vám váš CEO bere práci, a proč je to dobrá věc?"
  url: "https://www.vzhurudolu.cz/blog/264-ceo-bere-praci"
tags:
  - ai
  - soft-skills
  - vibe-coding
  - development
---

# Developers, your CEO is getting into your code — and that might be a good thing

More and more of us are crowding into your codebase. Marketers, product people, company leaders. Non-technical people, in other words. I know it gives you a headache sometimes. But you are not going to avoid it.

In this piece I want to outline what drives us and why we can actually be useful to you.

As you know, I take a sober view of the current AI revolution. I do not think it will [kill SaaS](../guide/ai-saas.md). I do not think developers are finished. I do not think the world is ending.

Some things are changing brutally fast, though — product development among them.

At a [Frontendisti.cz](https://www.frontendisti.cz) meetup (a Czech frontend community), I presented [why your CEO is getting into your code](https://www.youtube.com/watch?v=VgQL7CvR0F0) (Czech talk). Not everything that needed to be said made it into the slides, so I am filling in the gaps here with broader context.

## Another hyper-productive vibe-coding manager {#manager}

I am the kind of CEO who wants to understand and be able to do what matters in the company. And when something needs to move, I roll up my sleeves and work. In code — do not expect more from me than that. Until recently I was still actively building websites myself.

Using [vibe coding](../guide/vibe-coding.md) — agentic development, if you prefer — I have built several apps I can use myself that save me time. That part is probably obvious.

What is new is that at PageSpeed.ONE we have had our first successful attempts to let me into the codebase of our main product.

In record time and at reasonable cost we have a [new website](https://pagespeed.one/), a new app for [measuring website speed](https://pagespeed.one/app/insights), and more. It is not perfect — neither the outward results nor the code and process — but it hits the main goals and it massively speeds up iteration.

<figure>
<img src="/assets/img/content/dest/blog/ps-one-insights-amazon.webp" alt="PageSpeed.ONE website speed test showing real-user performance scores">
<figcaption markdown="1">
*Our shiny new website speed test that returns real-user performance scores.*
</figcaption>
</figure>

Why is it often best if I build the app, the site extension, or the feature myself?

The main argument is efficiency. In the time it would take me to write a brief and manage the work, I can build the thing.

But there are other arguments too.

## Why I think non-technical people in the codebase can be good for developers {#why-good-for-devs}

When your CEO, product manager, or marketer gets into the code _well_, developers can gain a lot:

* A tangible prototype instead of a long specification.
* Faster decisions and less communication ping-pong.
* Fewer context "translations" through many people.

And then there is another reason: _overlap_.

As CEO I should know what clients want — I talk to them. I know where our arguments are weak, I know the full context of our product. I have a grasp of marketing, or I do some of it myself. I do sales, account management, a bit of finance, quite a lot of product, and I have to know our specialisation — web performance… That combination lets me generate code that serves the product.

I am not the best at code quality; others handle that (and good processes help), but I bring a perspective that might have been missing before.

To a large extent this is about specialisation versus its opposite — building knowledge wide rather than deep. As CEO I have to be a generalist.

## Depth vs. breadth of knowledge on teams {#depth-vs-breadth}

This simple [management metaphor](https://certibanks.com/KnowledgeArea.aspx?articleid=11) illustrates depth versus breadth of knowledge:

![Chart of depth vs. breadth of knowledge — I-shaped and T-shaped skill profiles](/assets/img/content/dest/blog/skill-shapes.webp)

What do you see?

* Vertically: depth — how far you go into detail in one discipline.
* Horizontally: breadth — how many neighbouring areas you understand well enough to connect them into an outcome.
* If you are "I-shaped", you know one thing brilliantly but miss the rest. If you are "T-shaped", you know one thing brilliantly _and_ have a general awareness of the others. And so on.

In small teams, people with more overlap often work better, but there is no universal "right" or "wrong" skill shape. It is up to each person (and their manager) to know their skills or develop them so they fit the team.

An extreme I-shaped example might be someone specialised purely in frontend development. Or worse — only in CSS… I sketched that on this chart:

<figure>
<img src="/assets/img/content/dest/blog/skill-shaper-i-shaped.webp" alt="I-shaped frontend developer skill chart in the SkillShaper app">
<figcaption markdown="1">
*I-shaped frontend developer. A risky skill portfolio today. Chart source: [SkillShaper](https://machal.github.io/skill-shaper-app/) app.*
</figcaption>
</figure>

A company CEO is the other extreme — they should not be a narrow specialist but have the broadest possible range. I illustrated that on my own profile:

<figure>
<img src="/assets/img/content/dest/blog/skill-shaper-multi-skill.webp" alt="CEO multi-skill profile chart in the SkillShaper app">
<figcaption markdown="1">
*A CEO has to be multi-skill. Chart source: [SkillShaper](https://machal.github.io/skill-shaper-app/) app.*
</figcaption>
</figure>

Building any digital product requires knowing not only product, UX, and development, but also leadership and company strategy, the people in the organisation, finance, and ideally marketing too.

All of that context has to bubble through to the people who actually ship the product — developers.

Usually that happens through briefs, documentation, company strategy, meetings, or less formally over a beer or in the office kitchen.

When you carry all that context in your head, getting a chance to build something concrete makes you very efficient.

And that opportunity is what the AI revolution opened — it commoditises and therefore brutally cheapens parts of development work.

## The product is done in less time than briefing and management would take… {#time-vs-management}

Agentic development is far enough along today that when done carefully (and the CEO is a former developer), it works very well. These are exactly the reasons code is opening up to people outside engineering:

* Prototyping is available to almost everyone now, and nearly for free.
* Some parts of applications have become cheaper to build.
* You need fewer handoffs and fewer rounds of feedback.

## …but if we do not agree on the rules, I can wreck the whole product {#risk-of-breaking}

Sure, developers — I hear you. Badly set processes, or non-technical people ignoring them, can bring disaster:

* Bypassing process (PRs without code review).
* Changes without architectural knowledge that fight the architecture.
* Touching areas where a dangerous edit can slip through.

That is one of the challenges product and agency teams face now: changing workflows and the tech stack so non-technical people can contribute to products safely.

I still think Pandora's box is open and we cannot close it. Non-technical contributions to code _will_ happen, and developers will have to deal with it.

<small>*Does this happen at your company too? How do you handle it? Let's discuss on LinkedIn, Facebook, or X.*</small>
