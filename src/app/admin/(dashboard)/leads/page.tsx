import { getLeadStorage } from "@/server/adapters/lead-storage.factory";
import { AdminLeadsClient } from "./AdminLeadsClient";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const store = getLeadStorage();
  const [bookings, newsletters, contacts] = await Promise.all([
    store.listBookings(),
    store.listNewsletters(),
    store.listContacts(),
  ]);

  return <AdminLeadsClient bookings={bookings} newsletters={newsletters} contacts={contacts} />;
}
