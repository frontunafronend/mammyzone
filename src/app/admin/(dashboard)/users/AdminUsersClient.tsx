"use client";

import { adminT } from "@/lib/admin-i18n";
import { useLanguage } from "@/lib/i18n";

export type AdminUserRow = {
  id: string;
  email: string | null;
  name: string | null;
  role: string;
  status: string;
  lastLoginDay: string | null;
};

export function AdminUsersClient({ users }: { users: AdminUserRow[] }) {
  const { language } = useLanguage();
  const dash = "—";

  return (
    <>
      <h1>{adminT("usersTitle", language)}</h1>
      <p className="admin-panel__muted">{adminT("usersSubtitle", language)}</p>
      {users.length === 0 ? (
        <div className="admin-leads__table-wrap">
          <p className="admin-leads__empty">{adminT("usersEmpty", language)}</p>
        </div>
      ) : (
        <div className="admin-leads__table-wrap">
          <table>
            <thead>
              <tr>
                <th>{adminT("usersColEmail", language)}</th>
                <th>{adminT("usersColName", language)}</th>
                <th>{adminT("usersColRole", language)}</th>
                <th>{adminT("usersColStatus", language)}</th>
                <th>{adminT("usersColLastLogin", language)}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.email ?? dash}</td>
                  <td>{u.name ?? dash}</td>
                  <td>{u.role}</td>
                  <td>{u.status}</td>
                  <td className="admin-leads__mono">{u.lastLoginDay ?? dash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
