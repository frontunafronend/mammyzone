import { siteContact } from "@/lib/i18n";
import type { BookingRequestPayload } from "./types";
import { formatLongDate } from "./availability";

export function buildBookingWhatsappUrl(payload: BookingRequestPayload): string {
  const { offering, localDateIso, slot, reference, name, phone } = payload;
  const dateHe = formatLongDate(localDateIso, "he");
  const dateEn = formatLongDate(localDateIso, "en");
  const textHe = `היי אורטל, שלחתי בקשה דרך האתר.\nקוד: ${reference}\nשירות: ${offering.title.he}\nתאריך: ${dateHe}\nשעה: ${slot.localTimeLabel.he}\nשם: ${name}\nטלפון: ${phone}`;
  const textEn = `Hi Ortal — website booking request.\nRef: ${reference}\nService: ${offering.title.en}\nDate: ${dateEn}\nTime: ${slot.localTimeLabel.en}\nName: ${name}\nPhone: ${phone}`;
  const text = `${textHe}\n\n---\n\n${textEn}`;
  const base = new URL(siteContact.whatsappUrl);
  base.searchParams.set("text", text);
  return base.toString();
}
