"use client";

import { useRef, useState } from "react";
import { submitContactInterest } from "@/app/actions/leads";
import { HoneypotField } from "@/components/forms/HoneypotField";
import {
  CONTACT_INTEREST_ORDER,
  CONTACT_METHOD_ORDER,
  contactFormCopy,
  contactInterestLabels,
  contactMethodLabels,
} from "@/lib/contact/page-copy";
import { useLanguage } from "@/lib/i18n";
import type { ContactInterestType, ContactPreferredMethod } from "@/lib/leads/types";

export function ContactInquiryForm() {
  const { language } = useLanguage();
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interestType, setInterestType] = useState<ContactInterestType>("not_sure");
  const [preferredMethod, setPreferredMethod] = useState<ContactPreferredMethod>("whatsapp");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const bodyFont = language === "he" ? "font-bodyHe" : "font-bodyEn";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError(language === "he" ? "נא למלא שם." : "Please add your name.");
      return;
    }
    if (!phone.trim()) {
      setError(language === "he" ? "נא למלא טלפון." : "Please add your phone number.");
      return;
    }
    setPending(true);
    const res = await submitContactInterest({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message: message.trim(),
      interestType,
      preferredMethod,
      honeypot: honeypotRef.current?.value ?? "",
      language,
      source: "/contact",
    });
    setPending(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <div className={`contact-form-success ${bodyFont}`} role="status">
        <p className="contact-form-success__title">{contactFormCopy.successTitle[language]}</p>
        <p className="contact-form-success__body">{contactFormCopy.successBody[language]}</p>
      </div>
    );
  }

  return (
    <form className={`contact-form ${bodyFont}`} onSubmit={(ev) => void onSubmit(ev)} noValidate>
      <HoneypotField ref={honeypotRef} />
      {error ? (
        <p className="contact-form__error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="contact-form__grid">
        <label className="contact-field">
          <span className="contact-field__label">{contactFormCopy.name[language]}</span>
          <input
            className="contact-field__input"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required
          />
        </label>
        <label className="contact-field">
          <span className="contact-field__label">{contactFormCopy.phone[language]}</span>
          <input
            className="contact-field__input"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-required
          />
        </label>
        <label className="contact-field contact-field--full">
          <span className="contact-field__label">{contactFormCopy.email[language]}</span>
          <input
            className="contact-field__input"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="contact-field contact-field--full">
          <span className="contact-field__label">{contactFormCopy.interest[language]}</span>
          <select
            className="contact-field__select"
            name="interestType"
            value={interestType}
            onChange={(e) => setInterestType(e.target.value as ContactInterestType)}
          >
            {CONTACT_INTEREST_ORDER.map((id) => (
              <option key={id} value={id}>
                {contactInterestLabels[id][language]}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="contact-field contact-field--full contact-field--fieldset">
          <legend className="contact-field__label">{contactFormCopy.method[language]}</legend>
          <div className="contact-method-row" role="radiogroup" aria-label={contactFormCopy.method[language]}>
            {CONTACT_METHOD_ORDER.map((m) => (
              <label key={m} className="contact-method-chip">
                <input
                  type="radio"
                  name="preferredMethod"
                  value={m}
                  checked={preferredMethod === m}
                  onChange={() => setPreferredMethod(m)}
                />
                <span>{contactMethodLabels[m][language]}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="contact-field contact-field--full">
          <span className="contact-field__label">{contactFormCopy.message[language]}</span>
          <textarea
            className="contact-field__textarea"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={contactFormCopy.placeholderMessage[language]}
          />
        </label>
      </div>
      <button type="submit" className="btn-primary contact-form__submit" disabled={pending}>
        {pending ? contactFormCopy.submitting[language] : contactFormCopy.submit[language]}
      </button>
    </form>
  );
}
