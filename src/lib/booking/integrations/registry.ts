import type { BookingIntegrations } from "./types";

/**
 * Resolve live integrations from env when you connect providers.
 * Example: `if (process.env.CALCOM_API_KEY) return { calcom: new CalcomClient(...) }`
 */
export function getBookingIntegrations(): BookingIntegrations {
  return {};
}
