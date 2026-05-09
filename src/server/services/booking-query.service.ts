import { bookingRequestRepository } from "@/server/repositories/booking-request.repository";

export async function listBookingRequestsForAdmin() {
  return bookingRequestRepository.listForAdminTable();
}
