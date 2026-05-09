/**
 * Re-export contact URL helpers for server modules that should not import from `lib/` directly.
 * Prefer `@/lib/contact/customer-links` in UI code.
 */
export { customerTelHref, customerWhatsAppUrl } from "@/lib/contact/customer-links";
