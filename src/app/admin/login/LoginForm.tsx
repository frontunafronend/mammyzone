"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/app/actions/leads";
import { adminT } from "@/lib/admin-i18n";
import { nav, useLanguage, type Language } from "@/lib/i18n";

type Props = { reason?: string | null };

/** Mirrors server copy from `admin-login.service` (English only). */
const SERVER_GENERIC_SIGNIN_ERROR = "Unable to sign in. Check your credentials and try again later.";
const SERVER_CONFIG_ERROR_PREFIX = "Admin sign-in is not configured correctly.";

function localizeLoginError(message: string, lang: Language): string {
  if (message === SERVER_GENERIC_SIGNIN_ERROR) return adminT("loginErrorGeneric", lang);
  if (message.startsWith(SERVER_CONFIG_ERROR_PREFIX)) return adminT("loginErrorServerConfig", lang);
  return message;
}

export function LoginForm({ reason }: Props) {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const langAria = language === "he" ? nav.ariaSwitchToEnglish[language] : nav.ariaSwitchToHebrew[language];

  return (
    <div className="admin-login">
      <div className="admin-login__toolbar">
        <button type="button" className="admin-login__lang" onClick={toggleLanguage} aria-label={langAria}>
          {language === "he" ? nav.langToggle.he : nav.langToggle.en}
        </button>
      </div>
      <h1>{adminT("loginTitle", language)}</h1>
      {reason === "not_configured" ? (
        <p className="admin-login__error" role="alert">
          {adminT("loginNotConfigured", language)}
        </p>
      ) : (
        <p>{adminT("loginIntro", language)}</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const username = String(fd.get("username") ?? "");
          const password = String(fd.get("password") ?? "");
          setPending(true);
          setError(null);
          void (async () => {
            const r = await loginAdmin(username, password);
            setPending(false);
            if (r.ok) router.replace("/admin");
            else setError(r.error);
          })();
        }}
      >
        <label htmlFor="admin-username">{adminT("loginUsername", language)}</label>
        <input
          id="admin-username"
          name="username"
          type="text"
          autoComplete="username"
          required
          disabled={pending}
        />
        <label htmlFor="admin-password">{adminT("loginPassword", language)}</label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
        />
        {error ? (
          <p className="admin-login__error" role="alert">
            {localizeLoginError(error, language)}
          </p>
        ) : null}
        <button type="submit" disabled={pending}>
          {pending ? adminT("loginSigningIn", language) : adminT("loginContinue", language)}
        </button>
      </form>
    </div>
  );
}
