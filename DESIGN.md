# Design

<!-- impeccable:design-schema 1 -->

## World

Mediterranean courtyard at noon. The visitor sits in indigo pergola shade and looks into hard limestone light. Bougainvillea is living color; terracotta is clay, not paint. Seed `a4cd0422`, grounded direction 4.

## Palette

- Limestone field: `--cream` `#d6d0c2`, `--cream-warm` `#e4dece`, glare `--white` `#fffef8`
- Indigo shade: `--ink` `#141b2c`, `--ink-soft` `#3d4a63`
- Bougainvillea: `--rose` `#c2185b`, `--rose-light` `#e84a86`
- Leaf: `--sage` `#1b6b45`
- Clay: `--clay` `#c45c28`

Color is regional: shade columns and night footer own indigo; sun sections own limestone.

## Type

- Hebrew display: Karantina (`--font-karantina`) — wall lettering
- English display and English body: Archivo
- Hebrew body: Heebo
- No uppercase kickers above headings

## Components

- Primary action: clay rectangle, 2px corners
- Ghost: underline, not a pill
- Marks: single-stroke SVG set in `src/components/icons/Marks.tsx`
- Lattice: `CourtyardLattice` — noon vine shadow; the authored motion
- Nav: shade bar, five destinations + Book
- Offerings: limestone rooms, not numbered emoji cards

## Motion

Focal: vine-lattice drift over the hero sun photograph (`vine-drift`, ~32s, paused when `prefers-reduced-motion`). Supporting: short fade-up on hero copy, clay button lift, route enter. Not a per-section fade catalog.

## Surfaces

Public marketing, booking, contact, blog, and service landings inherit this world. `/admin` inherits tokens only.
