# Design

<!-- impeccable:design-schema 1 -->

## World

Pastel courtyard, retuned. Warm lilac field, dusty purple, light turquoise. Less pink, less cream — a little more warmth.

## Palette

- Field: `--cream` `#F4F1F3`, `--cream-warm` `#EFE8E6`, paper `--white` `#FBF8F7`
- Ink: `--ink` `#2A1E24`, `--ink-soft` `#5A4752`
- Purple: `--rose` `#7A5C8C`, `--rose-light` `#D4C6DC`, `--rose-pale` `#EEE8F2`
- Turquoise: `--sage` `#5EB8B2`, `--sage-pale` `#E8F5F4`
- Sand: `--sand` `#E2D6D4`

Color is quiet: the field is a warm lilac stone; purple is the action; turquoise is secondary.

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
