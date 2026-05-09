import { newsletterSubscriberRepository } from "@/server/repositories/newsletter-subscriber.repository";

export async function listNewsletterSubscribersForAdmin() {
  return newsletterSubscriberRepository.listForAdmin();
}

export async function listNewsletterSubscribersForExport() {
  return newsletterSubscriberRepository.listAllForExport();
}
