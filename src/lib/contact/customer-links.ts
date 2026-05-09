/** Build wa.me / tel links from lead phone text — shared UI helpers (no I/O). */

export function customerWhatsAppUrl(phone: string): string | null {
  const raw = phone.replace(/\D/g, "");
  if (raw.length < 9) return null;
  let n = raw;
  if (n.startsWith("972")) {
    // ok
  } else if (n.startsWith("0")) {
    n = `972${n.slice(1)}`;
  } else if (n.length === 9) {
    n = `972${n}`;
  } else {
    return null;
  }
  return `https://wa.me/${n}`;
}

export function customerTelHref(phone: string): string | null {
  const raw = phone.replace(/\D/g, "");
  if (raw.length < 9) return null;
  if (raw.startsWith("972")) return `tel:+${raw}`;
  if (raw.startsWith("0")) return `tel:+972${raw.slice(1)}`;
  return `tel:+${raw}`;
}
