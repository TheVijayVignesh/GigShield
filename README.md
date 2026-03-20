# GigShield — Parametric Income Disruption Cover for Grocery & Q-Commerce Delivery Partners

> **Guidewire DEVTrails 2026 | University Hackathon**
> **Persona:** Grocery and Q-Commerce Delivery Partners (Zepto, Blinkit, Swiggy Instamart, and similar platforms)
> **Product Type:** Dynamic income-linked parametric disruption cover — weekly pricing cycle
> **Platform:** React Native Mobile App (Android & iOS)

---

## Table of Contents

1. [Inspiration](#1-inspiration)
2. [What It Does](#2-what-it-does)
3. [How We Built It](#3-how-we-built-it)
   - 3.1 Architecture Overview
   - 3.2 Mock Platform API
   - 3.3 Registered Operating Area Model
   - 3.4 Parametric Trigger System
   - 3.5 Weekly Premium Model
   - 3.6 Fraud Defense Architecture
   - 3.7 Risk Estimation Models
   - 3.8 Offline-First Location Tracking
   - 3.9 Technology Stack
4. [Challenges We Ran Into](#4-challenges-we-ran-into)
5. [Accomplishments That We're Proud Of](#5-accomplishments-that-were-proud-of)
6. [What We Learned](#6-what-we-learned)
7. [What's Next for GigShield](#7-whats-next-for-gigshield)

---

## 1. Inspiration

India's grocery and quick-commerce delivery sector runs on roughly 3 to 4 million delivery workers employed indirectly through platforms like Zepto, Blinkit, and Swiggy Instamart. These workers fulfill hyperlocal orders — typically from a single fixed or semi-fixed dispatch point — across a tight delivery radius of 2 to 5 kilometres. Their entire income depends on being able to ride out and complete deliveries within that small zone.

When an external disruption hits that zone, the effect is immediate and total. A red-alert rainfall in Koramangala doesn't reduce a delivery partner's income by 20 percent — it cuts it to zero for the hours the zone is inoperable. A severe AQI spike in Delhi's Dwarka sector doesn't marginally slow orders — it collapses consumer demand and halts dispatch. A ward-level curfew in Chennai doesn't inconvenience a delivery partner — it shuts down their working day entirely with zero notice.

Unlike salaried employees, these workers have no paid leave, no employer buffer, and no government-backed income protection that responds to event-driven disruptions of this kind. The existing formal insurance market does not serve them: traditional insurance requires verified income, claim documentation, and adjuster review — none of which is compatible with the economics or operational reality of informal gig work.

The core insight behind GigShield is that grocery delivery workers in the Q-Commerce segment operate from hyperlocal, geographically bounded areas. That makes them uniquely well-suited for parametric insurance, where payouts are triggered by objective, publicly observable external events rather than individual attestation. The disruption either happened in the zone or it did not. The data is public. The payout can be automatic.

---

## 2. What It Does

### Overview

GigShield is a weekly parametric income disruption cover for Q-Commerce and grocery delivery partners. It is not a fixed-rate benefit product. It is a **dynamic, income-linked, automatic, system-triggered product** — when a qualifying external disruption is confirmed in a worker's registered operating area during their covered work window, a disruption benefit calculated as a direct percentage of that worker's verified trailing average daily earnings is issued automatically to their UPI handle. The worker does not need to file anything, call anyone, or prove anything.

The product has no manual claim submission button for Tier 1 and Tier 2 disruptions. Claim authorization is a backend decision made by the trigger monitoring system based on publicly observable, realized data. For Tier 3 hyperlocal social disruptions — which no external API can detect in advance — the worker initiates via a single tap with a free-text reason description. This is not a claim form. It is a search prompt.

### The Mock Platform API — Verified Earnings as the Foundation

GigShield's dynamic model is powered by a Mock Platform API layer that simulates the verified earning data endpoints of Q-Commerce platforms such as Swiggy and Zepto. During onboarding and at each weekly renewal, GigShield queries these simulated REST endpoints to fetch the worker's **verified trailing average daily earnings** — derived from their completed-order history and platform-confirmed dispatch records over the preceding 30 days.

This verified earning figure is the single most important input to both the payout calculation and the premium formula. It makes GigShield's model mathematically honest: a worker earning ₹1,200 per day and a worker earning ₹500 per day face different stakes when a disruption hits, and their coverage reflects that difference.

### Payout Structure — Percentage of Verified Daily Earnings

When a qualifying trigger fires in a worker's registered zone, the disruption benefit is calculated as a percentage of their verified trailing average daily earnings. The benefit percentage varies by trigger severity tier:

| Disruption Severity | Benefit Paid |
|---|---|
| Partial disruption (moderate heat, Yellow AQI alert) | 40–50% of verified average daily earnings |
| Significant disruption (heavy rain, Orange AQI alert) | 70% of verified average daily earnings |
| Full disruption (IMD Red alert, civic shutdown, NDMA declaration) | 100% of verified average daily earnings |

The maximum weekly benefit is capped at 5× the worker's verified average daily earnings — reflecting a maximum of five disruption-affected working days in any 7-day policy window.

### What GigShield Explicitly Does Not Cover

- Health expenses, accident treatment, hospitalization, or medical bills of any kind
- Vehicle damage, repairs, or theft
- Life cover or accidental death benefits
- Income loss due to personal reasons: voluntary absence, illness, personal relocation, or platform account suspension
- Long-duration systemic losses: prolonged pandemic-type shutdowns, indefinite citywide collapse, or any disruption extending beyond 7 consecutive days (subject to policy review rather than automatic continued payout)

### The Worker Experience

A new worker downloads GigShield from the Play Store (Android) or App Store (iOS) and completes onboarding in under 5 minutes. They enter their phone number, verify via OTP, select their delivery platform and operating city, and authorize GigShield to query their platform earning history via the Mock Platform API. The API returns their verified trailing 30-day average daily earnings, displayed to the worker for transparency before they confirm enrollment. They register their operating area from an in-app map or zone list and link their UPI handle. No manual income proof, no PAN, no salary slip.

Once activated, the worker receives a native push notification if and when a trigger fires in their registered area: *"Heavy rainfall confirmed in your zone. A disruption benefit of ₹X (70% of your ₹Y verified daily average) has been initiated to your UPI handle."* They take no further action.

---

## 3. How We Built It

### Why React Native? Why a Mobile App?

**GigShield is built as a React Native mobile app — not a web or desktop application — for a single defining reason: delivery partners live on their phones.**

Q-Commerce and grocery delivery workers spend their entire working day on a motorbike or bicycle, navigating streets, checking orders, and communicating via their mobile device. Their phone is their primary — and often only — computing device. They do not sit at desks. They do not open laptops between deliveries. Any product that requires a browser on a desktop, or even a carefully opened mobile browser, adds friction that will cause drop-off at exactly the moment the worker most needs protection.

The specific reasons we chose React Native and a native mobile-first approach:

**1. Delivery partners are mobile-native users.** The target persona — Zepto, Blinkit, and Swiggy Instamart riders — already uses native apps for their work (the platform's own delivery partner app). A native mobile app fits seamlessly into this existing behavior pattern. A PWA or web app does not.

**2. React Native enables a single codebase for both Android and iOS.** India's delivery partner population uses a heterogeneous mix of Android devices (the large majority) and iOS devices. React Native allows GigShield to ship a single, maintainable codebase that runs natively on both platforms — without building and maintaining two separate native codebases (Swift + Kotlin). For a hackathon project with real production ambitions, this is the only pragmatic choice.

**3. Native push notifications are non-negotiable for automatic claim alerts.** GigShield's value proposition depends on workers receiving instant, reliable push notifications when a trigger fires. Native push notifications (via Firebase Cloud Messaging on Android and APNs on iOS) are significantly more reliable than web push notifications — they work when the app is closed, when the screen is locked, and in low-connectivity conditions. A delivery rider whose phone is in their pocket needs a notification that will actually wake the screen and surface the message. Web push cannot guarantee this.

**4. Native device APIs enable better fraud detection and location tracking.** React Native's access to native GPS APIs, accelerometer data, network type detection (`NetInfo`), and background location services is substantially more capable and reliable than browser-based equivalents. The movement anomaly detection model and GPS-consistency checks in GigShield's fraud defense layer are meaningfully more accurate when built on native device APIs.

**5. Offline-first capabilities are superior in a native context.** Delivery workers frequently operate in low-connectivity urban pockets — basements, narrow lanes, areas of network congestion. React Native with AsyncStorage and background sync handles offline queuing of location traces and claim submissions more robustly than IndexedDB in a mobile browser, which is subject to aggressive storage eviction policies on low-memory Android devices.

**6. Trust and discoverability.** A listing on the Google Play Store and Apple App Store signals legitimacy to workers who are rightly skeptical of unknown financial products. An installable native app with a store presence is a meaningful trust signal in a population where financial scams targeting gig workers are a real concern.

In summary: the delivery partner persona makes a native mobile app not just a convenience but a requirement. React Native delivers that native experience across Android and iOS from a single codebase — the only approach that makes GigShield viable at scale without doubling engineering effort.

---

### 3.1 Architecture Overview

GigShield is a full-stack mobile application with the following layers:

- **Frontend:** React Native (Expo managed workflow), targeting Android (primary) and iOS (secondary). Single codebase for both platforms.
- **Backend:** FastAPI (Python), hosting REST endpoints and background scheduling
- **Mock Platform API Layer:** Simulated REST endpoints mirroring earning history and dispatch status interfaces of Swiggy and Zepto
- **Database:** PostgreSQL with all critical integrity constraints enforced at the database layer
- **Background Scheduler:** APScheduler embedded in the FastAPI process, running the trigger polling loop every 30 minutes per registered zone
- **ML Models:** Offline-trained scikit-learn and XGBoost models, serialized and loaded at backend startup
- **Push Notifications:** Firebase Cloud Messaging (FCM) for Android; Apple Push Notification service (APNs) for iOS — via Expo Notifications
- **Deployment (Hackathon):** Backend on Render (free tier). Mobile app distributed via Expo Go for demo; production build via EAS Build.

---

### 3.2 Mock Platform API — Data Flow and Integration

#### Simulated Endpoints

**Earning History Endpoint** (`GET /platform/{platform_id}/worker/{worker_id}/earnings/trailing30`)

Returns:
- `daily_earnings[]` — verified daily earning figures for each active working day in trailing 30 days
- `active_days_count` — days the worker logged in and completed at least one order
- `trailing_average_daily_earnings` — average across active days only (excluding voluntary rest days)
- `data_as_of` — timestamp of last platform-side sync

**Dispatch Status Endpoint** (`GET /platform/{platform_id}/worker/{worker_id}/dispatch/status`)

Returns:
- `scheduled_shift_start` and `scheduled_shift_end` — platform-confirmed shift window
- `dispatch_active` — boolean: was the worker actively receiving order assignments?
- `orders_completed_in_window` — count of completed orders in a specified time window

#### Claim Authorization with Dispatch Verification

At payout authorization, the backend calls the Dispatch Status Endpoint for the disruption window. A claim is eligible only if:
1. The parametric trigger has fired (public sources confirm disruption in the registered zone)
2. The worker's dispatch status confirms they were **scheduled and active on the platform during the disruption window**

If `dispatch_active: false` — the worker had logged off before the disruption began — the claim is not authorized. This closes an entire category of fraud.

---

### 3.3 Registered Operating Area Model

The registered operating area is stored as a center coordinate and an approximate radius (defaulting to 3 km, adjustable between 1 km and 6 km). All trigger monitoring, payout eligibility, and fraud detection is evaluated relative to this registered area.

**Critical design principle: trigger evaluation is performed at the zone's stored coordinates using public data sources. No worker device GPS signal determines whether a trigger fires.** When the backend polls OpenWeatherMap for rainfall in a worker's zone, it passes the zone's stored latitude and longitude — not the worker's phone location. This architecture is the foundation of GPS-fraud resistance.

#### Waiting Periods

- **7-day activation waiting period** after first enrollment before any claim can be authorized
- **7-day area-change cooling period** after any registered area update before claims can fire for the new area
- These waiting periods are enforced at the database layer and cannot be bypassed at the application layer

---

### 3.4 Parametric Trigger System — Three-Tier Architecture

#### Tier 1 — Native Webhook (Tomorrow.io)

Alert rules registered ONCE on Tomorrow.io free tier. Rules: rainfall > 35mm, temp > 42°C, visibility < 200m, hail detected. Tomorrow.io's servers monitor 24/7 — our server sleeps completely until pinged. Cost on normal days: ₹0.

Covers: heavy rain, extreme heat, dense fog, hailstorm, cyclone approach.

#### Tier 2 — RSS Bridge via Pipedream (GDACS, GDELT, IMD, PIB, NDMA)

- GDACS flood RSS → Pipedream → POST to our webhook endpoint
- GDELT filtered RSS (keywords: bandh, curfew, Section 144, strike + city name) → Pipedream → our endpoint
- IMD red/orange alert RSS → Pipedream → our endpoint
- PIB RSS (official government civic announcements) → Pipedream → our endpoint
- NDMA disaster declarations → Pipedream → our endpoint

Pipedream polls RSS every 15 minutes. We make zero polling calls from our server. Cost: ₹0.

Covers: declared floods, city-wide bandh, Section 144, cyclone warnings, official disaster declarations.

For civic disruptions (Trigger 4), a raw news mention alone is not sufficient — the geographic entity named in the source must be parsed and matched against the worker's zone using place-name matching against the GigShield zone database. Social media is explicitly excluded as an authoritative source.

#### Tier 3 — Worker-Initiated Single Tap + Free-Text Web Search

For hyperlocal social disruptions no external API or RSS feed can detect in advance.

```
Worker opens GigShield app →
Taps "I can't work right now" →

STEP 1 — Select category (dropdown — routes to correct API):
  🌧  Heavy rain / waterlogging   → OpenWeatherMap API
  😷  Poor air quality            → OpenAQ / AQICN API
  🚫  Curfew / bandh / strike     → NewsAPI + GDELT search
  📵  Platform suspended my zone  → Platform status page ping
  🏪  Local area shutdown         → NewsAPI + GDELT free-text search

STEP 2 — Describe what you see (free text, social categories only):
  Example: "Bandh in RS Puram, shops closed, police blocking roads"
  Example: "Strike near Gandhipuram market, can't reach pickup point"
  (Hint text pre-filled per category. Tamil/Hindi input supported.)

System runs BOTH paths simultaneously:
→ Path A: Category → correct API → one call → threshold check
→ Path B: Free text + zone + today's date → NewsAPI + GDELT search
→ If EITHER confirms → claim enters EOD batch queue
→ Worker sees: "Checked. Your claim is queued for verification by 6pm today."
```

**Why free text matters:** Workers describe exactly what they see — "bandh", "police barricade", "shops all closed". These words appear verbatim in local news if the event is real. No pre-defined dropdown can capture every hyperlocal disruption type. Their own words are the most accurate search query possible.

#### Tier 3 EOD Batch Verification — How Hyperlocal Social Claims Are Resolved

All Tier 3 hyperlocal social disruption claims are held in a daily queue throughout the day. No payout is released during the day for these claims. At 6pm, a single batch verification job runs:

```
All day — claims queue up silently:
Worker A "market closed, Gandhipuram" → queued 10:15am
Worker B "market closed, Gandhipuram" → queued 10:22am
Worker C "local strike, Gandhipuram"  → queued 10:31am

EOD batch job runs at 6pm:
Groups by zone + reason category →
Takes the most commonly reported reason per zone →
Fires ONE NewsAPI + GDELT search:
"market closed Gandhipuram Chennai [today's date]"

Result found in news → entire group approved, payouts released tonight
Result not found    → entire group rejected, workers notified
```

**Cost:** One NewsAPI call per zone per day regardless of how many workers reported. Not one call per claim.

**Why EOD batch defeats coordinated group fraud:** A group of workers who deliberately stopped working together and filed fake reports for a non-existent disruption will find that at 6pm, there is no news article, no GDELT event, no PIB announcement confirming what they claimed. The web is the judge, not the crowd count. The coordination that made the group report possible leaves no trace in public news if the disruption was fabricated.

```
Group files fake claims "market closed, Gandhipuram" all day →
EOD batch searches: "market closed Gandhipuram Chennai [today's date]"
→ Zero results found in NewsAPI or GDELT
→ Entire batch rejected
Their coordination is worthless if the event did not happen.
```

**The one tradeoff:** Workers with genuine hyperlocal social disruptions wait until 6pm for payout rather than receiving it instantly. Tier 1 and Tier 2 disruptions (weather, floods, declared bandh) remain instant as before. Workers are informed of this distinction clearly at onboarding.

#### Webhook Reliability — Queue Architecture

```
Webhook fires →
FastAPI endpoint receives →
Dumps event to Redis queue immediately →
Returns 200 OK in under 100ms (no timeout risk) →
RQ worker picks job from queue and processes at own pace →
Pipedream acts as external buffer if server is briefly down →
Zero webhook loss
```

#### Daily API Cost Reality

| Scenario | API Calls | Cost |
|---|---|---|
| Normal sunny day | 0 | ₹0 |
| Rainy day, 200 workers tap | 200 OpenWeatherMap calls | Free tier |
| Red alert day (webhook fires) | 1 webhook received | ₹0 |
| Entire day of hyperlocal social claims | 1 NewsAPI call per zone at 6pm | Free tier |
| Continuous monitoring from our server | None — no polling | ₹0 |

#### Trigger Benefit Table

| Trigger | Condition | Benefit |
|---|---|---|
| Extreme heat | > 42°C sustained 2+ hrs | 40–50% verified daily earnings |
| Heavy rain | > 35mm/hr sustained | 70% verified daily earnings |
| Severe AQI | 300–400 Very Poor | 40% verified daily earnings |
| Hazardous AQI | 400+ Severe | 80% verified daily earnings |
| Floods | GDACS active flood event in zone | 100% verified daily earnings |
| Dense fog | Visibility < 200m | 40% verified daily earnings |
| Civic disruption | Section 144 / curfew confirmed in zone | 100% verified daily earnings |
| Natural disaster | NDMA/state authority declaration | 100% verified daily earnings |
| Hyperlocal social | EOD batch web verification confirmed | 70% verified daily earnings |

#### Duplicate Claim Prevention

The database enforces a composite unique constraint on `(policy_id, trigger_event_id)` in the claims table. A single trigger event can generate at most one claim record per active policy regardless of how many times the polling loop runs. Subsequent polling cycles during an ongoing event extend the recorded event duration rather than creating new claim records. This is enforced at the database layer, not just the application layer.

---

### 3.5 Weekly Premium Model

#### Pricing Architecture

The weekly premium is determined by four components: a dynamic base rate derived from verified trailing average daily earnings, a Zone Risk Factor, a Time Risk Factor, and a Claims Loading Factor.

#### Why 2.5% Base Rate?

The earnings rate coefficient of 0.025 (2.5% per day × 7 days = ~17.5% weekly, but anchored to daily earnings) is derived from actuarial reasoning specific to the Q-Commerce delivery persona.

A Chennai Q-Commerce delivery worker experiences on average 8–12 disruption days per year. At an average 4-hour income loss per event and typical hourly earnings of ₹100–150, expected annual payout per worker is approximately ₹3,200–₹7,200. At the 2.5% coefficient, annual premium collected for a ₹800/day worker is approximately ₹5,110 — yielding a target loss ratio of 63–70%, within the 55–70% industry standard for parametric insurance.

**Effective rate range after all multipliers:**

| Worker situation | Effective rate of weekly earnings |
|---|---|
| Low-risk zone, dry season, no recent claims | ~2.5% of weekly earnings |
| Average zone, average season | ~3.0% of weekly earnings |
| High-risk zone, monsoon season | ~4.0–4.5% of weekly earnings |

**Comparison with global parametric insurance products:**

| Product | Premium rate | Coverage type |
|---|---|---|
| ACRE Africa (Kenya farmers) | 2–4% of insured value | Drought/flood income loss |
| Parametrix (cloud outage) | 2–5% of coverage amount | Business income loss |
| Bima (Africa micro-insurance) | 1–3% of income | Life + income |
| GigShield | 2.5% base + zone/time loading | Income loss only |

GigShield's base rate sits at the lower end of global parametric income insurance. The Velachery worker paying 4.5% is paying more because they will statistically claim more — it is proportionate, not punitive.

#### Core Formula

```
Base Rate = verified_trailing_average_daily_earnings × 0.025 × 7

Weekly Premium = Base Rate × Zone Risk Factor × Time Risk Factor × Claims Loading Factor
```

Subject to:
```
Floor = ₹50   (accessibility — lowest-risk workers never priced below this)
Cap   = ₹400  (fairness — surcharges never price a worker out of coverage)
```

#### Zone Risk Factor (ZRF)

```
ZRF = 1.0 + α × (historical_trigger_days_12m / baseline_trigger_days_12m - 1)
```

- `α` = 0.4 (smoothing coefficient — prevents single bad years from dominating)
- ZRF bounded: minimum 0.80, maximum 1.50

A zone at the city average gets ZRF 1.0. A high-frequency flood zone gets ZRF above 1.0. A historically calm zone gets a modest discount below 1.0.

#### Time Risk Factor (TRF)

```
TRF = 1.0 + β × normalized_week_risk_score
```

- `β` = 0.25
- TRF bounded: minimum 0.90, maximum 1.25
- Driven by IMD 7-day forecast, historical same-week frequency, upcoming declared events from GDELT

In a monsoon forecast week, premium rises up to 25% above zone-adjusted rate. In a calm forecast week, premium can be up to 10% below. This is also the **predictive risk modeling component** — every Sunday night the model ingests IMD 7-day forecasts, historical claim frequency for the same calendar week across previous years, and upcoming GDELT events (bandh, elections, festivals). Workers in zones with elevated predicted disruption probability receive a native push notification to their phone: *"Your zone has elevated flood risk this week due to forecast heavy rain. Your coverage is active."*

This is proactive protection, not just reactive payout — directly satisfying the "Predictive risk modeling specific to the persona" requirement.

#### Claims Loading Factor (CLF)

```
CLF(t) = 1.0 + λ × sum_of_recent_claims × e^(-δ × weeks_since_last_claim)
```

- `λ` = 0.05 per recent claim
- `δ` = 0.35 (loading reduces ~30% per claim-free week)
- CLF bounded: minimum 1.00, maximum 1.40

A worker with 4 claims in 8 weeks sees CLF ~1.20. After 8 claim-free weeks, CLF returns to 1.00. This discourages treating the product as a routine income supplement without permanently penalizing workers in genuinely high-disruption zones.

#### Sample Premium Outputs

| Verified Daily Earnings | Base Rate | ZRF | TRF | Final Premium |
|---|---|---|---|---|
| ₹500/day | ₹42 | 0.88 | 0.93 | ₹50 (floor) |
| ₹700/day | ₹59 | 1.00 | 0.93 | ₹55 |
| ₹900/day | ₹76 | 1.00 | 1.00 | ₹76 |
| ₹1,100/day | ₹92 | 1.10 | 1.12 | ₹114 |
| ₹1,300/day | ₹109 | 1.35 | 1.18 | ₹174 |
| ₹1,500/day | ₹126 | 1.50 | 1.25 | ₹236 |

#### Payout Amount Calculation

```
avg_hourly = verified_trailing_average_daily_earnings / 8
payout     = avg_hourly × disruption_hours × severity_percentage
payout     = min(payout, verified_daily_earnings × 5)   (weekly cap)
```

**New worker fallback:** Workers with less than 4 weeks of platform history use city + platform average. Personal verified average takes over automatically from week 5.

---

### 3.6 Fraud Defense Architecture

#### The Problem Framing

The most plausible fraud attack on a parametric disruption product is any behavior that attempts to misalign a worker's eligibility with a trigger event they would not organically have been covered for. GigShield's fraud defense is organized in three layers around one core economic principle: **fraud should not be cost-effective**. Perfect technical prevention is impossible. The goal is to make sustained abuse expensive, risky, and low-yield.

#### Layer 1 — Structural Defenses (Remove the Attack Surface)

**Server-side trigger evaluation using stored zone coordinates.** Worker device GPS has no role in whether a trigger fires. A worker cannot manipulate the OpenWeatherMap reading for Koramangala by spoofing their phone's location.

**Mock Platform API dispatch verification.** When a trigger fires and payout is being authorized, the backend queries dispatch status for the disruption window. If the worker had logged off before the disruption began, the claim is not authorized. This is a structural check operating on authoritative platform-side records — not device signals.

**EOD batch web verification for Tier 3 social claims.** No hyperlocal social claim is ever approved based on crowd count alone. The web is the only verification gate. A group of workers who coordinate fake reports gains nothing if no public news source confirms the disruption occurred.

**Waiting periods.** 7-day activation wait + 7-day area-change cooling period close the forecasting arbitrage window entirely.

**Composite unique constraint on claims table.** Duplicate claim creation for the same event is physically impossible at the database layer.

#### Layer 2 — Software-Level Spoof and Anomaly Detection

**Direct spoofing signals (where detectable):** Mock location apps on Android often produce identifiable signatures — unnaturally smooth movement, discontinuous coordinate jumps, GPS speed inconsistent with position changes. React Native's native device APIs (`expo-location`, `expo-sensors`) provide access to raw accelerometer and GPS metadata, including the `isFromMockProvider` flag on Android, enabling more reliable spoof detection than browser-based geolocation. The system does not claim to detect all forms of device-level manipulation. Where signals are present, they elevate the fraud risk score.

**Movement anomaly scoring:**
- Zone switch frequency vs population average
- Distance jump magnitude (physically impossible travel speeds)
- Path inconsistency vs worker's own historical behavior
- Timing alignment: behavior changing specifically around trigger event windows
- Dispatch record inconsistency: device trace placing worker outside registered zone during platform-confirmed dispatch windows

**Five-layer deterministic verification score (0–100) runs on every claim:**

| Check | Points | What it catches |
|---|---|---|
| GPS history consistency | 20 | Teleportation, frozen coordinates, zone mismatch |
| Cell tower ID triangulation | 20 | Physical location vs claimed GPS (requires OpenCellID) |
| Device behaviour fingerprint | 20 | WiFi vs mobile data, accelerometer, `isFromMockProvider()` |
| Platform dispatch verification | 20 | Was worker active on platform during disruption window? |
| Syndicate pattern detection | 20 | Claim spike ratio, synchronized offline dropout |

**Fraud Risk Score formula:**
```
FRS(t) = FRS(t-1) × e^(-0.20 × weeks_since_last_signal) + sum(signal_weights_this_week)
```

| Signal | Weight |
|---|---|
| Area change in past 7 days | +8 |
| 3+ area changes in past 30 days | +20 |
| New account (< 14 days old) | +10 |
| First claim in first covered week | +12 |
| Claim within 48 hrs of area change | +18 |
| Direct spoof indicator detected | +30 |
| Large distance jump (> 20 km instant) | +15 |
| Path inconsistency vs historical | +10 |
| Suspicious timing alignment | +12 |
| Dispatch record inconsistency | +22 |

**Fraud score action thresholds:**

| FRS Range | Action | Worker Message |
|---|---|---|
| 0–35 | Immediate payout | "₹X credited — disruption protection" |
| 36–60 | Secondary auto re-verification, payout within 2 hrs if cleared | "Brief verification delay due to network conditions" |
| 61–80 | Payout held, human review within 24 hrs | "Your claim is under review. We'll update you with a timeline." |
| 81–100 | Payout held, account flagged, further claims suspended | "Your account requires review before further claims can be processed." |

We never use the word "fraud" in any worker-facing message.

#### Bad Weather Grace Rules

Extreme weather degrades GPS accuracy and causes cell tower handoffs — the same conditions that cause genuine claims also reduce verification signal quality. GigShield accounts for this explicitly:
- If Tomorrow.io confirms red alert in claimed zone → cell tower tolerance widens from ±300m to ±1km
- Accelerometer variance threshold loosened during confirmed storm events
- Honest workers in genuine storms get more leniency exactly when they need it most

#### Layer 3 — Business-Rule Friction (Economic Deterrence)

- **KYC at onboarding:** Phone OTP + UPI identity linkage creates a traceable identity at a practical cost per fake account
- **Platform account linkage:** Verified platform earning history is a significantly higher barrier than a new phone number
- **Waiting periods:** Opportunistic coverage alignment with a known upcoming event cannot be completed quickly
- **Payout delay for flagged claims:** Payout delay reduces the liquidity value of fraudulent claims
- **Claims loading surcharge:** Repeated successful fraudulent claims raise the worker's own premium, reducing per-claim profit margin
- **Account suspension risk:** Confirmed abusive behavior results in policy suspension and potential legal escalation
- **Economic self-defeat:** Payout is capped at verified daily earnings. A worker who genuinely stops working to fraudulently claim loses real Swiggy/Zepto income to receive at most equivalent insurance payout. The fraud rarely pays more than the legitimate work sacrificed.

#### Adversarial Scenario — Coordinated Syndicate Attack

*This section directly addresses the coordinated GPS-spoofing threat from the DEVTrails challenge document, and the coordinated group physical presence attack raised during team review.*

**Attack 1 — GPS spoofing from home (500 workers, Telegram-coordinated):**

| Signal | Genuine Stranded Worker | Syndicate Fraudster |
|---|---|---|
| Platform dispatch status | Active on platform, zero orders (zone suspended) | Logged off — dispatch_active: false |
| Cell tower location | Matches flood zone | Residential tower, 8km away |
| `isFromMockProvider()` | FALSE | TRUE |
| Network type | 4G mobile data | Home WiFi |
| Claim timing | Trickles in over hours | 487 claims in 23 minutes |

The server-side trigger evaluation means GPS spoofing is irrelevant to whether the trigger fires at all. The dispatch verification check alone defeats this attack — a worker who is home running a spoofing app is not scheduled on the platform during the disruption window.

**Attack 2 — Coordinated group physical presence ("picnic attack"):**

A group of workers deliberately stop working together, go somewhere as a group, and all file Tier 3 hyperlocal social claims for a non-existent local disruption.

This attack defeats GPS, cell tower, accelerometer, and UPI gap checks because the workers are genuinely offline and physically present somewhere. The EOD batch verification is the complete defense:

```
Group files fake claims "market closed, Gandhipuram" all day →
EOD batch at 6pm searches NewsAPI + GDELT:
"market closed Gandhipuram Chennai [today's date]"
→ Zero results found
→ Entire batch rejected
```

If no disruption actually occurred, no news source will confirm it. The group's coordination is worthless. Additionally, the synchronized offline dropout signal fires in Check 5 — a sharp cliff of workers all going offline within the same 30-minute window, followed by simultaneous claim submissions, is statistically distinguishable from a genuine disruption where workers go offline gradually as conditions worsen.

**The fundamental economic argument against both attacks:** Payout is capped at verified daily earnings. To pass dispatch verification, a worker must genuinely stop working. Genuine income lost = insurance payout received. The fraud breaks even at best. It is not cost-effective.

---

### 3.7 Risk Estimation Models

Two separate analytical models support pricing and fraud detection.

#### Zone-Week Risk Estimation Model (Pricing Support — feeds TRF)

**Purpose:** Estimate probability of at least one qualifying trigger event in the upcoming 7-day window per zone.

**Features:**
- 7-day weather forecast (temperature, precipitation probability, AQI trend) from OpenWeatherMap and OpenAQ
- Historical trigger event frequency for the zone over trailing 12 months by disruption type
- Geographic zone characteristics from OpenStreetMap: proximity to water bodies, elevation, industrial zone density
- Week-of-year index (seasonal patterns)
- Recent zone conditions: trigger events in past 4 weeks

**Model type:** XGBoost gradient-boosted decision tree trained on synthetically generated zone-week data reflecting realistic Indian city disruption patterns. Supports pricing decisions only — does not authorize or deny claims.

#### Movement Anomaly Model (Fraud Detection Support)

**Purpose:** Score how anomalous a worker's location trace behavior is relative to their own history and the worker population.

**Features:**
- Zone switch frequency over trailing 30 days
- Maximum single-step distance jump in trailing 7 days
- Ratio of current-week operating area centroid to historical centroid
- Claim-timing-aligned movement anomaly (behavior change within 48hrs before trigger)
- Account age in weeks
- Dispatch record consistency score

**Model type:** Hybrid — rule-based scoring for explicit high-weight signals combined with Isolation Forest for continuous movement features. No labelled fraud data required.

Both models are trained on synthetic data for the hackathon and designed for retraining as real operational data accumulates.

---

### 3.8 Offline-First Location Tracking

GigShield collects location traces from the worker's device during active covered work windows for work-area consistency verification and movement anomaly detection. This collection is bounded to covered shift windows and uses periodic updates rather than high-frequency GPS polling.

React Native's `expo-location` API enables background location collection that remains active even when the app is backgrounded — a capability critical for delivery workers who switch between the GigShield app and their platform's delivery app during a shift. Location traces are stored locally in AsyncStorage and synced to the server in batches when a reliable connection is available. Unlike browser-based IndexedDB — which is subject to aggressive eviction on low-memory Android devices — AsyncStorage provides durable, persistent local storage that survives app restarts and background kills.

Workers are informed clearly at onboarding that location data is collected only for work-area verification and fraud detection — not shared with delivery platforms or third parties. Location data does not determine whether a disruption event occurred. It is one input into the fraud scoring system.

---

### 3.9 Technology Stack

#### Frontend (Mobile)
React Native with Expo (managed workflow). NativeWind (Tailwind-compatible styling for React Native) for consistent mobile-first UI. React Query for server-state management and background refetching. Victory Native for dashboard charts and earnings visualizations. Expo Notifications for native push notification handling on Android (FCM) and iOS (APNs). expo-location for background GPS collection. expo-sensors for accelerometer data. AsyncStorage for offline-first local data persistence.

#### Backend
FastAPI (Python). APScheduler for 30-minute trigger polling loop and 6pm EOD batch job. JWT session authentication. Firebase Authentication for OTP phone verification (free tier). Pydantic models throughout.

#### AI/ML
- `xgboost` — Zone-Week Risk Estimation Model (Time Risk Factor)
- `sklearn.ensemble.IsolationForest` — movement anomaly detection
- `shap` — model explainability for premium breakdown shown to workers
- `faker` + `numpy` — synthetic training data generation

#### Database
PostgreSQL. Core tables: `workers`, `registered_areas`, `area_change_log`, `policies`, `trigger_events`, `claims`, `fraud_score_log`, `location_traces` (partitioned by week), `platform_earnings_snapshots`. Critical constraints at database layer: composite unique on `(policy_id, trigger_event_id)`, foreign key chain ensuring no claim without valid active policy and confirmed trigger event.

#### External Data Sources

| Provider | Purpose | Mode |
|---|---|---|
| Mock Platform API (Swiggy/Zepto simulation) | Verified earnings + dispatch status | Simulated endpoints |
| Tomorrow.io | Native webhook — weather triggers Tier 1 | Free tier (real) |
| OpenWeatherMap | On-demand weather verification, zone forecast | Free tier (real) |
| OpenAQ / AQICN | AQI verification | Free (real) |
| GDACS RSS via Pipedream | Flood auto-trigger Tier 2 | Free (real) |
| GDELT RSS via Pipedream | Curfew/bandh auto-trigger Tier 2 | Free (real) |
| IMD / PIB / NDMA RSS via Pipedream | Official alert auto-trigger Tier 2 | Free (real) |
| NewsAPI | EOD batch social disruption verification | Free developer tier |
| OpenCellID | Cell tower ID to coordinates | Free (real) |
| Firebase Auth | OTP phone verification | Free tier |
| Razorpay (Test Mode) | Premium collection + payout simulation | Sandbox |
| OpenStreetMap / Overpass API | Zone geographic features for risk model | Free, open license |
| Firebase Cloud Messaging (FCM) | Android push notifications | Free tier |
| Apple Push Notification service (APNs) | iOS push notifications | Free (via Expo) |

---

## 4. Challenges We Ran Into

**Designing a unified earnings data architecture across disparate platform APIs.** Swiggy's internal earning records distinguish base delivery pay, incentive bonuses, and tip income in ways that differ from Zepto's order-completion payout structure. Resolving this required defining a normalized `trailing_average_daily_earnings` schema that maps each platform's payout components to a consistent active-day earning figure — excluding voluntary rest days from the denominator and capping anomalous incentive spikes that do not reflect a worker's typical earnings.

**Dynamic work areas.** Workers change employers and dispatch hubs. The registered area model had to support updates while introducing waiting periods to prevent exploitation as a timing mechanism. Calibrating the waiting period to close the forecasting arbitrage window without becoming a barrier to legitimate area changes required explicit reasoning about public forecast horizons.

**Imperfect spoof detection.** GPS spoofing cannot be perfectly detected at the device level, even with React Native's access to native APIs and the `isFromMockProvider` flag. The resolution — structuring trigger evaluation to be entirely independent of device GPS, and anchoring fraud defense to platform dispatch verification — is conceptually clean, but it required accepting that device-level signals are useful for fraud scoring but not reliable enough to be used as direct claim triggers.

**Earnings volatility and the trailing window.** Festival seasons and platform incentive campaigns can spike earnings 40–60% above baseline. A naive trailing average capturing a festival spike would inflate both payout entitlement and premium. The resolution uses a 30-day active-day average with a cap on anomalous earning days more than 2 standard deviations above the worker's own median.

**Defining long-duration risk exclusions.** The boundary between short-duration event-bounded disruption (which GigShield covers) and long-duration systemic loss (which it does not) required explicit product design decisions. Extended monsoon seasons and multi-week pollution crises are real scenarios — the honest answer is that they are outside GigShield's current scope, with a 7-day continuous trigger cap before manual review.

**Balancing automation with fairness.** A fully automated system carries the risk of incorrectly holding legitimate claims. The design specifies exactly what happens to a legitimate worker who is incorrectly flagged — transparent notification with timeline, automated secondary check as first pass, human review as backstop.

**Background location on Android.** React Native's `expo-location` requires explicit foreground service permissions for background location collection on Android 10+. Handling the permission request flow gracefully — without alarming workers who are skeptical of location access — required careful UX design and clear plain-language explanation at the permission prompt.

---

## 5. Accomplishments That We're Proud Of

**A unified dynamic earnings architecture.** Successfully designing a system that ingests and normalizes earning data from structurally disparate Q-Commerce platform APIs and converts it into a consistent, auditable risk profile per worker. The normalized `trailing_average_daily_earnings` schema is platform-agnostic, handles edge cases honestly, and creates a pricing and payout foundation that is both fair to workers and defensible to regulators.

**A realistic automatic claims model.** Claims are never triggered by instantaneous readings, never filed by workers for Tier 1/2 events, and never dependent on device GPS for trigger evaluation. The multi-source sustained-window observation requirement makes the trigger pipeline robust to API noise. Platform dispatch verification adds a structurally meaningful second check grounded in platform-side records.

**EOD batch verification as a fraud-resistant social claim mechanism.** Rather than approving hyperlocal social claims based on crowd count — which is gameable by coordinated groups — the system holds all social claims until a single EOD web search verifies whether the disruption actually made it into any news or civic record. Simple, cheap, and structurally resistant to both coordinated GPS fraud and coordinated group physical presence fraud.

**A coherent and explainable pricing architecture.** The premium formula has four components — earnings-linked base rate, Zone Risk Factor, Time Risk Factor, and Claims Loading Factor — each with a clear meaning, a bounded range, a plain-English rationale, and SHAP-driven transparency shown to workers in the app.

**A layered fraud defense that acknowledges its own limits.** Rather than claiming fraud can be detected perfectly, the design explains exactly what it does and does not catch, and frames the primary defense as a combination of structural attack surface removal and economic deterrence.

**A true mobile-native experience for a mobile-native persona.** By building in React Native rather than a PWA or responsive web app, GigShield delivers native push notifications, background location tracking, reliable offline behavior, and access to device sensors — all of which matter when the user is a delivery rider on a motorbike, not a desk worker at a browser.

**Scope discipline.** GigShield explicitly excludes what it does not cover, explains why, and does not overclaim. This makes the product more credible to judges, more defensible to workers, and more actionable for future development.

---

## 6. What We Learned

The most important lesson was that **a model is only as honest as the data that anchors it**. Moving to an income-linked model required confronting the data problem directly: where does the earnings figure come from, how is it normalized, and what happens when it is anomalous or incomplete? Every design decision in the earnings data pipeline has downstream consequences for both product fairness and actuarial soundness.

The second lesson was about **the difference between what makes a feature impressive and what makes it defensible**. ML-based fraud detection sounds more compelling than a rule-based scoring system. But if the ML model cannot be explained to a regulator or a challenged worker, and if it is trained on synthetic data of uncertain quality, its functional contribution is limited. The hybrid rule-plus-model approach is less glamorous but more honest.

The third lesson was about **scope creep as a design risk**. A product that covers only discrete, publicly observable, short-duration events — and says so explicitly — is operationally tractable. A product that tries to cover all income disruption requires capital, regulatory approvals, and actuarial infrastructure that a hackathon project cannot realistically model.

The fourth lesson was about **platform choice as a product decision, not just a technical one**. Choosing React Native over a PWA was not primarily an engineering call — it was a product call about who the user is and how they live. The delivery partner persona made native mobile mandatory; React Native made it feasible from a single codebase.

---

## 7. What's Next for GigShield

**Live platform API integration.** Replacing simulated endpoints with authenticated integrations against real Swiggy, Zepto, and Blinkit earning data APIs requires commercial data sharing agreements and IRDAI-compatible data handling commitments — but it is the step that converts the income-linked model from prototype to deployable product.

**Play Store and App Store publication.** Publishing GigShield as a production app on the Google Play Store and Apple App Store — including passing review requirements, setting up app signing via EAS, and handling Play Store's background location permission policy requirements.

**Data calibration from real operational exposure.** The premium formula coefficients are currently set to reasonable prototype values. Real calibration requires actual claims data, actual fraud outcomes from human review, and real zone disruption frequency from accumulated API polling.

**Stronger anomaly detection models.** As real location trace and dispatch record data accumulates under consent, the movement anomaly model can be retrained on genuine behavioral patterns — improving both precision of fraud detection and fairness of flagging thresholds.

**Regulated-insurer alignment.** GigShield as designed is a product concept. Converting it into a regulated insurance product in India requires IRDAI compliance — product filing, reinsurance arrangements, solvency requirements, and policyholder protection obligations. Engaging with a licensed insurance partner or pursuing IRDAI's regulatory sandbox pathway is the path from concept to market.

**Better zone mapping and geographic precision.** The current zone model uses a center coordinate and radius. More precise zone boundaries based on ward boundaries, postal zones, or platform delivery radius data would improve trigger accuracy and reduce edge case ambiguity.

**Privacy-preserving telemetry refinement.** On-device anomaly pre-scoring that transmits only a score rather than raw coordinates, local differential privacy on aggregated movement traces, and clearer retention and deletion policies for location data.

**Multilingual app support.** Tamil, Hindi, Kannada, and Telugu language support within the React Native app for onboarding flows, push notification copy, and claim status screens — serving the linguistic diversity of the delivery partner population across GigShield's target cities.

---

## Golden Rules Compliance

| Constraint | How GigShield Satisfies It |
|---|---|
| Persona: delivery partners only | Q-Commerce and grocery delivery — Zepto, Blinkit, Swiggy Instamart riders exclusively |
| Coverage: income loss only | Verified daily earnings × severity percentage. Zero health, vehicle, life, or accident coverage anywhere |
| Weekly pricing | Premium calculated weekly via normalized earnings × ZRF × TRF × CLF. Debited weekly via UPI AutoPay. Displayed as a weekly figure at all times |
| Automatic claim initiation | Tier 1 and Tier 2 auto-initiate claims for all affected policyholders with zero worker action. Tier 3 is single-tap for hyperlocal disruptions, with EOD batch web verification as the approval gate |
| No continuous API polling | Tier 1: Tomorrow.io webhooks. Tier 2: RSS via Pipedream. Tier 3: one API call at tap moment + one NewsAPI call per zone at 6pm. Server idles on clear days |

---

*GigShield — Dynamic, income-linked disruption cover for the workers who keep urban supply chains running.*
*Built for Guidewire DEVTrails 2026 — Seed. Scale. Soar.*

