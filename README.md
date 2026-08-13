# طبقه منفی یک

هیرو (Hero) وب‌سایت «طبقه منفی یک» — پلتفرم انتخاب، مقایسه و ارزیابی آموزش.

> **کمتر دوره بخر. بهتر انتخاب کن.**

رابط کاربری فارسی، RTL، dark-first و mobile-first؛ همراه با یک Product Preview واقعاً تعاملی
به‌جای تصویر تزئینی.

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
├─ components/
│  ├─ Hero/                    HeroSection · HeroContent · HeroActions · TrustRow
│  ├─ RecommendationPreview/   Preview · GoalChips · RecommendationCard · VerdictCard · AdviceCard
│  ├─ LevelBackground/         لایه‌های عمق ۰ / −۱ / −۲
│  ├─ NextSectionPeek/         «این هفته ارزش دیدن دارن»
│  ├─ SiteHeader/
│  └─ Reveal/                  نمایش مرحله‌ای بر اساس تایم‌لاین
├─ data/                       داده‌های mock (recommendations, weeklyPicks)
├─ intro/                      تایم‌لاین کروگرافی + Context
├─ hooks/                      usePrefersReducedMotion
├─ lib/persian.ts              اعداد فارسی
└─ styles/                     tokens.css · global.css
```

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

**Reduced motion یک مسیر درجه‌یک است.** با `prefers-reduced-motion` تمام مراحل بلافاصله
نمایش داده می‌شوند؛ هیچ محتوایی پشت انیمیشن قفل نیست.

**دو انحراف آگاهانه از Palette پیشنهادی** (به‌خاطر WCAG AA):
`#717680` → `#868C97` برای متن muted، و افزودن `--color-accent-text` (`#E2687B`) برای
متن‌های ریز accent. مقادیر قبلی روی سطوح تیره زیر ۴.۵:۱ بودند.

## وضعیت تست‌ها

- Typecheck / ESLint: پاس
- Unit: ۱۴ تست
- E2E (Chromium، دو پروژه mobile/desktop): ۲۰ تست شامل RTL، دسترسی با کیبورد،
  به‌روزرسانی پیشنهاد، reduced-motion و Visual Regression روی `390×844` و `1440×900`
- بدون Horizontal Overflow و با `CLS = 0` روی ۳۲۰ / ۳۶۰ / ۳۹۰ / ۴۳۰ / ۷۶۸ / ۱۰۲۴ / ۱۲۸۰ / ۱۴۴۰

## TODO

- اتصال CTA «برام انتخاب کن» به Wizard واقعی (فعلاً فوکوس روی chipهای هدف).
- جایگزینی داده‌های mock با API پیشنهاددهنده.
- Instrumentation رویدادها (کلیک CTA، انتخاب هدف).
- تست روی Safari/Firefox (در این محیط فقط Chromium در دسترس بود).

## License

Apache-2.0 — فایل [LICENSE](./LICENSE).
فونت Vazirmatn تحت SIL OFL؛ متن پروانه در `public/fonts/OFL.txt`.
