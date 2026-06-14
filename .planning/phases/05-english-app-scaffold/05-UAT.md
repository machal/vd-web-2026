---
status: testing
phase: 05-english-app-scaffold
source: 05-01-SUMMARY.md, 05-02-SUMMARY.md, 05-03-SUMMARY.md, 05-04-SUMMARY.md, 05-05-SUMMARY.md
started: 2026-06-09T12:00:00Z
updated: 2026-06-09T12:10:00Z
---

## Current Test

number: 3
name: Navigation and minimal footer
expected: |
  On https://vd-web-2026-xco9.vercel.app/, check the header navigation and footer.
  Primary nav should have only Articles (→ /) and Martin (→ /martin). No Podcast, E-books, or Courses.
  Footer should show Privacy and Cookies legal links only (minimal mode).
awaiting: user response

## Tests

### 1. EN Homepage — hero, stream, About Martin CTA
expected: Homepage at EN preview URL shows hero (name, tagline, positioning, About Martin CTA) and merged blog+guide article stream newest-first with type badges
result: pass

### 2. Personal brand title
expected: Browser tab and header show "Martin Michálek · Web & Performance" (text wordmark, no Vzhůru dolů hammer logo); subtitle "Web & Performance" visible in branding
result: pass

### 3. Navigation and minimal footer
expected: Primary nav has only Articles (→ /) and Martin (→ /martin). No Podcast, E-books, or Courses. Footer shows Privacy and Cookies legal links only (minimal mode)
result: [pending]

### 4. Blog article route
expected: Opening a blog article at /blog/{slug} (e.g. /blog/my-2025-in-review) renders full article with title, date, and body. No /blog listing page exists
result: [pending]

### 5. Guide article route
expected: Opening a guide at /guide/{slug} (e.g. /guide/web-vitals) renders full article. No /guide listing page exists
result: [pending]

### 6. /martin page
expected: /martin shows full About page — portrait hero, PageSpeed.ONE links, services accordion, client logos band, LinkedIn CTA. Martin nav item is active
result: [pending]

### 7. Custom 404 page
expected: Visiting a non-existent URL (e.g. /does-not-exist) shows custom 404 with "Page not found" and links back to homepage and /martin
result: [pending]

### 8. EN Vercel preview deploy
expected: EN Vercel project connected to monorepo (root apps/michalek-dev), preview deploy succeeds at https://vd-web-2026-xco9.vercel.app/
result: [pending]

### 9. Legal stub pages
expected: /privacy and /cookies load with "Coming soon" placeholder copy and shared layout
result: [pending]

### 10. Dual Vercel projects from one repo
expected: Both Vercel projects live — CS at https://vd-web-2026.vercel.app/ and EN at https://vd-web-2026-xco9.vercel.app/ — each serving its own app from the monorepo
result: [pending]

## Summary

total: 10
passed: 2
issues: 0
pending: 8
skipped: 0
blocked: 0

## Gaps

[none yet]
