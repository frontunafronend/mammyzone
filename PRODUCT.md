# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitor: a Hebrew-speaking mother in Israel (pregnant, postpartum, or a working mother) on a phone, deciding whether Ortal Hazan is trustworthy enough to book a class, retreat, or conversation.

Secondary: English-speaking partners or visitors using the EN toggle. Operators: Ortal / staff using `/admin` for bookings, leads, content, and schedule.

## Product Purpose

MammyZone is Ortal Hazan’s public studio: a bilingual site to explain her work, prove presence, and convert a first booking or contact. Success is a mother who understands what is offered, believes the space will meet her at her own pace, and takes one action (book, WhatsApp, contact, newsletter).

## Positioning

Not a generic yoga studio and not a medical pregnancy clinic. The uncopyable mechanism is one practitioner holding body, mind, and physical space together: postnatal and pregnancy yoga (including soft Ashtanga), baby massage, certified NLP coaching, women’s circles/retreats, and interior / energetic home design. The claim in product copy: the right space — in the body and in the home — can release a mother’s force.

## Operating Context

- Hebrew-first, RTL default; English is a full parallel layer, not a subtitle.
- Live origin: `https://mammyzone.co.il` (Next.js 14 on Vercel, Prisma/Neon).
- Public journeys: homepage → service landings → `/book` wizard → `/contact` → `/blog`.
- Direct line: WhatsApp / phone / email in chrome; floating CTA cluster on public pages.
- Admin is a separate operate surface (`/admin`) and is not the public brand stage.

## Capabilities and Constraints

- Confirmed public routes: `/`, `/book`, `/contact`, `/blog`, service landings (`/pregnancy-yoga`, `/yoga-after-birth`, `/baby-massage`, `/nlp-for-mothers`, `/postpartum-recovery`, `/workshops`), admin.
- Must preserve: bilingual HE/EN, RTL/LTR, booking and contact behavior, existing copy and factual claims, real credentials, working forms, accessibility of tap targets and focus.
- Must not fabricate: testimonials, prices, Instagram handle (placeholder in copy), stats beyond what copy already states (`15+` years, `4` disciplines).
- Visual redesign is authorized; product facts and flows stay.

## Brand Commitments

- Name: MammyZone. Practitioner: אורטל חזן / Ortal Hazan.
- Voice already in copy: direct, unhurried, no-performance, “come as you are.”
- User brief (2026-08-13): full authority to replace the public visual world; keep a restore path; ship live when the new design is done; use Storybook as the design-system surface.
- Hebrew must remain first-class typography (not Latin-only display with Hebrew as fallback).

## Evidence on Hand

- Site copy and structure: `src/lib/i18n.ts`, `src/app/page.tsx`, service landing components.
- Credentials stated in copy: certified yoga & Ashtanga instructor, baby massage specialist, certified NLP coach, interior / energetic space designer (also described as architect in one credential line).
- Photography: `src/lib/media/sources.ts` (hero, about portrait, gallery stock). Instagram follow URL is still a placeholder.
- Testimonials exist in i18n; treat as existing site content, not newly invented proof.
- Current visual implementation (cream / rose / sage wellness landing) is incumbent evidence to replace, not a brand lock.

## Product Principles

1. Pace over performance — the mother is not asked to prove she belongs.
2. One guide, several doors — yoga, massage, NLP, circles, and space design are one practice, not a marketplace of unrelated cards.
3. Hebrew-first, phone-first — RTL, tap targets, and evening/nap-time use are the default scene.
4. Proof without theater — credentials and real images; no invented metrics.
5. Action is gentle and obvious — book, contact, or WhatsApp within seconds, without a maze of nav.

## Accessibility & Inclusion

Hebrew and English must both be fully usable. Honor `prefers-reduced-motion`. Keep visible focus, 44px-class tap targets, and body contrast on whatever new surfaces ship. Postpartum and pregnancy visitors may be tired and one-handed; reduce cognitive load in booking and contact.

## Assumptions (inferred)

Inferred from the live codebase and the 2026-08-13 redesign brief after the user granted full design authority. Not independently re-interviewed.

- Admin visual language may inherit tokens but is not the redesign stage.
- No new commercial claims (pricing, class sizes, locations) will be invented in the visual overhaul.
