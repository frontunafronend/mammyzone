/**
 * Newsletter signup domain helpers (M040).
 * Persistence goes through {@link "@/app/actions/leads"} `subscribeNewsletter`.
 */
export const NEWSLETTER_SIGNUP_SOURCES = ["modal", "footer", "blog"] as const;

export type NewsletterSignupSourceId = (typeof NEWSLETTER_SIGNUP_SOURCES)[number];
