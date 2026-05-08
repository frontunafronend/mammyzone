import type { BlogCategory } from "@/lib/blog/categories";
import { unsplashCuratedPhotoIds as U } from "@/lib/media/sources";
import { dedupeSources, unsplashPhoto } from "@/lib/media/unsplash";
import type { Bilingual } from "@/types";

export type ServiceFaqItem = { q: Bilingual; a: Bilingual };

export type ServiceProcessStep = { title: Bilingual; body: Bilingual };

export type ServicePageVisual = {
  alt: Bilingual;
  sources: readonly string[];
};

type CuratedPhotoKey = keyof typeof U;

function serviceVisual(
  ids: readonly CuratedPhotoKey[],
  width: number,
  alt: Bilingual,
): ServicePageVisual {
  const sources = dedupeSources(ids.map((id) => unsplashPhoto(U[id], width)));
  return { alt, sources };
}

export type ServicePageDefinition = {
  slug: ServicePageSlug;
  metaTitle: Bilingual;
  metaDescription: Bilingual;
  schemaName: Bilingual;
  schemaServiceType: string;
  heroEyebrow: Bilingual;
  heroTitle: Bilingual;
  heroSub: Bilingual;
  /** Hero column — subject-related Unsplash stack + bilingual alt. */
  heroVisual: ServicePageVisual;
  /** Wide editorial image after the problem section. */
  midVisual: ServicePageVisual;
  problemTitle: Bilingual;
  problemBody: Bilingual;
  benefitsTitle: Bilingual;
  benefits: Bilingual[];
  whoTitle: Bilingual;
  whoItems: Bilingual[];
  processTitle: Bilingual;
  processSteps: ServiceProcessStep[];
  trustTitle: Bilingual;
  trustBullets: Bilingual[];
  faqs: ServiceFaqItem[];
  relatedBlogCategories: BlogCategory[];
};

export const SERVICE_PAGE_SLUGS = [
  "yoga-after-birth",
  "pregnancy-yoga",
  "baby-massage",
  "nlp-for-mothers",
  "postpartum-recovery",
  "workshops",
] as const;

export type ServicePageSlug = (typeof SERVICE_PAGE_SLUGS)[number];

const b = (he: string, en: string): Bilingual => ({ he, en });

const SERVICE_PAGES: Record<ServicePageSlug, ServicePageDefinition> = {
  "yoga-after-birth": {
    slug: "yoga-after-birth",
    metaTitle: b("יוגה אחרי לידה — MammyZone", "Postnatal yoga — MammyZone"),
    metaDescription: b(
      "שיעורי יוגה רכים אחרי לידה: נשימה, רצפה, וגבולות בגוף שעדיין מתאושש. קביעה או שיחה עדינה.",
      "Gentle postnatal yoga: breath, pelvic floor, and boundaries while your body still recovers. Book or talk softly.",
    ),
    schemaName: b("יוגה לאחר לידה", "Postnatal yoga"),
    schemaServiceType: "Postnatal yoga classes and private sessions",
    heroEyebrow: b("אחרי לידה", "After birth"),
    heroTitle: b("יוגה שמכבדת את הקצב החדש של הגוף", "Yoga that honors your body’s new tempo"),
    heroSub: b(
      "בלי להשוות ל״לפני״, בלי לאלץ גמישות. מקום לנשום, להרגיש רצפה, ולחזור הביתה אליך.",
      "No comparing to “before,” no forcing flexibility. Room to breathe, feel your floor, and come home to yourself.",
    ),
    heroVisual: serviceVisual(
      ["momBaby", "stretch", "heroYoga"],
      1600,
      b(
        "אמא ותינוק באווירה רכה — מגע ויוגה עדינה אחרי לידה",
        "Mother and baby in a soft mood — gentle touch and postnatal yoga",
      ),
    ),
    midVisual: serviceVisual(
      ["meditate", "yogaWindow", "momBaby"],
      1400,
      b("אור חלון ונשימה — מרחב שקט לפני חזרה ליום", "Window light and breath — quiet before returning to the day"),
    ),
    problemTitle: b("כשהגוף זר והלב עייף", "When the body feels foreign and the heart is tired"),
    problemBody: b(
      "אחרי לידה הכול משתנה — שינה, הורמונים, עומס אהבה שכבד על הכתפיים. לפעמים גם השטיח מרגיש רחוק. כאן לא מחפשים ״החזרה למצב קודם״ — אלא חיבור מחדש למה שיש היום, בנשימה ובתנועה קטנה שמספיקה.",
      "After birth everything shifts — sleep, hormones, love that weighs on the shoulders. Sometimes even the mat feels far. Here we don’t chase “back to before” — we reconnect to what exists today, in breath and small movement that is enough.",
    ),
    benefitsTitle: b("מה מחכה לך בשיעור", "What waits for you in practice"),
    benefits: [
      b("נשימה שמרחיבה את הצלעות בלי להילחץ על בטן ״שטוחה״.", "Breath that widens the ribs without chasing a “flat” belly."),
      b("תנוחות שמכבדות רצפת אגן, גב, וידיים שנושאות.", "Shapes that respect pelvic floor, back, and arms that carry."),
      b("קצב קבוצה קטנה או שיעור פרטי — לפי מה שנכון לך.", "Small group rhythm or private — whatever feels right."),
    ],
    whoTitle: b("למי זה מתאים", "Who this is for"),
    whoItems: [
      b("אמהות בשבועות ובחודשים הראשונים אחרי לידה.", "Mothers in the first weeks and months after birth."),
      b("מי שמרגישה שהגוף ״לא שלה״ או שחוששת מכאבים.", "Anyone who feels the body “isn’t hers” or worries about pain."),
      b("גם אם לא עשית יוגה לפני — מתחילים מהשטיח שלך.", "Even without prior yoga — we begin from your mat."),
    ],
    processTitle: b("איך נראה מפגש", "What a session looks like"),
    processSteps: [
      {
        title: b("פתיחה", "Arrival"),
        body: b("שיחה קצרה — איך את היום, מה הגוף מבקש.", "A short check-in — how you are, what the body is asking."),
      },
      {
        title: b("נשימה וחימום", "Breath & warm-up"),
        body: b("תנועה עדינה, בלי להגיע לקצה.", "Gentle movement, without chasing edges."),
      },
      {
        title: b("תנוחות נבחרות", "Selected shapes"),
        body: b("לפי שלב ההחלמה והיכולת שלך באותו יום.", "According to recovery stage and capacity that day."),
      },
      {
        title: b("סיום רך", "Soft close"),
        body: b("שכיבה או ישיבה — מרחב לשקט לפני שחוזרות החוצה.", "Rest or seat — quiet before returning outward."),
      },
    ],
    trustTitle: b("בטיחות ומקצועיות", "Safety & training"),
    trustBullets: [
      b("ליווי מקצועי עם הקשבה לרצפת אגן ולשיקום.", "Professional guidance attentive to pelvic floor and recovery."),
      b("שפה גוף־נפש — בלי ביקורת.", "Body–mind language — without judgment."),
      b("אפשר לשלב עם פיזיותרפיה / ייעוץ רפואי.", "Can complement physiotherapy / medical advice."),
    ],
    faqs: [
      {
        q: b("מתי אפשר להתחיל?", "When can I start?"),
        a: b("לאחר אישור רופא וכשמרגישים מוכנות — בדרך כלל מהשבועות הראשונים ברכות.", "After medical clearance and when you feel ready — often gently from early weeks."),
      },
      {
        q: b("מה אם אני מניקה בין השיעורים?", "What if I’m nursing between classes?"),
        a: b("מתאימים תנוחות וזמנים — אין צורך ״להחזיק״ את הגוף.", "We adapt poses and timing — no need to “hold” the body."),
      },
      {
        q: b("קבוצה או פרטי?", "Group or private?"),
        a: b("יש את שני המסלולים — נבחר יחד לפי רגישות וזמינות.", "Both exist — we choose together by sensitivity and schedule."),
      },
    ],
    relatedBlogCategories: ["postpartum", "yoga"],
  },
  "pregnancy-yoga": {
    slug: "pregnancy-yoga",
    metaTitle: b("יוגה בהריון — MammyZone", "Prenatal yoga — MammyZone"),
    metaDescription: b(
      "יוגה רכה לפי שלבי הריון: אגן, נשימה, ותמיכה בלב שמתרחב. MammyZone עם אורטל חזן.",
      "Soft yoga by trimester: pelvis, breath, and support for your widening heart. MammyZone with Ortal Hazan.",
    ),
    schemaName: b("יוגה בהריון", "Prenatal yoga"),
    schemaServiceType: "Prenatal yoga classes and private sessions",
    heroEyebrow: b("הריון", "Pregnancy"),
    heroTitle: b("מקום לגוף שמשתנה כל שבוע", "Space for a body that changes every week"),
    heroSub: b(
      "בלי להתחרות עם אינסטגרם, בלי לכפות עומס. נשימה, יציבות, וקשב לרצפת אגן ולגב.",
      "No racing Instagram, no forced load. Breath, stability, and care for pelvic floor and back.",
    ),
    heroVisual: serviceVisual(
      ["stretch", "yogaWindow", "heroYoga"],
      1600,
      b("יוגה עדינה באור רך — מתאים לגוף בהריון", "Gentle yoga in soft light — honoring pregnancy"),
    ),
    midVisual: serviceVisual(
      ["momBaby", "journalZen", "yogaWindow"],
      1400,
      b("הקשבה ומרווח — מקום לגוף שמשתנה כל שבוע", "Space and cushion — room for a body that shifts each week"),
    ),
    problemTitle: b("כשהכל נראה כבד", "When everything feels heavy"),
    problemBody: b(
      "הריון מביא שאלות — מה מותר, מה מפחיד, איך לישון. שיעור טוב לא ״מתfix״ אותך — הוא נותן שפה לגוף: איפה להרפות, איפה לתמוך, איך לנשום כשהבטן גדלה.",
      "Pregnancy brings questions — what’s allowed, what scares you, how to sleep. A good class doesn’t “fix” you — it gives the body language: where to soften, how to support, how to breathe as the belly grows.",
    ),
    benefitsTitle: b("למה זה שונה מכושר כללי", "Why this isn’t generic fitness"),
    benefits: [
      b("התאמה לשליש — לא אותה תפריט לכולן.", "Trimester-aware sequencing — not one menu for all."),
      b("הדגשות לרצפת אגן, קשת כפות רגליים, וכתפיים.", "Emphasis on pelvic floor, foot arches, shoulders."),
      b("אווירה שקטה — מותר לעצור, לשתות, לשאול.", "Quiet room — pausing, water, and questions are welcome."),
    ],
    whoTitle: b("למי זה מתאים", "Who this is for"),
    whoItems: [
      b("בכל שלבי ההריון — עם התאמות אישיות.", "Across trimesters — with personal adaptations."),
      b("מי שמרגישה חרדה מספורט או מיוגה ״מהירה״.", "Anyone anxious about sport or “fast” yoga."),
      b("גם אם זו הפעם הראשונה על שטיח.", "Even if it’s your first time on a mat."),
    ],
    processTitle: b("מה קורה בשיעור", "What happens in class"),
    processSteps: [
      { title: b("התכנסות", "Gathering"), body: b("נשימה משותפת ושיחה קצרה.", "Shared breath and a short check-in.") },
      { title: b("פתיחת גוף", "Opening"), body: b("צוואר, כתפיים, ירכיים — בקצב איטי.", "Neck, shoulders, hips — slow tempo.") },
      { title: b("תנוחות עומדות וישיבה", "Standing & seat"), body: b("תמיכה בכיסא או קיר כשצריך.", "Chair or wall support when needed.") },
      { title: b("שכיבה וסיום", "Rest & close"), body: b("מנוחה צדדית או עם תמיכות — לפני שחוזרות ליום.", "Side rest or supported — before returning to the day.") },
    ],
    trustTitle: b("ליווי מקצועי", "Professional care"),
    trustBullets: [
      b("הקשבה לסימני אזהרה ולמגבלות אישיות.", "Attention to warning signs and personal limits."),
      b("שיחה פתוחה עם הרופאה שלך — אנחנו לא מחליפים רפואה.", "Open dialogue with your clinician — we don’t replace medicine."),
      b("חומרים מומלצים להמשך קריאה בבלוג.", "Blog resources for continued reading."),
    ],
    faqs: [
      { q: b("מה להביא לשיעור?", "What should I bring?"), a: b("בגד נוח, מים, ושמיכה קטנה אם אוהבות.", "Comfortable clothes, water, and a small blanket if you like.") },
      { q: b("אפשר באמצע הריון?", "Mid-pregnancy — ok?"), a: b("כן — מתאימים תנוחות לשלב.", "Yes — poses adapt to your stage.") },
      { q: b("יש שיעור פרטי?", "Private available?"), a: b("כן — ניתן לקבוע דרך עמוד ההזמנה.", "Yes — book via the booking page.") },
    ],
    relatedBlogCategories: ["pregnancy", "yoga"],
  },
  "baby-massage": {
    slug: "baby-massage",
    metaTitle: b("עיסוי תינוקות — MammyZone", "Baby massage — MammyZone"),
    metaDescription: b(
      "מגע עדין לתינוק ולאםה: שגרה מרגיעה, קשר, וכלים לימים עמוסים. MammyZone.",
      "Gentle touch for baby and mother: soothing routine, bonding, tools for full days. MammyZone.",
    ),
    schemaName: b("עיסוי תינוקות", "Infant massage instruction"),
    schemaServiceType: "Baby massage instruction for parents",
    heroEyebrow: b("מגע", "Touch"),
    heroTitle: b("ידיים שמלמדות שקט", "Hands that teach quiet"),
    heroSub: b(
      "עיסוי מובנה לא אלים — הוא שפה. לפעמים הוא עוזר לערב, לקירבה, ולרגע שבו גם את נושמת.",
      "Structured massage isn’t rough — it’s language. Sometimes it helps evenings, closeness, and a moment where you breathe too.",
    ),
    heroVisual: serviceVisual(
      ["momBaby", "circle", "meditate"],
      1600,
      b("מגע אמא־תינוק — חמימות, קירבה, שגרת לפני שינה", "Mother-baby touch — warmth, bonding, a pre-sleep rhythm"),
    ),
    midVisual: serviceVisual(
      ["meal", "momBaby", "journalZen"],
      1400,
      b("רגע שקט בבית — ארוחה ונוכחות משותפת", "A quiet moment at home — meal and shared presence"),
    ),
    problemTitle: b("כשהערב נמתח", "When the evening stretches thin"),
    problemBody: b(
      "בכי, עייפות, תחושת אשמה על ״לא מספיק״. שיעור עיסוי נותן פריים: זמן קצר, מגע ברור, והרבה חיבוק לשניכם.",
      "Crying, fatigue, guilt about “not enough.” A massage session gives a frame: short time, clear touch, and tenderness for both of you.",
    ),
    benefitsTitle: b("מה תקבלי מהמפגש", "What you receive"),
    benefits: [
      b("שגרת מגע שאפשר לחזור עליה בבית.", "A touch routine you can repeat at home."),
      b("הקשבה לתינוק שלך — לא ל״תבנית״ גנרית.", "Listening to your baby — not a generic template."),
      b("מקום לאםה שגם היא זקוקה למילה טובה.", "Space for a mother who also needs a kind word."),
    ],
    whoTitle: b("למי זה מתאים", "Who this is for"),
    whoItems: [
      b("תינוקות בשלבים שונים — עם התאמות.", "Babies at different stages — adapted."),
      b("אמהות שרוצות כלי רגוע לפני שינה.", "Mothers wanting a calmer pre-sleep tool."),
      b("זוגות / מטפלים שנוספים — אפשר לשלב.", "Partners / caregivers — can join when relevant."),
    ],
    processTitle: b("איך זה עובד", "How it works"),
    processSteps: [
      { title: b("היכרות", "Hello"), body: b("שאלות קצרות על תינוק ויום.", "Short questions about baby and day.") },
      { title: b("הדגמה", "Demo"), body: b("עיסוי שלב אחר שלב — את מחקה בקצב שלך.", "Step by step — you mirror at your pace.") },
      { title: b("תרגול", "Practice"), body: b("תיקונים קטנים וידיים רכות.", "Small corrections, soft hands.") },
      { title: b("סיכום", "Wrap"), body: b("דף או סרטון קצר להמשך בבית.", "Notes or short clip for home.") },
    ],
    trustTitle: b("בטיחות מגע", "Touch safety"),
    trustBullets: [
      b("ללא כפייה — אם התינוק לא במצב רוח, עוצרים.", "No forcing — if baby isn’t in the mood, we pause."),
      b("היגiene ונוחות חדר.", "Hygiene and room comfort."),
      b("המלצה לשאול את הייעוץ התינוקותי שלך כשיש חשש רפואי.", "Ask your pediatric clinician when there’s a medical concern."),
    ],
    faqs: [
      { q: b("מאיזה גיל?", "From what age?"), a: b("בדרך כלל מהשבועות הראשונים לאחר אישור — נבדוק יחד.", "Often from early weeks after clearance — we check together.") },
      { q: b("מה להביא?", "What to bring?"), a: b("חיתול, שמן מתאים אם קיים, ובגד נוח לתינוק.", "Diaper, suitable oil if you use one, comfy clothes for baby.") },
      { q: b("קבוצה או פרטי?", "Group or private?"), a: b("שניהם אפשריים — פרטים בקביעה.", "Both possible — details when booking.") },
    ],
    relatedBlogCategories: ["baby_care", "motherhood", "postpartum"],
  },
  "nlp-for-mothers": {
    slug: "nlp-for-mothers",
    metaTitle: b("NLP לאמהות — MammyZone", "NLP for mothers — MammyZone"),
    metaDescription: b(
      "ליווי שפה ודפוסים: גבולות, עומס, מעברים. מרחב בטוח לשאול בלי בושה. MammyZone.",
      "Language & pattern support: boundaries, overwhelm, transitions. A safe space to ask without shame. MammyZone.",
    ),
    schemaName: b("אימון NLP לאמהות", "NLP coaching for mothers"),
    schemaServiceType: "NLP-based coaching for mothers",
    heroEyebrow: b("שפה פנימית", "Inner language"),
    heroTitle: b("כשהמילים שאת אומרת לעצמך כבדות", "When the words you say to yourself feel heavy"),
    heroSub: b(
      "NLP כאן לא ״מתקן אישיות״ — הוא מציע כלים לשאול אחרת, לנשום לפני תגובה, ולבחור צעד קטן שמתאים לך.",
      "NLP here doesn’t “fix personality” — it offers tools to ask differently, breathe before reacting, and choose a small step that fits you.",
    ),
    heroVisual: serviceVisual(
      ["journalNlp", "journalZen", "meditate"],
      1600,
      b("עבודה שקטה — מחברת, מחשבה, מרחב פנימי", "Quiet work — notebook, thought, inner space"),
    ),
    midVisual: serviceVisual(
      ["journalZen", "circle", "journalNlp"],
      1400,
      b("מעגל נשים — שיחה וקשב בלי תחרות", "Women in circle — conversation and attention without competition"),
    ),
    problemTitle: b("עומס שאין לו כותרת", "Load without a headline"),
    problemBody: b(
      "״אני צריכה להספיק״, ״אסור ליפול״, ״מה יגידו״. לפעמים המשפטים האלה רצים ברקע בלי שמעירים. בשיחה אפשר לשמוע אותם — ולרכך אותם בלי לאבד אחריות.",
      "“I must keep up,” “I can’t fall,” “what will they say.” Sometimes these lines run in the background. In conversation we hear them — and soften them without losing responsibility.",
    ),
    benefitsTitle: b("מה אפשר להרוויח", "What you may gain"),
    benefits: [
      b("שאלות מדויקות שפותחות בחירה, לא ביקורת.", "Precise questions that open choice, not criticism."),
      b("כלים קצרים לימים עמוסים — גם בין משמרות.", "Short tools for full days — even between shifts."),
      b("פריים ברור — זמן שלך, בלי ערבוב עם ייעוץ פסיכולוגי.", "Clear frame — your time, not mixed with psychotherapy."),
    ],
    whoTitle: b("למי זה מתאים", "Who this is for"),
    whoItems: [
      b("אמהות במעברי תפקיד, שינוי עבודה, או עומס רגשי.", "Mothers in role shifts, job change, or emotional load."),
      b("מי שמרגישה ״תקועה״ בתבנית מחשבה.", "Anyone feeling “stuck” in a thought pattern."),
      b("גם בזום או פרונטלי — לפי נוחות.", "Video or in person — by comfort."),
    ],
    processTitle: b("איך נראה מפגש", "What a session looks like"),
    processSteps: [
      { title: b("מסגור", "Framing"), body: b("מה מבקשות מהמפגש — במילים פשוטות.", "What you want from the meeting — in simple words.") },
      { title: b("חקירה רכה", "Soft inquiry"), body: b("שאלות שמאירות דפוס בלי לשבור.", "Questions that illuminate a pattern without breaking.") },
      { title: b("ניסוי קטן", "Small experiment"), body: b("משהו לנסות עד הפעם הבאה — קטן ומדיד.", "Something to try until next time — small and measurable.") },
      { title: b("סגירה", "Close"), body: b("מה נשמר בגוף, מה נכתב ביומן אם תרצי.", "What stays in the body, what goes to a journal if you wish.") },
    ],
    trustTitle: b("גבולות מקצועיים", "Professional boundaries"),
    trustBullets: [
      b("לא טיפול נפשי קליני — אם צריך, נפנה למקור מתאים.", "Not clinical therapy — referral when needed."),
      b("סודיות וכבוד לקצב שלך.", "Confidentiality and respect for your pace."),
      b("שילוב עם יוגה/גוף אפשרי כשמתאים.", "Body/yoga integration when it fits."),
    ],
    faqs: [
      { q: b("כמה מפגשים?", "How many sessions?"), a: b("תלוי במטרה — לפעמים מספיק מפגש בודד, לפעמים סדרה קצרה.", "Depends on the goal — sometimes one, sometimes a short series.") },
      { q: b("בזום?", "Video?"), a: b("כן — כשזה נוח ופרטי.", "Yes — when convenient and private.") },
      { q: b("מה ההבדל מטיפול?", "Difference from therapy?"), a: b("NLP כאן ממוקד בשפה, דפוסים, ויעדים — לא אבחון קליני.", "Here NLP focuses on language, patterns, goals — not clinical diagnosis.") },
    ],
    relatedBlogCategories: ["nlp", "emotional_wellness", "motherhood"],
  },
  "postpartum-recovery": {
    slug: "postpartum-recovery",
    metaTitle: b("שיקום אחרי לידה — MammyZone", "Postpartum recovery — MammyZone"),
    metaDescription: b(
      "נשימה, עדינות, וקצב שמכבד מערכת עצבים אחרי לידה. מסלול רך ליד יוגה ומעגלים. MammyZone.",
      "Breath, tenderness, and tempo that honor the nervous system after birth. A gentle path with yoga and circles. MammyZone.",
    ),
    schemaName: b("שיקום לאחר לידה", "Postpartum recovery support"),
    schemaServiceType: "Postpartum recovery and gentle movement support",
    heroEyebrow: b("שיקום", "Recovery"),
    heroTitle: b("לאט זה לא חולשה — זה חכמה", "Slow is not weakness — it is wisdom"),
    heroSub: b(
      "אחרי לידה אין לוח זמנים אחיד. כאן מקשיבים לעייפות, לדופק, לדמעות בלי הסבר — ובונים מסלול שמתאים לך.",
      "After birth there is no single timeline. Here we listen to fatigue, pulse, tears without explanation — and build a path that fits you.",
    ),
    heroVisual: serviceVisual(
      ["meditate", "momBaby", "stretch"],
      1600,
      b("מנוחה ונשימה — שיקום רך אחרי לידה", "Rest and breath — gentle postpartum recovery"),
    ),
    midVisual: serviceVisual(
      ["circle", "yogaWindow", "momBaby"],
      1400,
      b("מעגל ויוגה באור רך — לא לבד עם השיקום", "Circle and yoga in soft light — not alone in recovery"),
    ),
    problemTitle: b("כשהגוף מבקש רק שקט", "When the body asks only for quiet"),
    problemBody: b(
      "לפעמים ״להתאושש״ נשמע כמו עוד משימה. שיקום רך מתחיל מהרשאה: מותר לשכב, מותר לבקש עזרה, מותר לבחור רק נשימה היום.",
      "Sometimes “recover” sounds like another task. Gentle recovery begins with permission: to lie down, to ask for help, to choose only breath today.",
    ),
    benefitsTitle: b("מה כולל המסע", "What the journey can include"),
    benefits: [
      b("יוגה עדינה ונשימה שמייצבת מערכת עצבים.", "Gentle yoga and breath that steadies the nervous system."),
      b("מעגלים קטנים — לא לבד עם השאלות.", "Small circles — not alone with the questions."),
      b("כלים לשינה, תזונה רכה, וגבולות — לפי הצורך.", "Tools for sleep, gentle nutrition, boundaries — as needed."),
    ],
    whoTitle: b("למי זה מתאים", "Who this is for"),
    whoItems: [
      b("אחרי לידה רגילה או מורכבת — כל סיפור מכובד.", "After straightforward or complex birth — every story honored."),
      b("מי שמרגישה שהיא ״אמורה כבר״ ולא כן.", "Anyone who feels she “should already” and doesn’t."),
      b("גם אם עבר זמן מהלידה — עדיין רלוונטי.", "Even if time has passed — still relevant."),
    ],
    processTitle: b("תהליל טיפוסי", "A typical arc"),
    processSteps: [
      { title: b("שיחת התאמה", "Fit call"), body: b("מה קורה עכשיו, מה מפחיד, מה עוזר.", "What’s happening now, what scares you, what helps.") },
      { title: b("מפגשי גוף", "Body meetings"), body: b("יוגה / נשימה — בקצב שמתאים לשיקום.", "Yoga / breath — at a pace that fits recovery.") },
      { title: b("מעקב", "Follow-up"), body: b("שינויים קטנים בין מפגשים.", "Small shifts between sessions.") },
    ],
    trustTitle: b("בטיחות רגשית", "Emotional safety"),
    trustBullets: [
      b("שפה לא שופטת — גם כשקשה.", "Non-judging language — even when it’s hard."),
      b("הפניה מקצועית כשצריך.", "Professional referral when needed."),
      b("חיבור לתכנים מהבלוג על מערכת עצבים.", "Links to blog writing on the nervous system."),
    ],
    faqs: [
      { q: b("מתי להתחיל?", "When to start?"), a: b("לאחר שחרור ואישור — נבנה יחד.", "After discharge and clearance — we build together.") },
      { q: b("יש קבוצה?", "Is there a group?"), a: b("כן — מעגלים לפי תאריכים; ראו גם סדנאות.", "Yes — circles by date; see workshops too.") },
      { q: b("מה אם אני בוכה בשיעור?", "What if I cry in class?"), a: b("זה מוכר ומותר — המרחב נשאר רך.", "It’s known and allowed — the room stays soft.") },
    ],
    relatedBlogCategories: ["postpartum", "breathing", "yoga"],
  },
  workshops: {
    slug: "workshops",
    metaTitle: b("סדנאות ומעגלים — MammyZone", "Workshops & circles — MammyZone"),
    metaDescription: b(
      "מעגלים חיים, סדנאות עומק, ויום ריטריט — מרחב נשי מקודש. MammyZone עם אורטל חזן.",
      "Live circles, deep workshops, and day retreats — a sacred women’s container. MammyZone with Ortal Hazan.",
    ),
    schemaName: b("סדנאות וריטריטים", "Workshops and retreats"),
    schemaServiceType: "Women's wellness workshops and retreats",
    heroEyebrow: b("ביחד", "Together"),
    heroTitle: b("כשהחדר מלא נשימה אחת", "When the room holds one breath"),
    heroSub: b(
      "סדנה טובה לא ״ממלאת את היומן״ — היא נותנת לך להרגיש שאת לא לבד עם מה שעובר עליך.",
      "A good workshop doesn’t “fill the calendar” — it lets you feel you’re not alone with what moves through you.",
    ),
    heroVisual: serviceVisual(
      ["circle", "meal", "journalZen"],
      1600,
      b("מעגל נשים וארוחה משותפת — סדנה וריטריט", "Women’s circle and shared meal — workshop and retreat"),
    ),
    midVisual: serviceVisual(
      ["momBaby", "circle", "meal"],
      1400,
      b("קהילה ומגע רך — מרחב נשי משותף", "Community and soft touch — a shared women’s space"),
    ),
    problemTitle: b("כשהבית צפוף והלב צריך קהילה", "When home feels tight and the heart needs community"),
    problemBody: b(
      "מעגלים קטנים, ארוחה משותפת, נשימה ומגע מודרכים. הכול בקצב שמכבד עייפות — אפשר גם לשבת ולהקשיב.",
      "Small circles, shared meal, guided breath and touch. Everything honors fatigue — you may also sit and listen.",
    ),
    benefitsTitle: b("למה להגיע", "Why come"),
    benefits: [
      b("חיבור לאמהות אחרות בלי תחרות.", "Connection to other mothers without competition."),
      b("חומרים מעשיים לקחת הביתה.", "Practical pieces to take home."),
      b("תאריכים מוגבלים — מקומות נשמרים בעדינות.", "Limited dates — seats held gently."),
    ],
    whoTitle: b("למי זה מתאים", "Who this is for"),
    whoItems: [
      b("אמהות שמחפשות מגע קבוצתי אמיתי.", "Mothers seeking real group contact."),
      b("מי שרוצה יום אחד שלא רק ״לייצר״.", "Anyone wanting one day not only “producing.”"),
      b("גם אם זו הפעם הראשונה בריטריט.", "Even if it’s your first retreat day."),
    ],
    processTitle: b("מה קורה ביום", "What happens on the day"),
    processSteps: [
      { title: b("התקבצות", "Arrival"), body: b("תה, שיחה רכה, חיבור לחדר.", "Tea, soft talk, settling into the space.") },
      { title: b("מעגל", "Circle"), body: b("נשימה, שאלות, מגע מודרך לפי נוחות.", "Breath, questions, guided touch by comfort.") },
      { title: b("ארוחה", "Meal"), body: b("שולחן משותף — גם שקט הוא מקום.", "Shared table — silence is also a seat.") },
      { title: b("סגירה", "Closing"), body: b("ברכה קצרה ולפעמים מכתב לעצמך.", "Short blessing and sometimes a letter to yourself.") },
    ],
    trustTitle: b("מקצועיות ומסגרת", "Holding & professionalism"),
    trustBullets: [
      b("מספר משתתפות מוגבל לשמירה על בטיחות רגשית.", "Limited numbers for emotional safety."),
      b("הסברים על מגע — תמיד בהסכמה.", "Touch explained — always with consent."),
      b("פרטים על תאריכים בעמוד ההזמנה.", "Dates on the booking flow."),
    ],
    faqs: [
      { q: b("איך נרשמים?", "How to register?"), a: b("דרך /book — בוחרות סדנה או ריטריט.", "Via /book — choose workshop or retreat.") },
      { q: b("מה עם הנקה?", "Nursing?"), a: b("מותר בכל מקום — יש פינות שקטות.", "Welcome anywhere — quiet corners available.") },
      { q: b("החזרים?", "Refunds?"), a: b("מדיניות מפורטת בעת הרכישה — נשמח לעזור בפרטי.", "Policy at purchase time — we help case by case.") },
    ],
    relatedBlogCategories: ["motherhood", "yoga", "postpartum"],
  },
};

export function getServiceDefinition(slug: ServicePageSlug): ServicePageDefinition {
  return SERVICE_PAGES[slug];
}

export function isServicePageSlug(s: string): s is ServicePageSlug {
  return (SERVICE_PAGE_SLUGS as readonly string[]).includes(s);
}
