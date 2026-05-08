import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { LeadStorageAdapter } from "./storage";
import type {
  BookingLeadRecord,
  ContactLeadRecord,
  LeadWorkflowStatus,
  LeadsStoreFile,
  NewsletterLeadRecord,
  StoredLead,
} from "./types";

const DEFAULT_RELATIVE_DIR = ".data";
const STORE_FILENAME = "leads-store.json";

function emptyStore(): LeadsStoreFile {
  return { version: 1, bookings: [], newsletters: [], contacts: [] };
}

function dataDir(): string {
  const fromEnv = process.env.LEADS_DATA_DIR?.trim();
  if (fromEnv) return path.isAbsolute(fromEnv) ? fromEnv : path.join(process.cwd(), fromEnv);
  return path.join(process.cwd(), DEFAULT_RELATIVE_DIR);
}

function storePath(): string {
  return path.join(dataDir(), STORE_FILENAME);
}

/** Serialize writes — sufficient for dev / single-instance hosts */
let writeChain: Promise<void> = Promise.resolve();

function withWriteLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeChain.then(fn, fn);
  writeChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readStore(): Promise<LeadsStoreFile> {
  const file = storePath();
  try {
    const raw = await readFile(file, "utf8");
    const parsed = JSON.parse(raw) as LeadsStoreFile;
    if (parsed?.version !== 1) return emptyStore();
    return {
      version: 1,
      bookings: Array.isArray(parsed.bookings) ? parsed.bookings : [],
      newsletters: Array.isArray(parsed.newsletters) ? parsed.newsletters : [],
      contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
    };
  } catch (e: unknown) {
    const code = typeof e === "object" && e && "code" in e ? String((e as NodeJS.ErrnoException).code) : "";
    if (code === "ENOENT") return emptyStore();
    throw e;
  }
}

async function writeStore(store: LeadsStoreFile): Promise<void> {
  await mkdir(dataDir(), { recursive: true });
  await writeFile(storePath(), JSON.stringify(store, null, 2), "utf8");
}

export class FileJsonLeadStorage implements LeadStorageAdapter {
  async appendBooking(
    row: Omit<BookingLeadRecord, "id" | "createdAt" | "status" | "type">,
  ): Promise<BookingLeadRecord> {
    const full: BookingLeadRecord = {
      ...row,
      id: randomUUID(),
      type: "booking",
      status: "new",
      createdAt: new Date().toISOString(),
    };
    return withWriteLock(async () => {
      const s = await readStore();
      s.bookings.unshift(full);
      await writeStore(s);
      return full;
    });
  }

  async appendNewsletter(
    row: Omit<NewsletterLeadRecord, "id" | "createdAt" | "status" | "type">,
  ): Promise<NewsletterLeadRecord> {
    const full: NewsletterLeadRecord = {
      ...row,
      id: randomUUID(),
      type: "newsletter",
      status: "new",
      createdAt: new Date().toISOString(),
    };
    return withWriteLock(async () => {
      const s = await readStore();
      s.newsletters.unshift(full);
      await writeStore(s);
      return full;
    });
  }

  async appendContact(
    row: Omit<ContactLeadRecord, "id" | "createdAt" | "status" | "type">,
  ): Promise<ContactLeadRecord> {
    const full: ContactLeadRecord = {
      ...row,
      id: randomUUID(),
      type: "contact",
      status: "new",
      createdAt: new Date().toISOString(),
    };
    return withWriteLock(async () => {
      const s = await readStore();
      s.contacts.unshift(full);
      await writeStore(s);
      return full;
    });
  }

  async listBookings(): Promise<BookingLeadRecord[]> {
    const s = await readStore();
    return [...s.bookings];
  }

  async listNewsletters(): Promise<NewsletterLeadRecord[]> {
    const s = await readStore();
    return [...s.newsletters];
  }

  async listContacts(): Promise<ContactLeadRecord[]> {
    const s = await readStore();
    return [...s.contacts];
  }

  async updateBookingStatus(id: string, status: LeadWorkflowStatus): Promise<void> {
    return withWriteLock(async () => {
      const s = await readStore();
      const row = s.bookings.find((b) => b.id === id);
      if (!row) throw new Error("Booking lead not found");
      row.status = status;
      await writeStore(s);
    });
  }

  async updateNewsletterStatus(id: string, status: LeadWorkflowStatus): Promise<void> {
    return withWriteLock(async () => {
      const s = await readStore();
      const row = s.newsletters.find((b) => b.id === id);
      if (!row) throw new Error("Newsletter lead not found");
      row.status = status;
      await writeStore(s);
    });
  }

  async updateContactStatus(id: string, status: LeadWorkflowStatus): Promise<void> {
    return withWriteLock(async () => {
      const s = await readStore();
      const row = s.contacts.find((b) => b.id === id);
      if (!row) throw new Error("Contact lead not found");
      row.status = status;
      await writeStore(s);
    });
  }

  async listAllLeads(): Promise<StoredLead[]> {
    const s = await readStore();
    const merged: StoredLead[] = [...s.bookings, ...s.newsletters, ...s.contacts];
    merged.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return merged;
  }
}
