import { BOOKING_OFFERINGS } from "../src/lib/booking/catalog";
import { getPrisma } from "../src/server/db";

const prisma = getPrisma();

async function main() {
  for (const o of BOOKING_OFFERINGS) {
    await prisma.lessonService.upsert({
      where: { slug: o.id },
      create: {
        slug: o.id,
        titleHe: o.title.he,
        titleEn: o.title.en,
        descriptionHe: o.description.he,
        descriptionEn: o.description.en,
        type: o.kind,
        durationMinutes: o.durationMin,
        price: 0,
        currency: "ILS",
        active: true,
        featured: false,
      },
      update: {
        titleHe: o.title.he,
        titleEn: o.title.en,
        descriptionHe: o.description.he,
        descriptionEn: o.description.en,
        type: o.kind,
        durationMinutes: o.durationMin,
      },
    });
  }

  await prisma.siteSetting.upsert({
    where: { key: "booking.default_timezone" },
    create: { key: "booking.default_timezone", value: "Asia/Jerusalem" },
    update: { value: "Asia/Jerusalem" },
  });

  await prisma.siteSetting.upsert({
    where: { key: "seo.base_url" },
    create: { key: "seo.base_url", value: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mammyzone.co.il" },
    update: { value: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mammyzone.co.il" },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
