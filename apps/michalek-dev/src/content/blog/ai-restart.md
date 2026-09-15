---
title: "AI restart: five questions the developer community has to answer"
description: "Agents made development faster and a lot more fun, but they also multiplied the mental load, opened repositories to non-developers and put pressure on jobs. Whether to use AI is settled. How to use it is not — and five deeper questions are still wide open."
date: 2026-09-14
published: true
pairId: ai-restart
author: Martin Michálek
adaptedFrom:
  title: "AI restart. Pět z otázek, které musí dořešit vývojářská komunita"
  url: "https://www.vzhurudolu.cz/blog/266-ai-restart-frontkon"
tags:
  - ai
  - development
  - vibe-coding
  - soft-skills
ogImage: /assets/img/content/dest/ai-restart-frontkon-og.webp
---

# AI restart. Five questions the developer community has to answer

Software development is going through a crisis. On one side, agentic development brought a huge jump in efficiency and a far more entertaining way to work.

On the other, we are watching a completely different approach to building software, a multiplied mental load, and an invasion of barbarians — people never before touched by development, now poking around in developer repositories.

And then there is the pressure on jobs, the layoffs, and the nagging question of whether developer work still makes sense at all.

It is wild out there, folks.

When we started putting the programme together for this year's [FrontKon](https://www.frontkon.tech/), a Czech frontend conference I help curate, we kept asking how to frame all of it. Nobody needs to debate _whether_ to use AI any more. What we are dealing with is _how_ to use it.

I know developers will write less and less code, if any at all.

But behind the practical questions sit other ones — far more unsettling, far more philosophical.

There are plenty of them. In this article I am trying to name the ones that matter most. Let's discuss them.

## 1) When AI writes most of the code, what does it mean to be a developer? {#what-is-a-developer}

In the [JetBrains Developer Ecosystem 2026](https://blog.jetbrains.com/research/2026/08/how-much-code-do-developers-really-let-agents-write) survey of more than 15,000 professional developers, over half said they hand-write less than 20% of their code. One in five has not written anything at all without AI help. And that was in the first half of this year.

JetBrains deliberately calls those people "coders" in their data. What they measure is how code comes into existence, not development as a whole. An agent can propose the result, but someone still has to pick the problem, understand the user, decide on the architecture and get the software safely into production. So that it does not fall over, and stays fast and secure.

Which leads to these questions:

- If the writing itself is gradually disappearing, what actually makes someone a developer?
- Isn't it time to stop confusing writing code with building software when we talk about developers?

<figure>
<img src="/assets/img/content/dest/ai-restart-frontkon-01.webp" alt="The audience at FrontKon 2025">
<figcaption markdown="1">
*This year we want to carry on the debate about how AI is changing developers' work.*
</figcaption>
</figure>

## 2) Do we still have to read all the code? And what does it mean if we don't? {#reading-all-the-code}

The [Sonar State of Code 2026](https://www.sonarsource.com/blog/state-of-code-developer-survey-report-the-current-reality-of-ai-coding/) survey reached conclusions similar to the previous one. AI wrote or helped write 42% of committed code. At the same time, 38% of respondents said reviewing AI code takes more work than reviewing code from colleagues.

Sure, we all know the feeling. AI-generated slop in pull requests. New, tedious required reading. Except… is it actually required?

According to the same survey, 96% of developers do not fully trust AI code — yet only 48% verify it every time before committing.

Code appears faster. The human ability to judge whether it is correct has not sped up in any meaningful way.

Addy Osmani calls this [comprehension debt](https://addyosmani.com/blog/comprehension-debt/) — the gap between how much code sits in a system and how much of it people actually understand.

In an [Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills) experiment, people using AI reached roughly the same speed as the control group, but scored 50% instead of 67% on a comprehension test.

Faros AI data from 22,000 developers across 4,000 teams, [via Addy Osmani](https://addyosmani.com/blog/agentic-code-review/), shows that with heavy AI use the median review duration grew by 441.5%. Yes, roughly fivefold. The share of PRs merged without review went up by 31.3%. Yes, by a third. Did you feel that little chill down your spine too?

The questions:

- Do we still have to check every line in a pull request?
- Can we afford working software that nobody understands?
- What if we are merging without review not on purpose, but simply because we can no longer keep up with the reading?
- What if AI did not remove the bottleneck in development and only pushed it one step further along?

<figure>
<img src="/assets/img/content/dest/ai-restart-frontkon-02.webp" alt="People outside at FrontKon 2025">
<figcaption markdown="1">
*Out here, no pull request from an AI is waiting for anyone. Hopefully.*
</figcaption>
</figure>

## 3) Are developers turning into managers of agents? {#managers-of-agents}

Addy Osmani writes down what we can all see. Working with several LLM agents is not about prompting any more. It is about [running a small team](https://addyosmani.com/blog/coding-agents-manager/). The developer explains intent, supplies context, splits the work, sets boundaries and checks the result.

Claude Code's creator Boris Cherny runs five local agents and another five to ten in the browser. That was early this year. Go ask Boris how many he is running today.

At the same time, Osmani recommends limiting work in progress, because every extra agent grows the queue of outputs, decisions and code reviews.

Know that feeling? We vibe coders do. It is driving us slightly mad.

So the questions that matter:

- Does every developer become a manager of agents, then? What does that mean for people who mostly wanted to write code in peace?
- Are ten agents ten times the productivity, or just ten new places where we have to keep shifting our attention?

<figure>
<img src="/assets/img/content/dest/ai-restart-frontkon-03.webp" alt="A packed hall at FrontKon 2025">
<figcaption markdown="1">
*Running a conference full of people may soon be easier than keeping an eye on ten agents.*
</figcaption>
</figure>

## 4) What is AI doing to learning and deep work? {#learning-and-deep-work}

Addy Osmani talks about cognitive outsourcing — delegating your thinking — and [cognitive surrender](https://addyosmani.com/blog/cognitive-surrender), giving up on thinking altogether.

Crazy, but real. All of us who use LLMs are standing at the edge of a getting-dumber cliff. You do not want to know what it does to today's teenagers. I have some at home. Corner me somewhere dark at FrontKon and I will tell you all about it.

Back to developers, though. Across three experiments with 1,372 participants, people accepted a wrong AI answer as correct in 73% of cases, even when the model was off. Having AI in the reasoning loop made them more confident, too.

The Anthropic experiment followed 52 developers learning a new library. The biggest drop for the AI group was in debugging, with smaller drops in grasping concepts and reading code. The people who came out worst were the ones who passively handed work to the AI. The ones who asked about principles and connections did better. They were the nosy type.

So the questions:

- How do we spot the moment when we stop judging someone else's answer and just adopt its confidence?
- When is AI a teacher and when is it a replacement for learning?
- Are we getting dumber?

<figure>
<img src="/assets/img/content/dest/ai-restart-frontkon-04.webp" alt="The audience during a talk at FrontKon 2025">
<figcaption markdown="1">
*Still unclear whether the audience is learning with AI, without it, or in spite of it.*
</figcaption>
</figure>

## 5) Will the identity of people who work as developers change? {#developer-identity}

I ended my own active development career a long time ago. Long before many of my readers started theirs.

These days I am a web performance expert, a product person, I lead teams and do business. And yet, thanks to agents, I am reaching directly into the code of [PageSpeed.ONE](https://pagespeed.one/) again. As a [CEO who is taking developers' work](ceo-takes-your-job.md), I sometimes ship a finished feature faster than I could have written the brief for it.

Osmani distinguishes work you can send to agents in the background from work that needs close human collaboration. Architecture, unclear requirements and product nuance still need experienced judgement, he argues. And someone still has to steer the whole stream of agent work.

Simon Willison — a well-known developer, Django co-creator and long-time commentator on AI in software — writes in his [piece on vibe coding and agentic engineering](https://simonwillison.net/2026/May/6/vibe-coding-and-agentic-engineering/) that the skills we need do not look anything like a prompting course.

Judge for yourself: planning, testing, documentation, version control, manual QA, research, estimation, and the ability to tell what can safely be delegated.

Aren't those exactly the skills of experienced developers and tech leads — of people with management skills, in other words?

Willison separates casual vibe coding from agentic engineering. For production software, he argues, it is not enough that the result looks like it works. The developer is still accountable for security, operations, performance and the impact on other people's data. AI speeds up delivery, but it does not take that part of the job off a human.

The questions:

- Who exactly can become a developer today?
- What will this do to people who chose development precisely for the quiet, the focus and the clearly bounded tasks?
- Will we still be learning syntax and frameworks first, or judgement, communication and working with uncertainty?
- Will one new developer role emerge, or will the profession split into broad orchestrators and deep technical specialists?
- Will the "vibe barbarians" arrive and replace the "developers"?

<figure>
<img src="/assets/img/content/dest/ai-restart-frontkon-05.webp" alt="FrontKon 2025 attendees during a break">
<figcaption markdown="1">
*Developers? Managers of agents? Vibe barbarians?*
</figcaption>
</figure>

There.

I could keep going — I got a bit carried away. Sorry, my head is full of this.

My view is that the developer as a role will not disappear. It will almost certainly move to a different floor of the software development process. It will definitely change the skills required. New people may come into development, and some of the current ones who only dig around in code will simply have to leave.

Developers will be code labourers less and start holding more accountability. "Accountability" is the key word. AI will not take accountability off your hands. [Accountability for the product](../guide/ai-saas.md), for the website, for the app. In human organisations, that still sits with humans.

Development has never been through a crisis like this. It is big. Maybe a little frightening, but also interesting, and full of enormous possibilities for anyone with an open mind.

<small>*Come and discuss it: [join the thread on Bluesky](https://bsky.app/profile/machal.bsky.social/post/3mvhxk4guv22d), or in person at [FrontKon](https://www.frontkon.tech/events/frontkon-26/program).*</small>
