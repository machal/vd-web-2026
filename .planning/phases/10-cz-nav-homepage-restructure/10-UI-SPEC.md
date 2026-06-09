# Phase 10 UI-SPEC: CZ Nav & Homepage Restructure

**Phase:** 10-cz-nav-homepage-restructure
**Requirements:** CZNAV-01, CZNAV-02, CZHOME-01, CZHOME-02

## Header navigation

| Element | Spec |
|---------|------|
| Visible items | Články (→ `/`), Knihy (→ `/ebooky` or books hub), Autor (→ `/martin`) |
| Hidden from header | Podcast, Video |
| Style | Existing VD nav — no new CSS |

## Footer navigation

| Element | Spec |
|---------|------|
| Podcast | Link present in footer (not header) |
| Video | Link present in footer (not header) |
| Style | Match existing CS footer link row |

## Homepage — removed

- `#podcast-youtube` two-column block with podcast + YouTube images

## Homepage — podcast block (new, under e-books)

| Property | Spec |
|----------|------|
| Position | Immediately after `#ebooky` section |
| Width | Full width (`.content-full`) |
| Tone | Past tense — podcast is historical |
| CTA | Link to FrontKec |
| Images | No large podcast/YouTube hero images in this block (text-focused OK) |

## Verification

- Build `npm run build:vzhurudolu` passes
- Visual check on CS preview homepage
