import type { Language } from "@/lib/i18n-context";
import type { Bilingual } from "@/types";

/** Admin panel copy — Hebrew first, English second. */
export const adminPanel = {
  navOverview: { he: "סקירה", en: "Overview" },
  navLeads: { he: "לידים", en: "Leads" },
  navBookings: { he: "בקשות הזמנה", en: "Bookings" },
  navSchedule: { he: "לוח זמנים", en: "Schedule" },
  navServices: { he: "שירותים", en: "Services" },
  navNewsletter: { he: "ניוזלטר", en: "Newsletter" },
  navContent: { he: "תוכן", en: "Content" },
  navBlog: { he: "בלוג", en: "Blog" },
  navUsers: { he: "משתמשים", en: "Users" },
  navSystem: { he: "מערכת", en: "System" },
  navSettings: { he: "הגדרות", en: "Settings" },
  navAudit: { he: "יומן ביקורת", en: "Audit" },

  shellBrand: { he: "ניהול MammyZone", en: "MammyZone Admin" },
  shellMenu: { he: "תפריט", en: "Menu" },
  shellSearchNav: { he: "חיפוש בניווט", en: "Search navigation" },
  shellSearchPlaceholder: { he: "חיפוש מדורים…", en: "Search sections…" },
  shellSignedInAs: { he: "מחוברת כ־", en: "Signed in as" },
  shellLogout: { he: "התנתקות", en: "Log out" },
  shellLangAriaHe: { he: "החלפת שפת הניהול לאנגלית", en: "Switch admin UI to English" },
  shellLangAriaEn: { he: "החלפת שפת הניהול לעברית", en: "Switch admin UI to Hebrew" },

  loginTitle: { he: "כניסת מנהלות", en: "Admin sign-in" },
  loginNotConfigured: {
    he: "כניסת מנהלות לא הוגדרה. הגדירי בשרת: ADMIN_SESSION_SECRET (24+ תווים בפרודקשן, או ADMIN_ACCESS_KEY 16+), ADMIN_USERNAME ו־ADMIN_PASSWORD חזק.",
    en: "Admin sign-in is not configured. Set ADMIN_SESSION_SECRET (24+ characters on Vercel production, or legacy ADMIN_ACCESS_KEY 16+), ADMIN_USERNAME, and a strong ADMIN_PASSWORD on the server.",
  },
  loginIntro: {
    he: "התחברי עם שם המשתמש והסיסמה מהסביבה (קובץ env).",
    en: "Sign in with the operator username and password from your environment.",
  },
  loginUsername: { he: "שם משתמש", en: "Username" },
  loginPassword: { he: "סיסמה", en: "Password" },
  loginContinue: { he: "המשך", en: "Continue" },
  loginSigningIn: { he: "מתחברת…", en: "Signing in…" },
  loginErrorGeneric: {
    he: "לא ניתן להתחבר. בדקי את הפרטים ונסי שוב מאוחר יותר.",
    en: "Unable to sign in. Check your credentials and try again later.",
  },
  loginErrorServerConfig: {
    he: "כניסת מנהלות לא הוגדרה כראוי. הגדירי בשרת: ADMIN_SESSION_SECRET, ADMIN_USERNAME ו־ADMIN_PASSWORD.",
    en: "Admin sign-in is not configured correctly. Set ADMIN_SESSION_SECRET, ADMIN_USERNAME, and ADMIN_PASSWORD on the server.",
  },

  layoutNotConfigured: {
    he: "הניהול לא מוגדר. בפרודקשן Vercel יש להגדיר DATABASE_URL, NEXT_PUBLIC_SITE_URL, ADMIN_SESSION_SECRET (מומלץ 24+ תווים), ADMIN_PASSWORD חזק (ראי מדיניות בסיסמה), ואופציונלית ADMIN_USERNAME (ברירת מחדל admin).",
    en: "Admin is not configured. On Vercel production, set DATABASE_URL, NEXT_PUBLIC_SITE_URL, ADMIN_SESSION_SECRET (24+ characters recommended), a strong ADMIN_PASSWORD (see password policy in server logs in development), and optionally ADMIN_USERNAME (defaults to admin).",
  },

  errorTitle: { he: "משהו השתבש", en: "Something went wrong" },
  errorFallback: { he: "אירעה שגיאה לא צפויה באזור הניהול.", en: "An unexpected error occurred in the admin area." },
  errorRetry: { he: "נסי שוב", en: "Try again" },

  loadingAdmin: { he: "טוען ניהול…", en: "Loading admin…" },

  dashTitle: { he: "לוח בקרה", en: "Dashboard" },
  dashNoDbMuted: {
    he: "חברי את DATABASE_URL ל־Neon כדי לפתוח מדדים חיים. לידים מקובץ עדיין עובדים ללכידה מקומית בלי מסד.",
    en: "Connect DATABASE_URL to Neon to unlock live metrics. File-based leads still work for local capture without a database.",
  },
  dashCardDbNotConnected: { he: "לא מחובר", en: "Not connected" },
  dashCardDatabase: { he: "מסד נתונים", en: "Database" },
  dashLiveMuted: {
    he: "תמונת מצב חיה · אזור זמן Asia/Jerusalem ללוח זמנים",
    en: "Live snapshot · timezone Asia/Jerusalem for scheduling",
  },
  dashCardNewLeads: { he: "לידים חדשים", en: "New leads" },
  dashCardBookingRequests: { he: "בקשות הזמנה", en: "Booking requests" },
  dashCardNewsletterActive: { he: "ניוזלטר (פעילים)", en: "Newsletter (active)" },
  dashCardContactInquiries: { he: "פניות קשר", en: "Contact inquiries" },
  dashCardUpcomingSchedules: { he: "מועדים קרובים", en: "Upcoming schedules" },
  dashRecentActivity: { he: "פעילות אחרונה", en: "Recent admin activity" },
  dashNoAudit: {
    he: "אין רישומי ביקורת עדיין. פעולות מניהול זה יופיעו כאן.",
    en: "No audit entries yet. Actions from this admin will appear here.",
  },
  dashViewAudit: { he: "יומן ביקורת מלא ←", en: "View full audit log →" },

  dbConnectNewsletter: {
    he: "חברי DATABASE_URL כדי לנהל מנויים ב־Neon.",
    en: "Connect DATABASE_URL to manage subscribers stored in Neon.",
  },
  newsletterTitle: { he: "ניוזלטר", en: "Newsletter" },
  newsletterSubtitle: {
    he: "אימיילים ייחודיים · הרשמה אחרונה מעדכנת את שורת המנוי.",
    en: "Unique emails · latest signup updates the subscriber row.",
  },

  dbConnectBookings: {
    he: "חברי DATABASE_URL כדי לנהל בקשות הזמנה מ־Neon.",
    en: "Connect DATABASE_URL to manage booking requests from Neon.",
  },
  bookingsTitle: { he: "הזמנות", en: "Bookings" },
  bookingsPipelineMuted: {
    he: "תהליך: חדש → נוצר קשר → הוזמן → הושלם / בוטל · אזור זמן",
    en: "Pipeline: new → contacted → booked → completed / cancelled · timezone",
  },
  bookingsColService: { he: "שירות", en: "Service" },
  bookingsColCustomer: { he: "לקוחה", en: "Customer" },
  bookingsColSlot: { he: "משבצת", en: "Slot" },
  bookingsColQuick: { he: "מהיר", en: "Quick" },
  bookingsColNotes: { he: "הערות", en: "Notes" },
  bookingsStatusAria: { he: "סטטוס הזמנה", en: "Booking status" },
  bookingsWhatsApp: { he: "וואטסאפ", en: "WhatsApp" },
  bookingsCall: { he: "שיחה", en: "Call" },
  bookingsEmail: { he: "אימייל", en: "Email" },
  bookingsInternalNotesBtn: { he: "שמירת הערות פנימיות", en: "Save internal notes" },
  bookingsCustomerNotes: { he: "לקוחה:", en: "Customer:" },

  dbConnectSchedule: {
    he: "חברי DATABASE_URL כדי לנהל זמני שיעורים ב־Neon.",
    en: "Connect DATABASE_URL to manage lesson times in Neon.",
  },
  scheduleTitle: { he: "לוח זמנים", en: "Schedule" },
  scheduleSubtitle: {
    he: "אימות לפי אזור זמן Asia/Jerusalem לסדר יום זהה להתחלה/סיום.",
    en: "Validation uses timezone Asia/Jerusalem for same-day start/end ordering.",
  },

  dbConnectAudit: {
    he: "חברי DATABASE_URL כדי לשמור היסטוריית שינויים במנהל.",
    en: "Connect DATABASE_URL to persist admin mutation history.",
  },
  auditTitle: { he: "יומן ביקורת", en: "Audit log" },
  auditSubtitle: {
    he: "שינויים שמקורם בפעולות מנהל (ללא תוכן גולמי של לידים).",
    en: "Changes originating from admin actions (no raw lead payloads).",
  },
  auditEmpty: { he: "אין רישומים עדיין.", en: "No entries yet." },

  dbConnectUsers: {
    he: "חברי DATABASE_URL כדי להציג חשבונות ציבוריים עתידיים.",
    en: "Connect DATABASE_URL to list future public accounts.",
  },
  usersTitle: { he: "משתמשים", en: "Users" },
  usersSubtitle: {
    he: "טבלת משתמשים ציבוריים (מוכן לעת הוספת אימות ציבורי).",
    en: "Public user accounts table (ready for when you add public auth).",
  },
  usersEmpty: {
    he: "אין משתמשים עדיין. הסכמה וה־API מוכנים כשתוסיפי אימות ציבורי.",
    en: "No users yet. Schema and API are prepared for when you add public auth.",
  },

  dbConnectBlog: {
    he: "חברי DATABASE_URL כדי לעקוב אחרי פוסטים לצד MDX.",
    en: "Connect DATABASE_URL to track posts alongside MDX.",
  },
  blogTitle: { he: "בלוג (רישום מנהל)", en: "Blog (admin registry)" },

  dbConnectSettings: {
    he: "חברי DATABASE_URL כדי לשמור הגדרות אתר ב־Neon.",
    en: "Connect DATABASE_URL to persist site settings in Neon.",
  },
  settingsTitle: { he: "הגדרות", en: "Settings" },
  settingsSubtitle: {
    he: "אחסון מפתח/ערך JSON לערוצי קשר, כתובת בסיס SEO ודגלי תכונה.",
    en: "Key/value JSON store for contact channels, SEO base URL, and feature flags.",
  },

  dbConnectContent: {
    he: "חברי DATABASE_URL כדי לשמור בלוקי שיווק לעריכה.",
    en: "Connect DATABASE_URL to store editable marketing blocks.",
  },
  contentTitle: { he: "תוכן", en: "Content" },

  dbConnectServices: {
    he: "חברי DATABASE_URL כדי לנהל פריטי קטלוג דו־לשוניים.",
    en: "Connect DATABASE_URL to manage bilingual catalog entries.",
  },
  servicesTitle: { he: "שירותים / שיעורים", en: "Services / lessons" },
  servicesSubtitle: {
    he: "כותרות וטקסט דו־לשוני · לא מחליף את קטלוג ההזמנה הסטטי עד שייחבר.",
    en: "Bilingual titles and copy · does not replace static booking catalog until wired.",
  },

  systemTitle: { he: "מערכת", en: "System" },
  systemHint: {
    he: "מצב פריסה ואחסון (ללא הצגת סודות).",
    en: "Deployment health and storage (no secrets shown).",
  },
  systemDbCheck: {
    he: "בדקי DATABASE_URL ושהמיגרציות הופעלו.",
    en: "Check DATABASE_URL and that migrations have been applied.",
  },
  systemNoAuditRows: { he: "אין שורות ביקורת עדיין.", en: "No audit rows yet." },
  systemSectionDatabase: { he: "מסד נתונים", en: "Database" },
  systemSectionLeadStorage: { he: "אחסון לידים", en: "Lead storage" },
  systemSectionLastAudit: { he: "יומן ביקורת אחרון", en: "Last audit log" },
  systemSectionBuild: { he: "בנייה", en: "Build" },
  systemConnected: { he: "מחובר:", en: "Connected:" },
  systemYes: { he: "כן", en: "Yes" },
  systemNo: { he: "לא", en: "No" },
  systemActiveDriver: { he: "מנהל פעיל:", en: "Active driver:" },
  systemAction: { he: "פעולה:", en: "Action:" },
  systemWhen: { he: "מתי:", en: "When:" },
  systemActor: { he: "מבצעת:", en: "Actor:" },
  systemId: { he: "מזהה:", en: "Id:" },
  systemAppVersion: { he: "גרסת אפליקציה:", en: "App version:" },
  systemGit: { he: "Git (Vercel):", en: "Git (Vercel):" },
  systemEnvironment: { he: "סביבה:", en: "Environment:" },

  leadsTitle: { he: "לידים", en: "Leads" },
  leadsMeta: {
    he: "ייצוא CSV, סינון לפי תאריך וסוג.",
    en: "CSV export, filter by date and type.",
  },
  leadsExportCsv: { he: "ייצוא CSV", en: "Export CSV" },
  leadsFilterFrom: { he: "מתאריך", en: "From" },
  leadsFilterTo: { he: "עד תאריך", en: "To" },
  leadsFilterType: { he: "סוג", en: "Type" },
  leadsFilterAll: { he: "הכול", en: "All" },
  leadsEmpty: { he: "אין שורות שמתאימות למסננים.", en: "No rows match these filters." },

  newsletterSearchEmail: { he: "חיפוש אימייל", en: "Search email" },
  newsletterPlaceholder: { he: "מכיל…", en: "contains…" },
  newsletterExport: { he: "ייצוא CSV", en: "Export CSV" },
  newsletterNoMatch: { he: "אין מנויים שמתאימים לחיפוש.", en: "No subscribers match this search." },
  newsletterColEmail: { he: "אימייל", en: "Email" },
  newsletterColSource: { he: "מקור", en: "Source" },
  newsletterColLang: { he: "שפה", en: "Lang" },
  newsletterColSubscribed: { he: "נרשם", en: "Subscribed" },
  newsletterColStatus: { he: "סטטוס", en: "Status" },

  bookingsExport: { he: "ייצוא CSV", en: "Export CSV" },
  bookingsEmpty: { he: "אין בקשות הזמנה במסד עדיין.", en: "No booking requests in the database yet." },
  bookingsColWhen: { he: "מתי", en: "When" },
  bookingsColContact: { he: "קשר", en: "Contact" },
  bookingsColTz: { he: "אזור זמן", en: "Timezone" },
  bookingsColStatus: { he: "סטטוס", en: "Status" },
  bookingsRef: { he: "אסמכתא", en: "Ref" },

  scheduleFilterFrom: { he: "הצגה מתאריך", en: "Show from date" },
  scheduleEmptyNoService: {
    he: "צרי לפחות שירות אחד לפני הוספת לוח זמנים.",
    en: "Create at least one service before adding schedules.",
  },
  scheduleEmptyNoRows: { he: "אין שורות קרובות למסנן הזה.", en: "No upcoming rows for this filter." },
  scheduleColDate: { he: "תאריך", en: "Date" },
  scheduleColStart: { he: "התחלה", en: "Start" },
  scheduleColEnd: { he: "סיום", en: "End" },
  scheduleColCap: { he: "קיבולת", en: "Cap" },
  scheduleColLoc: { he: "מיקום", en: "Location" },

  servicesEmpty: {
    he: "אין שורות קטלוג עדיין. הריצי seed או צרי אחת למעלה.",
    en: "No catalog rows yet. Seed the database or create one above.",
  },
  servicesColSlug: { he: "סלאג", en: "Slug" },
  servicesColTitleHe: { he: "כותרת (עברית)", en: "Title (HE)" },
  servicesColTitleEn: { he: "כותרת (אנגלית)", en: "Title (EN)" },
  servicesColActive: { he: "פעיל", en: "Active" },
  servicesColBookable: { he: "ניתן להזמנה", en: "Bookable" },

  settingsValuesHint: {
    he: "ערכים יכולים להיות JSON (מספרים/בוליאניים/אובייקטים) או טקסט פשוט.",
    en: "Values accept JSON (numbers/booleans/objects) or plain text.",
  },
  settingsNoRows: { he: "אין שורות עדיין. השתמשי בערכי ברירת מחדל למעלה או ב־seed.", en: "No rows yet. Use presets above or seed the database." },
  settingsColKey: { he: "מפתח", en: "Key" },
  settingsColValue: { he: "ערך", en: "Value" },

  blogRegistryHint: {
    he: "רישום מנהל לפוסטים שמקורם ב־MDX (סטטוס ותאריך עדכון).",
    en: "Admin registry for MDX posts (status and updated date).",
  },
  blogEmpty: { he: "אין שורות רישום עדיין.", en: "No registry rows yet." },
  blogColSlug: { he: "סלאג", en: "Slug" },
  blogColTitleHe: { he: "כותרת עברית", en: "Title HE" },
  blogColTitleEn: { he: "כותרת אנגלית", en: "Title EN" },
  blogColStatus: { he: "סטטוס", en: "Status" },
  blogColUpdated: { he: "עודכן", en: "Updated" },

  contentHint: {
    he: "דפי שיווק עם מזהה יציב; לא מחליף את דפי האתר הסטטיים עד שייחבר.",
    en: "Marketing pages with stable ids; does not replace static site pages until wired.",
  },
  contentEmpty: { he: "אין דפי תוכן עדיין.", en: "No content pages yet." },

  auditColWhen: { he: "מתי", en: "When" },
  auditColActor: { he: "מבצעת", en: "Actor" },
  auditColAction: { he: "פעולה", en: "Action" },
  auditColEntity: { he: "ישות", en: "Entity" },
  auditColDetail: { he: "פירוט", en: "Detail" },
  auditColPayload: { he: "מטען", en: "Payload" },
  auditTrailMuted: {
    he: "שביל בלתי ניתן לשינוי של פעולות מנהל.",
    en: "Immutable trail of admin actions.",
  },
  auditBackDashboard: { he: "חזרה ללוח בקרה", en: "Back to dashboard" },

  usersColEmail: { he: "אימייל", en: "Email" },
  usersColName: { he: "שם", en: "Name" },
  usersColRole: { he: "תפקיד", en: "Role" },
  usersColStatus: { he: "סטטוס", en: "Status" },
  usersColLastLogin: { he: "כניסה אחרונה", en: "Last login" },

  leadsLabelType: { he: "סוג", en: "Type" },
  leadsLabelStatus: { he: "סטטוס", en: "Status" },
  leadsLabelSourceContains: { he: "מקור מכיל", en: "Source contains" },
  leadsLabelFrom: { he: "מתאריך", en: "From" },
  leadsLabelTo: { he: "עד תאריך", en: "To" },
  leadsOptionAll: { he: "הכול", en: "All" },
  leadsOptionBooking: { he: "הזמנה", en: "Booking" },
  leadsOptionNewsletter: { he: "ניוזלטר", en: "Newsletter" },
  leadsOptionContact: { he: "קשר", en: "Contact" },
  leadsPlaceholderSource: { he: "למשל /contact", en: "e.g. /contact" },
  leadsColCreated: { he: "נוצר", en: "Created" },
  leadsColType: { he: "סוג", en: "Type" },
  leadsColSummary: { he: "תקציר", en: "Summary" },
  leadsColDetails: { he: "פרטים", en: "Details" },
  leadsColStatus: { he: "סטטוס", en: "Status" },
  leadsStatusAria: { he: "סטטוס ליד", en: "Lead status" },
  leadsNounBookings: { he: "הזמנות", en: "bookings" },
  leadsNounNewsletters: { he: "ניוזלטר", en: "newsletters" },
  leadsNounContacts: { he: "פניות קשר", en: "contacts" },
} as const satisfies Record<string, Bilingual>;

export type AdminPanelKey = keyof typeof adminPanel;

export function adminT(key: AdminPanelKey, lang: Language): string {
  return adminPanel[key][lang];
}

/** Nav items: href + i18n key */
export const ADMIN_NAV_ITEMS = [
  { href: "/admin", key: "navOverview" },
  { href: "/admin/leads", key: "navLeads" },
  { href: "/admin/bookings", key: "navBookings" },
  { href: "/admin/schedule", key: "navSchedule" },
  { href: "/admin/services", key: "navServices" },
  { href: "/admin/newsletter", key: "navNewsletter" },
  { href: "/admin/content", key: "navContent" },
  { href: "/admin/blog", key: "navBlog" },
  { href: "/admin/users", key: "navUsers" },
  { href: "/admin/system", key: "navSystem" },
  { href: "/admin/settings", key: "navSettings" },
  { href: "/admin/audit", key: "navAudit" },
] as const satisfies ReadonlyArray<{ href: string; key: AdminPanelKey }>;
