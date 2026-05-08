"use client";

import { useState } from "react";
import { loginAdmin } from "@/app/actions/leads";

export function AdminLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <div className="admin-login">
      <h1>Leads</h1>
      <p>Enter the admin access key configured in the environment.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const password = String(fd.get("password") ?? "");
          setPending(true);
          setError(null);
          void (async () => {
            const r = await loginAdmin(password);
            setPending(false);
            if (r.ok) window.location.reload();
            else setError(r.error);
          })();
        }}
      >
        <label htmlFor="admin-access-key">Access key</label>
        <input
          id="admin-access-key"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
        />
        {error ? (
          <p className="admin-login__error" role="alert">
            {error}
          </p>
        ) : null}
        <button type="submit" disabled={pending}>
          {pending ? "Checking…" : "Continue"}
        </button>
      </form>
    </div>
  );
}
