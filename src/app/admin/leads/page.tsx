import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin/session";
import { getLeadStorage } from "@/lib/leads/get-lead-storage";
import { AdminLeadsClient } from "./AdminLeadsClient";
import { AdminLoginForm } from "./AdminLoginForm";

export const dynamic = "force-dynamic";

function adminSecret(): string | null {
  const k = process.env.ADMIN_ACCESS_KEY?.trim();
  return k && k.length > 0 ? k : null;
}

export default async function AdminLeadsPage() {
  const secret = adminSecret();
  if (!secret) {
    return (
      <div className="admin-leads">
        <p className="admin-leads__empty">
          <strong>ADMIN_ACCESS_KEY</strong> is not set. Add it to your environment to use this page.
        </p>
      </div>
    );
  }

  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const authed = Boolean(token && verifyAdminSessionToken(token, secret));
  if (!authed) {
    return <AdminLoginForm />;
  }

  const store = getLeadStorage();
  const [bookings, newsletters, contacts] = await Promise.all([
    store.listBookings(),
    store.listNewsletters(),
    store.listContacts(),
  ]);

  return <AdminLeadsClient bookings={bookings} newsletters={newsletters} contacts={contacts} />;
}
