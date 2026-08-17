# VD Translator — adaptation examples

Short illustrations of CS → EN adaptation (not full articles).

---

## Blog: direct tone

**CS (sense):** „Schopní lidé se topí v práci, protože neumí říkat ne.“

**EN (target style):**
> The talent of many talented people gets wrecked by never mastering the art of saying _no_.

Not:
> ~~Many capable individuals experience challenges with workload management due to insufficient boundary-setting.~~

---

## Guide: technical clarity

**CS (sense):** „WebP je pomalejší na dekódování, ale u statických obrázků to nevadí.“

**EN (target style):**
> In other words: only worth a second thought if you are generating images on the fly. For build-time assets, ship it and move on.

---

## Local context: Czech video

**CS:**
```markdown
[proč vám váš CEO bere práci](https://www.youtube.com/watch?v=VgQL7CvR0F0)
```

**EN:**
```markdown
[why your CEO is getting into your code](https://www.youtube.com/watch?v=VgQL7CvR0F0) (Czech talk at a Frontendisti.cz meetup)
```

---

## Internal link: paired article

**CS:**
```markdown
[vibe-codingu](../prirucka/vibe-coding.md)
```

**EN (in guide or blog):**
```markdown
[vibe coding](../guide/vibe-coding.md)
```

---

## Internal link: unpaired article

**CS:**
```markdown
[vývojáři skončili](232-ai-vyvojari-frontkon.md)
```

**EN (no EN pair exists):**
```markdown
developers are finished
```
*(no link — do not point to vzhurudolu.cz)*

---

## Backlink: EN article

In `apps/michalek-dev/src/content/guide/vibe-coding.md`, natural sentence:

```markdown
…which is why I wrote more about [CEOs shipping code themselves](../blog/ceo-takes-your-job.md).
```

Same-folder blog example (mirror of an already-approved CS backlink):

```markdown
The mental and skill-based [transformation](short-sighted-captain.md) from the first to the second took me roughly five years.
```

---

## Backlink: CS article

In `apps/vzhurudolu/src/content/prirucka/vibe-coding.md`:

```markdown
…o tom jsem psal v [článku o CEO v kódu](../blog/264-ceo-bere-praci.md).
```
