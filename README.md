# طبقه منفی یک

وب‌سایت «طبقه منفی یک» — پلتفرم انتخاب، مقایسه و ارزیابی آموزش.

> **کمتر دوره بخر. بهتر انتخاب کن.**

رابط کاربری فارسی، RTL، dark-first و mobile-first: یک Hero سینمایی به‌همراه هفت صفحه‌
داخلی، با پیشنهاددهنده‌ای که واقعاً کار می‌کند — نه تصویر تزئینی.

---

## اجرا

```bash
npm install
npm run dev        # http://localhost:5173
```

| اسکریپت | کار |
| --- | --- |
| `npm run dev` | سرور توسعه |
| `npm run build` | typecheck + build پروداکشن |
| `npm run preview` | سرو کردن خروجی build |
| `npm run typecheck` | فقط بررسی تایپ‌ها |
| `npm run lint` | ESLint |
| `npm test` | تست‌های واحد (Vitest + Testing Library) |
| `npm run test:e2e` | تست‌های مرورگر و Visual Regression (Playwright) |
| `npm run test:e2e:update` | به‌روزرسانی اسنپ‌شات‌های بصری |

اگر محیط شما Chromium از پیش‌نصب‌شده دارد و نمی‌خواهید Playwright مرورگر دانلود کند:

```bash
CHROMIUM_EXECUTABLE_PATH=/path/to/chromium npm run test:e2e
```

## Stack

پروژه از صفر ساخته شده، پس Stack با هدف «کمترین وابستگی، بیشترین کنترل» انتخاب شده است:

- **React 18 + TypeScript (strict)** روی **Vite**
- **CSS Modules + Design Tokens** — بدون Tailwind، چون کنترل دقیق RTL و typography فارسی
  با Logical Properties ساده‌تر و سبک‌تر بود.
- **بدون Motion Library** — کل کروگرافی با CSS transition/animation و یک تایم‌لاین کوچک در
  React انجام می‌شود؛ Framer Motion و GSAP وابستگی اضافه بودند.
- **Vazirmatn** (SIL OFL) به‌صورت self-host و variable، با `preload`.

## ساختار

```
src/
├─ pages/                      Home · Discover · Paths · Courses · GroupBuy · Free · Compare · 404
├─ components/
│  ├─ layout/AppLayout         پس‌زمینه + هدر + فوتر + skip-link
│  ├─ Hero/                    HeroSection · HeroContent · HeroActions · TrustRow
│  ├─ RecommendationPreview/   Preview · GoalChips · RecommendationCard · VerdictCard · AdviceCard
│  ├─ LevelBackground/         محیط عمق (کف، دیوارها، ریل‌های نور، سطوح ۰/−۱/−۲)
│  ├─ CourseCard/ · PageHeader/ · NextSectionPeek/ · SiteHeader/ · SiteFooter/ · Reveal/
├─ data/                       داده mock (catalog, paths, recommendations)
├─ hooks/                      useRecommendation · usePrefersReducedMotion
├─ intro/                      تایم‌لاین کروگرافی + Context
├─ lib/persian.ts              اعداد فارسی
├─ routes.ts                   مسیرها و آیتم‌های ناوبری
└─ styles/                     tokens.css · global.css
```

### صفحه‌ها

| مسیر | صفحه | تعامل واقعی |
| --- | --- | --- |
| `/` | خانه (Hero) | اینترو سینمایی + پیشنهاددهنده |
| `/discover` | کشف | انتخاب هدف → پیشنهاد + حکم + توصیه |
| `/paths` | مسیرها | مسیرهای چندقدمی با دلیل ترتیب |
| `/courses` | دوره‌ها | فیلتر موضوعی روی کاتالوگ |
| `/group-buy` | خرید گروهی | توضیح مکانیزم + دوره‌های واجد شرایط |
| `/free` | رایگان‌ها | فهرست رایگان‌های بررسی‌شده |
| `/compare` | مقایسه | مقایسه دو دوره با علامت‌گذاری برنده هر معیار |

مسیریابی با **HashRouter** است تا سایت روی هاست استاتیک بدون تنظیم rewrite کار کند.

## تصمیم‌های اصلی

**عمق به‌جای زیرزمین.** نام برند به‌شکل literal تصویر نشده؛ سه خط افقی محو با نشانه‌های
`۰ / −۱ / −۲` در پس‌زمینه، و فقط `−۱` نور crimson دارد.

**یک کلمه Accent، نه یک خط.** در تیتر فقط «بهتر» رنگ accent دارد تا خط دوم بدون
شلوغی بصری غالب باشد.

**Preview واقعاً کار می‌کند.** انتخاب هر chip، پیشنهاد/حکم/توصیه را عوض می‌کند. ماشین
حالت `idle → loading → success` است و داده از `data/recommendations.ts` می‌آید؛ برای
اتصال به API فقط `getRecommendationForGoal` باید عوض شود.

**CLS صفر.** کارت‌های شناور از اولین رندر در Layout حضور دارند و فقط `opacity/transform`
انیمیت می‌شود. ارتفاع ناحیه نتیجه بر اساس بلندترین پاسخ (اندازه‌گیری‌شده در مرورگر) رزرو شده
تا تعویض هدف باعث پرش نشود.

**محیط عمق، نه عکس.** پس‌زمینه یک صحنه‌ی پرسپکتیو از gradient و transform است:
کف و سقف مشبک، دو دیوار محو، ریل‌های نور crimson و وینیت. هیچ بیت‌مپ، هیچ asset سه‌بعدی و
هیچ زیرزمین literal. با حرکت ماوس و اسکرول، فقط پس‌زمینه پارالاکس می‌گیرد (چند درجه)، آن هم
با نوشتن مستقیم CSS variable داخل rAF تا رندر React و layout درگیر نشود.

**Reduced motion یک مسیر درجه‌یک است.** با `prefers-reduced-motion` تمام مراحل بلافاصله
نمایش داده می‌شوند؛ هیچ محتوایی پشت انیمیشن قفل نیست.

**دو انحراف آگاهانه از Palette پیشنهادی** (به‌خاطر WCAG AA):
`#717680` → `#868C97` برای متن muted، و افزودن `--color-accent-text` (`#E2687B`) برای
متن‌های ریز accent. مقادیر قبلی روی سطوح تیره زیر ۴.۵:۱ بودند.

## وضعیت تست‌ها

- Typecheck / ESLint: پاس
- Unit: ۲۳ تست (Vitest + Testing Library)
- E2E: ۴۶ تست (Playwright، دو پروفایل mobile/desktop) شامل RTL، ناوبری موبایل،
  فیلتر کاتالوگ، مقایسه، reduced-motion و Visual Regression
- بدون Horizontal Overflow و با `CLS = 0` در **همه صفحه‌ها** روی
  ۳۲۰ / ۳۶۰ / ۳۹۰ / ۴۳۰ / ۷۶۸ / ۱۰۲۴ / ۱۲۸۰ / ۱۴۴۰

## TODO

- جایگزینی داده‌های mock با API واقعی (`getRecommendationForGoal` و `COURSES`).
- ذخیره وضعیت انتخاب کاربر (فعلاً با تغییر صفحه ریست می‌شود).
- Instrumentation رویدادها (کلیک CTA، انتخاب هدف، فیلتر).
- تست روی Safari/Firefox (در این محیط فقط Chromium در دسترس بود).
- پس‌زمینه با CSS ساخته شده؛ اگر رندر سه‌بعدی اختصاصی تهیه شود، جای همین لایه می‌نشیند.

## License

Apache-2.0 — فایل [LICENSE](./LICENSE).
فونت Vazirmatn تحت SIL OFL؛ متن پروانه در `public/fonts/OFL.txt`.
