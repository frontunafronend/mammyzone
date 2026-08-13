# Design

<!-- impeccable:design-schema 1 -->

## World

Pastel courtyard. Cream limestone, dusty rose, sage mist. Soft and harmonic like the previous studio, with the 2026 structure kept (clearer nav, marks, service rooms, quiet lattice).

## Palette

- Cream field: `--cream` `#FAF7F2`, `--cream-warm` `#F3EDE4`, paper `--white` `#FFFCF8`
- Ink: `--ink` `#2A1F1A`, `--ink-soft` `#5C4A40`
- Rose: `--rose` `#B85070`, `--rose-light` `#E8C4CF`, `--rose-pale` `#F7EEF1`
- Sage: `--sage` `#7A9E8E`, `--sage-pale` `#EEF6F4`
- Sand: `--sand` `#E8DDD0`

Color is quiet: cream owns the page; rose is the action; sage is secondary.

## Type

- Hebrew: Heebo (display and body)
- English: DM Sans
- Headings may italicize rose emphasis; no uppercase kickers above titles

## Components

- Primary action: rose pill
- Ghost: underline
- Marks: SVG set in `src/components/icons/Marks.tsx`
- Lattice: very faint vine light
- Nav: cream glass, five destinations + Book
- Offerings: rooms linking to real landings

## Motion

Quiet lattice drift on the hero photograph. Short fade-up on hero copy. `prefers-reduced-motion` honored.

## Surfaces

Public marketing, booking, contact, blog, and service landings inherit this world. `/admin` inherits tokens only.
