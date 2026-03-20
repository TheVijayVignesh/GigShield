# GigShield — Parametric Income Disruption Cover for Grocery & Q-Commerce Delivery Partners

> **Guidewire DEVTrails 2026 | University Hackathon**
> **Persona:** Grocery and Q-Commerce Delivery Partners (Zepto, Blinkit, Swiggy Instamart, and similar platforms)
> **Product Type:** Dynamic income-linked parametric disruption cover — weekly pricing cycle
> **Platform:** Progressive Web App (PWA)

---

## Table of Contents

1. [Inspiration](#inspiration)
2. [What It Does](#what-it-does)
3. [How We Built It](#how-we-built-it)
4. [Challenges We Ran Into](#challenges-we-ran-into)
5. [Accomplishments That We're Proud Of](#accomplishments-that-were-proud-of)
6. [What We Learned](#what-we-learned)
7. [What's Next for GigShield](#whats-next-for-gigshield)

---

## Inspiration

India's grocery and quick-commerce delivery sector runs on roughly 3 to 4 million delivery workers employed indirectly through platforms like Zepto, Blinkit, and Swiggy Instamart. These workers fulfill hyperlocal orders — typically from a single fixed or semi-fixed dispatch point — across a tight delivery radius of 2 to 5 kilometres. Their entire income depends on being able to ride out and complete deliveries within that small zone.

When an external disruption hits that zone, the effect is immediate and total. A red-alert rainfall in Koramangala doesn't reduce a delivery partner's income by 20 percent — it cuts it to zero for the hours the zone is inoperable. A severe AQI spike in Delhi's Dwarka sector doesn't marginally slow orders — it collapses consumer demand and halts dispatch. A ward-level curfew in Chennai doesn't inconvenience a delivery partner — it shuts down their working day entirely with zero notice.

Unlike salaried employees, these workers have no paid leave, no employer buffer, and no government-backed income protection that responds to event-driven disruptions of this kind. The existing formal insurance market does not serve them: traditional insurance requires verified income, claim documentation, and adjuster review — none of which is compatible with the economics or operational reality of informal gig work. Microinsurance products in India have historically failed this demographic because of high claim friction, low trust, and premiums disconnected from the week-to-week income cycle.

The core insight behind GigShield is that grocery delivery workers in the Q-Commerce segment operate from hyperlocal, geographically bounded areas. That makes them uniquely well-suited for parametric insurance, where payouts are triggered by objective, publicly observable external events rather than individual attestation. The disruption either happened in the zone or it did not. The data is public. The payout can be automatic.

GigShield is our attempt to build that product in a way that is honest about its limitations, realistic about its data sources, and useful enough to actually deliver value to a worker earning ₹700 a day with no safety net.

---

## What It Does

### Overview

GigShield is a weekly parametric income disruption cover for Q-Commerce and grocery delivery partners. It is not a fixed-rate benefit product. It is a **dynamic, income-linked, automatic, system-triggered product** — when a qualifying external disruption is confirmed in a worker's registered operating area during their covered work window, a disruption benefit calculated as a direct percentage of that worker's verified trailing average daily earnings is issued automatically to their UPI handle. The worker does not need to file anything, call anyone, or prove anything.

The product has no manual claim submission flow. There is no "Submit a Claim" button. Claim authorization is a backend decision made by the trigger monitoring system based on publicly observable, realized data over a completed time window. The worker's role is limited to onboarding, linking their platform account via the Mock Platform API, maintaining a registered operating area, and renewing their weekly policy.

### The Mock Platform API — Verified Earnings as the Foundation

GigShield's dynamic model is powered by a Mock Platform API layer that simulates the verified earning data endpoints of Q-Commerce platforms such as Swiggy and Zepto. During onboarding and at each weekly renewal, GigShield queries these simulated REST endpoints to fetch the worker's **verified trailing average daily earnings** — derived from their completed-order history and platform-confirmed dispatch records over the preceding 30 days.

This verified earning figure is the single most important input to both the payout calculation and the premium formula. It makes GigShield's model mathematically honest in a way that a fixed-benefit product cannot be: a worker earning ₹1,200 per day and a worker earning ₹500 per day face different stakes when a disruption hits, and their coverage should reflect that difference.

### Payout Structure — Percentage of Verified Daily Earnings

When a qualifying trigger fires in a worker's registered zone, the disruption benefit is calculated as a percentage of their verified trailing average daily earnings. The benefit percentage varies by trigger severity tier:

| Disruption Severity | Benefit Paid |
|---|---|
| Partial disruption (e.g., moderate heat, Yellow AQI alert) | 40–50% of verified average daily earnings |
| Significant disruption (e.g., heavy rain, Orange AQI alert) | 70% of verified average daily earnings |
| Full disruption (e.g., IMD Red alert, civic shutdown, NDMA disaster declaration) | 100% of verified average daily earnings |

The verified average daily earnings figure is refreshed from the Mock Platform API at each weekly renewal. A worker's payout entitlement scales with what they actually earn — ensuring the benefit is proportionate to the real income loss a disruption causes.

The maximum weekly benefit is capped at 5× the worker's verified average daily earnings, reflecting a maximum of five disruption-affected working days in any 7-day policy window. Individual event payouts are bounded by the severity tier percentages above and do not accumulate beyond the weekly cap.

### What It Explicitly Does Not Cover

GigShield covers only short-duration, event-bounded income disruption caused by external public events. It explicitly excludes:

- Health expenses, accident treatment, hospitalization, or medical bills of any kind.
- Vehicle damage, repairs, or theft.
- Life cover or accidental death benefits.
- Income loss due to personal reasons: voluntary absence, illness, personal relocation, or platform account suspension.
- **Long-duration systemic losses.** This includes but is not limited to: war, prolonged pandemic-type platform shutdowns, indefinite citywide economic collapse, prolonged unemployment, open-ended supply chain failures, or any disruption that cannot be attributed to a discrete, event-bounded external occurrence. GigShield is not a long-term income replacement product and is not designed to function as one. Individual event payouts are capped, and events that extend beyond a defined maximum duration (currently set at 7 days of continuous trigger) are subject to policy review rather than automatic continued payout.

### The Worker Experience

A new worker opens GigShield in their mobile browser — no app installation required — and completes onboarding in under 5 minutes. They enter their phone number, verify via OTP, select their delivery platform and operating city, and authorize GigShield to query their platform earning history via the Mock Platform API. The API call returns their verified trailing 30-day average daily earnings, which is displayed to the worker for transparency before they proceed. They then register their current operating area from a map or zone list and link their UPI handle. That is the entire onboarding flow. No manual income proof, no PAN, no salary slip.

Once activated, after a mandatory waiting period described below, the worker's policy is live. They receive a push notification if and when a trigger fires in their registered area. The notification says something like: *"Heavy rainfall confirmed in your zone. A disruption benefit of ₹X (70% of your ₹Y verified daily average) has been initiated to your UPI handle."* They take no further action. The payout is on its way.

At weekly renewal, the worker's premium for the next 7 days is recalculated using their refreshed platform earnings data, updated zone risk, near-term forecast signals, and their recent claims history. They can renew with one tap or set up UPI AutoPay to renew automatically.

### Income-Linked Precision via API Integration

GigShield's income-linked model is both more equitable and more actuarially sound than a fixed-benefit approach. Payouts scale with real earnings, meaning workers are neither over-insured nor under-served. Premiums are calculated against a verified earnings baseline, meaning the insurer's exposure is proportionate and explainable. And because the Mock Platform API also returns dispatch status and scheduling data, GigShield can verify that a worker was actively scheduled and on-platform during the disruption window — making the income linkage a genuine structural improvement over a flat-rate product that cannot distinguish between a worker who would have earned ₹1,500 that day and one who had already logged off.

---

## How We Built It

### 3.1 Architecture Overview

GigShield is a full-stack web application with the following layers:

- **Frontend:** React.js PWA (mobile-first, served over HTTPS, installable on Android without a Play Store listing).
- **Backend:** FastAPI (Python), hosting REST endpoints and background scheduling.
- **Mock Platform API Layer:** Simulated REST endpoints that mirror the earning history and dispatch status interfaces of Q-Commerce platforms (Swiggy, Zepto). Queried during onboarding to fetch verified trailing average daily earnings, and at the point of claim authorization to confirm dispatch status during the disruption window.
- **Database:** PostgreSQL, with all critical integrity constraints enforced at the database layer.
- **Background Scheduler:** APScheduler embedded in the FastAPI process, running the trigger polling loop every 30 minutes per registered zone.
- **ML Models:** Offline-trained scikit-learn and XGBoost models, serialized and loaded at backend startup.
- **Deployment (Hackathon):** Backend on Render (free tier with PostgreSQL add-on). Frontend on Vercel (free tier).

The Mock Platform API is the architectural spine of the income-linked model. Every earnings figure used in premium calculation and payout authorization flows through this normalized API layer, ensuring that data from disparate platform sources is ingested, validated, and unified into a single consistent earning profile before it influences any financial decision.

---

### 3.2 Mock Platform API — Data Flow and Integration

#### Simulated Endpoints

The Mock Platform API exposes two primary endpoint categories for the hackathon prototype:

**Earning History Endpoint** (`GET /platform/{platform_id}/worker/{worker_id}/earnings/trailing30`)

Returns a normalized payload containing:
- `daily_earnings[]` — an array of verified daily earning figures for each active working day in the trailing 30-day period.
- `active_days_count` — number of days the worker was logged in and completed at least one order.
- `trailing_average_daily_earnings` — the computed average across active days only (excluding voluntary rest days from the denominator).
- `data_as_of` — timestamp of the last platform-side sync, ensuring the onboarding flow uses a fresh figure.

**Dispatch Status Endpoint** (`GET /platform/{platform_id}/worker/{worker_id}/dispatch/status`)

Returns:
- `scheduled_shift_start` and `scheduled_shift_end` — the worker's platform-confirmed shift window for the current or most recent working day.
- `dispatch_active` — boolean indicating whether the worker was actively receiving order assignments during the queried period.
- `orders_completed_in_window` — count of completed orders within a specified time window, used as a corroborating signal during claim authorization.

#### Onboarding Flow with API Integration

At onboarding, after OTP verification, the worker authorizes the platform data fetch. The backend calls the Earning History Endpoint and stores the `trailing_average_daily_earnings` as the worker's verified earnings baseline. This figure is shown to the worker in plain language before they confirm enrollment. The premium calculation and payout entitlement for the policy period are anchored to this figure. At each weekly renewal, the endpoint is queried again to refresh the baseline against the worker's most recent 30-day earning window.

#### Claim Authorization with Dispatch Verification

At the point of payout authorization, the backend calls the Dispatch Status Endpoint for the disruption window in question. A claim is eligible for payout only if:

1. The parametric trigger has fired (public data sources confirm the disruption in the registered zone).
2. The worker's dispatch status confirms they were **scheduled and active on the platform during the disruption window** — meaning the income loss was real, not hypothetical.

If the Dispatch Status Endpoint returns `dispatch_active: false` for the disruption window — indicating the worker had already logged off before the disruption began — the claim is not authorized for that window. This cross-check is described further in the Fraud Defense section.

---

### 3.3 Registered Operating Area Model

The registered operating area is the geographic anchor for the entire product. It is not a fixed, permanent dark store address. It is a **worker-declared zone** — selected from a map or named zone list at onboarding and updateable at any time subject to the waiting period rules described below.

The operating area is stored as a center coordinate and an approximate radius (defaulting to 3 km, adjustable between 1 km and 6 km based on the worker's declared delivery range). All trigger monitoring, payout eligibility, and fraud detection activity is evaluated relative to this registered area. The key implication is:

**Trigger evaluation is performed at the zone's stored coordinates using public data sources. No worker device GPS signal is involved in determining whether a trigger fires.**

When the backend polls OpenWeatherMap for rainfall in a worker's zone, it passes the zone's stored latitude and longitude. The API returns atmospheric data for that physical location regardless of where the worker's phone is or what it reports. This architecture is the foundation of the product's resistance to GPS-based fraud, discussed in detail in the fraud section.

#### Waiting Periods and Area Changes

After initial policy activation, the worker enters a **one-week waiting period** before coverage becomes eligible. This prevents workers from activating a policy only because a high-disruption event is already forecast or underway in their area. The policy must complete a full 7-day activation window before any triggered claims are eligible for payout.

If a worker changes their registered operating area, a **one-week cooling period** applies before coverage becomes active in the new area. This cooling period applies regardless of how long the worker has had an active policy. Frequent operating area changes are recorded in the worker's profile history. Three or more area changes within a 30-day period triggers an elevated fraud suspicion flag, as discussed in Section 3.5, and may result in a restriction on further area changes pending a brief account review.

The rationale for one-week rather than shorter periods (such as 48 or 72 hours) is intentional: disruption events — whether weather-based, civic, or pollution-driven — often have advance public signal 48 to 72 hours ahead. A 48-hour wait does not adequately close the forecasting arbitrage window. A full week's waiting period means that the timing of a policy activation or area change cannot be systematically aligned with a specific approaching event using publicly available forecasts.

---

### 3.4 Parametric Trigger Pipeline

#### Design Principles

Each trigger is built around publicly observable, independently verifiable data. For high-stakes triggers, two independent sources must agree before a claim is authorized. No trigger fires on a single instantaneous API reading. The system evaluates conditions over a **completed observation window** — the relevant past time period must show the condition sustained across a minimum of two consecutive polling cycles (approximately 60 to 90 minutes of confirmed data) before the trigger is considered valid.

Forecasts are inputs to the weekly premium model only. They do not authorize or contribute to claim decisions for the current covered window. If Tuesday's weather forecast predicted 60mm of rain but realized rainfall was only 25mm, no claim is triggered. Claim logic is strictly backward-looking over realized data.

#### Trigger 1 — Extreme Heat

Trigger condition: temperature at the registered area's coordinates exceeds 42°C for a sustained minimum of 3 hours during the worker's registered covered shift window, confirmed across at least two consecutive polling cycles.

Data source: OpenWeatherMap hourly weather API — returns temperature, feels-like temperature, and heat index at any lat/long coordinate using IMD-affiliated station data.

Severity grading:

| Temperature Range | Daily Benefit |
|---|---|
| 42°C – 44°C | 50% of verified average daily earnings |
| Above 44°C | 100% of verified average daily earnings |

Plain-English rationale: Deliveries in moderate heat slow but do not fully stop. The 50% benefit reflects partial income disruption rather than total shutdown. Above 44°C, delivery conditions are dangerous and platforms typically reduce or suspend dispatch, making the full daily benefit appropriate. Because payout is a direct percentage of what the worker actually earns, this grading directly mirrors the real income impact of each heat band.

#### Trigger 2 — Heavy Rain and Flooding

Trigger condition: 3-hour accumulated rainfall at the zone's coordinates exceeds 40mm across at least two consecutive polling cycles, OR the zone's administrative district is under an official IMD Orange or Red rainfall alert.

Data sources: OpenWeatherMap `rain.3h` field (primary), IMD district alert feed (secondary/confirming), and for severe events, the NDMA public disaster alert feed (tertiary).

| Condition | Daily Benefit |
|---|---|
| 40 – 80mm in 3hrs, no official alert | 70% of verified average daily earnings |
| IMD Orange alert confirmed | 70% of verified average daily earnings |
| IMD Red alert confirmed | 100% of verified average daily earnings |
| 80mm+ in 3hrs with Red alert | 100% of verified average daily earnings |
| NDMA flood disaster declaration | 100% of verified average daily earnings (capped at 7 days) |

#### Trigger 3 — Severe Air Pollution

Trigger condition: AQI at the nearest CPCB-linked monitoring station to the registered area exceeds 300 for a sustained minimum of 3 hours during the covered shift window, confirmed across at least two consecutive polling cycles.

Data source: OpenAQ API — a public aggregator of CPCB (Central Pollution Control Board) station data.

Severity grading:

| AQI Range | Daily Benefit |
|---|---|
| 300 – 400 (Very Poor) | 40% of verified average daily earnings |
| 400+ (Severe / Hazardous) | 80% of verified average daily earnings |

Rationale for 80% rather than 100%: even at AQI 400+, delivery platforms do not formally pause operations. The income loss is driven by consumer demand collapse and unsafe working conditions rather than a platform-level shutdown, making partial benefit more honest.

#### Trigger 4 — Official Civic Disruptions

Trigger condition: a government-issued prohibitory order (Section 144 CrPC), curfew, or declared civic emergency is confirmed to apply to an area that geographically encompasses the worker's registered zone.

Data sources: NewsAPI (keyword search with geographic filtering, queried every 4 hours), and the PIB (Press Information Bureau) RSS feed for official government announcements. A raw news mention alone is not sufficient — the geographic entity named in the source must be parsed and matched against the worker's zone using place-name matching against the GigShield zone database. Social media is explicitly excluded as an authoritative source for civic disruption triggers due to reliability and verifiability concerns.

Benefit: 100% of verified average daily earnings for each hour of confirmed civic restriction overlapping with the covered shift window.

#### Trigger 5 — Official Natural Disaster Alerts

Trigger condition: an official natural disaster declaration or high-severity emergency alert is issued by NDMA, a state disaster management authority, or an equivalent recognized public body for a region that encompasses the worker's registered zone.

This trigger is designed to be generalized across disaster types — flooding, cyclone, earthquake impact zone, severe storm — rather than being limited to any single event category. The condition is the existence of an official declaration from an authorized public source, not the event type itself.

Benefit: 100% of verified average daily earnings for the duration of the declared emergency, up to a maximum of 7 consecutive days before the claim enters review.

#### Duplicate Claim Prevention

The database enforces a composite unique constraint on `(policy_id, trigger_event_id)` in the claims table. A single trigger event — identified by the zone ID, disruption type, and time window — can generate at most one claim record per active policy, regardless of how many times the polling loop runs during an ongoing event. Subsequent polling cycles during the same event extend the recorded event duration rather than creating new claim records. This is enforced at the database layer, not just at the application layer.

---

### 3.5 Weekly Premium Model

#### Pricing Architecture

The weekly premium for any given renewal is determined by four components: a dynamic base rate derived from the worker's verified trailing average daily earnings, a Zone Risk Factor reflecting the historical disruption frequency of the registered area, a Time Risk Factor derived from near-term public forecast signals for the upcoming week, and a Claims Loading Factor that temporarily increases the premium if the worker has received repeated recent payouts.

The base rate derivation from platform earnings is the central architectural shift from a tier-based model. Rather than selecting from a fixed menu of benefit amounts, the worker's coverage level is anchored to what the Mock Platform API confirms they actually earn. This makes the pricing formula both more equitable and more actuarially defensible.

#### Core Formula

```
Base Rate = verified_trailing_average_daily_earnings × earnings_rate_coefficient × 7

Weekly Premium = Base Rate × Zone Risk Factor × Time Risk Factor × Claims Loading Factor
```

Where:
- `earnings_rate_coefficient` is set to 0.025 in the current model — meaning a worker earning ₹800/day has a base weekly premium of approximately ₹140, and a worker earning ₹1,500/day has a base weekly premium of approximately ₹262.
- The formula reflects the fact that a higher-earning worker has both more to lose in a disruption and a higher expected payout magnitude, making a proportionate premium structurally sound.

Subject to:

```
Floor ≤ Weekly Premium ≤ Cap
Floor = ₹50
Cap = ₹400
```

The floor ensures the product remains accessible even in the lowest-risk zones and for workers with lower declared earnings. The cap ensures that surcharges from high-risk conditions or recent claims history never price a worker out of coverage entirely.

---

#### Zone Risk Factor (ZRF)

The Zone Risk Factor captures how frequently the registered operating area has experienced qualifying disruption events over the trailing 12 months, weighted by the number of disruptions and their average severity. Workers in high-risk zones pay a scaled premium because their opportunity to claim — and the statistical probability of a qualifying event occurring — is mathematically higher. This is not a penalty; it is a reflection of genuine actuarial exposure.

```
ZRF = 1.0 + α × (historical_trigger_days_12m / baseline_trigger_days_12m - 1)
```

Where:
- `historical_trigger_days_12m` is the count of days in the past 12 months on which at least one trigger event was recorded for the zone.
- `baseline_trigger_days_12m` is the city-wide average trigger day count across all registered zones, representing what a "neutral" zone looks like.
- `α` is a smoothing coefficient (set to 0.4 in the current model) that prevents extreme zones from dominating the factor.
- ZRF is bounded: minimum 0.80, maximum 1.50.

Plain-English interpretation: A zone that has historically experienced exactly the city average number of disruptions gets a ZRF of 1.0 — no change to the earnings-derived base rate. A zone that has experienced twice the city average gets a ZRF above 1.0, increasing the premium. A zone that has experienced far fewer disruptions than average gets a ZRF below 1.0, providing a modest discount. The α coefficient prevents a zone with a single unusually bad year from being permanently penalized at a high multiple.

---

#### Time Risk Factor (TRF)

The Time Risk Factor adjusts the premium upward or downward based on objective public risk signals specific to the coming week in the worker's registered zone. It is used for premium pricing only and has no role in claim authorization.

```
TRF = 1.0 + β × normalized_week_risk_score
```

Where:
- `normalized_week_risk_score` is derived from the zone/week risk estimation model (described in Section 3.7), taking values from -1.0 (very low forecast risk) to +1.0 (very high forecast risk).
- `β` is a sensitivity coefficient (set to 0.25 in the current model).
- TRF is bounded: minimum 0.90, maximum 1.25.

Plain-English interpretation: In a week where forecasts signal a high probability of trigger-level weather or civic disruption in the zone, the premium rises by up to 25 percent above the zone-adjusted rate. In a calm forecast week, the premium can be up to 10 percent below the zone-adjusted rate.

---

#### Claims Loading Factor (CLF)

The Claims Loading Factor temporarily increases the premium for workers who have received multiple disruption benefit payouts in a recent window. It decays gradually over subsequent claim-free weeks.

```
CLF(t) = 1.0 + λ × sum_of_recent_claims × decay_factor(t)
decay_factor(t) = e^(-δ × weeks_since_last_claim)
```

Where:
- `λ` is the loading sensitivity coefficient (set to 0.05 per recent claim).
- `sum_of_recent_claims` counts the number of paid claim events within the trailing 8 weeks.
- `δ` is the decay rate (set to 0.35, meaning the loading reduces by approximately 30 percent per claim-free week).
- CLF is bounded: minimum 1.00, maximum 1.40.

Plain-English interpretation: A worker who has received 4 claim payouts in the past 8 weeks will see their CLF rise to approximately 1.20, adding 20 percent to their zone- and time-adjusted premium. Each week they complete without a new claim, the loading decays. After roughly 5 to 6 claim-free weeks, the CLF returns close to 1.00 and the premium normalizes. This structure discourages workers from treating the product as a routine income supplement while not permanently punishing those who operate in genuinely high-disruption zones during bad weather seasons.

---

#### Sample Premium Outputs

The following table shows illustrative final weekly premiums for workers at different verified daily earning levels across combinations of zone risk and forecast risk (CLF = 1.00 in all rows for clarity).

| Verified Daily Earnings | Base Rate | Zone Risk | ZRF | Forecast | TRF | Final Premium |
|---|---|---|---|---|---|---|
| ₹500/day | ₹42 | Low | 0.88 | Calm | 0.93 | ₹50 (floor applied) |
| ₹700/day | ₹59 | Average | 1.00 | Calm | 0.93 | ₹55 |
| ₹900/day | ₹76 | Average | 1.00 | Moderate | 1.00 | ₹76 |
| ₹1,100/day | ₹92 | Moderate | 1.10 | Elevated | 1.12 | ₹114 |
| ₹1,300/day | ₹109 | High | 1.35 | Elevated | 1.18 | ₹174 |
| ₹1,500/day | ₹126 | High | 1.45 | Peak risk | 1.25 | ₹229 |
| ₹1,500/day | ₹126 | Extreme | 1.50 | Peak risk | 1.25 | ₹236 |
| Any | Any | Any | Any | Any | Any | Cap applied: ₹400 |

The table illustrates that a higher-earning worker in a higher-risk zone pays a proportionately higher premium — which is consistent with their higher expected payout magnitude and their higher statistical exposure to trigger events.

---

#### Claims Loading Decay Over Time

The following table shows how the CLF evolves for a worker who received 4 claim payouts in a concentrated 4-week period and then has no further claims. Premium base assumes ₹900/day verified earnings, ZRF 1.00, TRF 1.00 (Base Rate = ₹76).

| Week After Last Claim | Recent Claims (trailing 8 wks) | Decay Factor | CLF | Final Premium |
|---|---|---|---|---|
| 0 (at peak) | 4 | 1.00 | 1.20 | ₹91 |
| 1 | 4 | 0.70 | 1.14 | ₹87 |
| 2 | 4 | 0.50 | 1.10 | ₹84 |
| 3 | 4 | 0.35 | 1.07 | ₹81 |
| 4 | 3 (oldest drops off) | 0.25 | 1.04 | ₹79 |
| 6 | 2 | 0.13 | 1.01 | ₹77 |
| 8 | 0 (all drop off) | — | 1.00 | ₹76 |

A worker returns to their normalized earnings-adjusted premium within approximately 8 weeks of a high-claim period ending, as long as no new claims are received.

---

### 3.6 Fraud Defense Architecture

#### The Problem Framing

The most plausible fraud attack on a parametric disruption product is not necessarily GPS spoofing at the device level — it is any behavior that attempts to misalign a worker's eligibility position with a trigger event they would not organically have been covered for. This includes activating coverage immediately before a known event, switching zones to match an imminent trigger, or attempting to claim for a disruption window during which the worker was not actually scheduled or active on their delivery platform.

GigShield's fraud defense is organized in three layers and designed around a core economic principle: **fraud should not be cost-effective**. Perfect technical fraud prevention is impossible. The goal is to make sustained, systematic abuse expensive, risky, and low-yield enough that it is not worth attempting relative to the legitimate use of the product.

#### Layer 1 — Structural Defenses (Remove the Attack Surface)

The most effective fraud defense is to remove the mechanism that fraud would exploit. GigShield's trigger evaluation is entirely server-side and uses public data queried at stored zone coordinates. Worker device GPS has no role in determining whether a trigger fires. A worker cannot manipulate the OpenWeatherMap reading for Koramangala by spoofing their phone's location.

**Mock Platform API dispatch verification** is the most consequential structural addition to the fraud defense model. When a trigger fires and a payout is being authorized, the backend queries the Dispatch Status Endpoint for the disruption time window. If the API confirms the worker was not scheduled or had logged off before the disruption began, the claim is not authorized. This cross-check closes an entire category of fraud: a worker who deliberately times platform logins or shift registrations to capture disruption payouts will be detectable through dispatch record inconsistencies between their claimed availability and their actual platform activity. Unlike GPS-level spoof detection — which is partial and imperfect — platform dispatch verification is a structural check that operates on authoritative platform-side records rather than device signals.

Additional structural defenses include waiting periods (described above), the absence of any manual claim submission flow, and the composite unique constraint on the claims table that makes duplicate claim creation for the same event physically impossible in the database.

#### Layer 2 — Software-Level Spoof and Anomaly Detection

Where device location data is collected for work-area consistency purposes (described in Section 3.8), the system applies anomaly scoring to the location trace. This layer has two sub-components.

**Direct spoofing signals**, where detectable: mock location applications on Android often produce identifiable behavioral signatures — unnaturally smooth movement, coordinates that jump discontinuously between readings, GPS speed values inconsistent with reported position changes, or coordinate precision inconsistent with consumer-grade GPS. The presence of any of these signals elevates the fraud risk score. These signals are not always present in sophisticated spoofing attempts, and the system does not claim to detect all forms of device-level location manipulation.

**Movement anomaly scoring** applies regardless of whether direct spoofing indicators are present. The system computes the following signals from collected location traces:

- **Zone switch frequency:** how often the worker's reported operating area changes relative to the population average.
- **Distance jump magnitude:** large instantaneous coordinate changes that imply physically impossible travel speeds given the time between readings.
- **Path inconsistency:** movement patterns that are inconsistent with the worker's own historical operating behavior.
- **Timing alignment with high-risk events:** location trace behavior that changes specifically around trigger event windows, with stable patterns at other times.
- **Dispatch record inconsistency:** divergence between the worker's platform-confirmed dispatch windows (from the Mock Platform API) and their device-reported location traces. A worker whose device trace places them outside their registered zone during a period the platform confirms they were actively dispatching is a meaningful anomaly signal.

Large-distance jumps are not automatically classified as fraud. A worker legitimately changing employers and operating areas may show a large jump. The signal is that a sudden large-distance jump, combined with other signals such as a recent area change, a new account, or unusual timing, creates a cumulative picture that elevates the fraud risk score.

Importantly, **sparse suspicious behavior accumulates over time and does not reset cleanly**. If a worker triggers elevated fraud scores in weeks 2, 5, and 9 of their account history — even with no single definitive incident — the system maintains this history and weights it in subsequent fraud scoring. Repeated sparse suspicious behavior is treated as a meaningful pattern rather than as isolated noise.

#### Layer 3 — Business-Rule Friction (Make Abuse Economically Unattractive)

Even if technical fraud detection misses an individual attempt, the following structural features reduce the expected profit from systematic abuse:

- **KYC friction at onboarding:** Phone number OTP and UPI identity linkage create a traceable identity. Creating a new account requires a real phone number. There is a practical cost to running multiple fake accounts at scale.
- **Platform account linkage:** Connecting a verified platform worker account via the Mock Platform API adds a second identity anchor. Fabricating a credible platform earning history is a significantly higher barrier than creating a new phone number.
- **Waiting periods:** A 7-day activation wait and a 7-day area-change cooling period mean that opportunistic coverage alignment with a known upcoming event cannot be completed quickly.
- **Payout delay for flagged claims:** Claims with high fraud risk scores are held for several hours to days pending review. Payout delay reduces the liquidity value of fraudulent claims.
- **Claims loading surcharge:** Repeated successful fraudulent claims raise the worker's own premium over time, reducing the per-claim profit margin of continued abuse.
- **Account suspension risk:** Confirmed abusive behavior can result in payout denial, policy suspension, and account restriction subject to policy terms and review.
- **Possible legal escalation:** Where evidence from human review supports it, the insurer may pursue recovery efforts or escalate to relevant authorities.

#### Fraud Risk Score — Formula and Behavior

Each active account maintains a rolling fraud risk score. The score accumulates when suspicious signals are observed and decays gradually when no new signals are triggered.

```
FRS(t) = FRS(t-1) × e^(-γ × weeks_since_last_signal) + sum(signal_weights_this_week)
```

Where `γ` is the decay coefficient (set to 0.20).

| Signal | Weight |
|---|---|
| Area change in past 7 days | +8 |
| 3+ area changes in past 30 days | +20 |
| New account (< 14 days old) | +10 |
| First claim in first covered week | +12 |
| Claim within 48 hrs of area change | +18 |
| Direct spoof indicator detected | +30 |
| Large distance jump (> 20 km instant) | +15 |
| Path inconsistency (vs historical) | +10 |
| Suspicious timing alignment | +12 |
| Multi-source event disagreement | +10 |
| Dispatch record inconsistency (platform vs device trace) | +22 |

FRS is bounded between 0 and 100.

**Fraud score action thresholds:**

| FRS Range | Action |
|---|---|
| 0 – 35 | Immediate payout, no hold |
| 36 – 60 | Secondary automated re-verification (re-query public sources, cross-check dispatch records). If checks pass, payout released within 2 hours. Worker notified of brief verification delay. |
| 61 – 80 | Payout held, insurer admin alerted, human review initiated within 24 hours. Worker receives transparent notification that review is in progress with estimated timeline. |
| 81 – 100 | Payout held, account flagged for priority review. Further claims suspended pending outcome. |

---

### 3.7 Risk Estimation Models

Two separate analytical models support GigShield's pricing and fraud detection functions. These are not the same model and must not be confused with each other.

#### Zone-Week Risk Estimation Model (Pricing Support)

This model estimates the probability that a worker's registered zone will experience at least one qualifying trigger event in the upcoming 7-day window. Its output feeds into the Time Risk Factor in the weekly premium formula.

**Features:**

- 7-day weather forecast signals for the zone (temperature, precipitation probability, forecast AQI trend) from OpenWeatherMap and OpenAQ.
- Historical trigger event frequency for the zone over the trailing 12 months, by disruption type.
- Geographic zone characteristics derived from public OpenStreetMap data: proximity to major water bodies, estimated elevation, density of industrial zones within 5 km (as a pollution risk proxy).
- Week-of-year index (to capture seasonal patterns without over-relying on a rigid seasonal calendar).
- Recent zone conditions: how many trigger events occurred in the zone in the past 4 weeks.

**Model type:** Gradient-boosted decision tree (XGBoost) trained on synthetically generated zone-week data structured to reflect realistic Indian city disruption patterns. The model supports pricing decisions only. It does not authorize or deny claims.

#### Movement Anomaly Model (Fraud Detection Support)

This model scores how anomalous a worker's recent location trace behavior is relative to their own historical pattern and relative to the population of workers in the same zone.

**Features:**

- Zone switch frequency over trailing 30 days.
- Maximum single-step distance jump in the trailing 7 days.
- Ratio of current-week operating area centroid to historical operating area centroid.
- Claim-timing-aligned movement anomaly: change in movement pattern within 48 hours before a trigger event relative to non-event baseline.
- Account age in weeks.
- Frequency of elevated anomaly scores in trailing 60 days.
- Dispatch record consistency score: correlation between platform-confirmed dispatch windows and device-reported location activity.

**Model type:** Hybrid — a rule-based scoring system for explicit high-weight signals (direct spoof indicators, area changes, account age, dispatch inconsistencies), combined with an isolation forest for continuous movement features. The isolation forest identifies observations that are unusual relative to the population of normal working patterns, without requiring explicit fraud labels.

Both models are presented as subject to ongoing calibration as real operational data accumulates. In the hackathon, models are trained on synthetic data. In production, they would be retrained as real claim and movement data is collected, with periodic validation against actual fraud outcomes identified through human review.

---

### 3.8 Offline-First Location Tracking

GigShield collects location traces from the worker's device during active covered work windows for work-area consistency verification and movement anomaly detection. This collection is not continuous or unlimited. It is bounded to covered shift windows, uses the device's last known location with periodic updates rather than high-frequency GPS polling, and is explicitly scoped to the two purposes above.

Location traces are collected locally on the device first, stored in the PWA's local storage or IndexedDB, and synced to the server in periodic batches when the device has a reliable connection. This offline-first design reduces mobile data consumption for workers on limited data plans.

Workers are informed clearly at onboarding that location traces are collected for work-area verification and fraud detection purposes, and that they are not used for any purpose beyond GigShield's own risk and fraud functions. No location data is shared with delivery platforms or third parties.

Location data is not the primary trigger for any claim. It does not determine whether a disruption event occurred. It is one input into the fraud scoring system and, over time, into the zone risk estimation model as an aggregated, anonymized signal about the actual geographic distribution of workers in each zone.

---

### 3.9 Technology Stack Summary

#### Frontend

React.js with Vite for fast bundling. Tailwind CSS for mobile-first styling. React Query for server-state management and API response caching. Recharts for analytics dashboard visualizations. Workbox for the PWA service worker and offline capability. Push notifications on Android via the Web Push API.

#### Backend

FastAPI (Python) for REST endpoints and background task hosting. APScheduler for the 30-minute trigger polling loop, embedded in the FastAPI process. JWT-based session authentication. Firebase Authentication for OTP phone verification on its free tier. Pydantic models for request and response validation throughout.

#### Database

PostgreSQL with the following core tables: `workers`, `registered_areas`, `area_change_log`, `policies`, `trigger_events`, `claims`, `fraud_score_log`, `location_traces` (partitioned by week), and `platform_earnings_snapshots` (stores the verified trailing earnings figure fetched at each onboarding or renewal, preserving a timestamped audit trail of the earnings baseline used for each policy period). Critical constraints enforced at the database layer include the composite unique constraint on `(policy_id, trigger_event_id)` in the claims table, and a foreign key chain ensuring no claim can exist without a valid active policy and a valid confirmed trigger event.

#### External Data Sources

| Provider | Purpose | Tier |
|---|---|---|
| Mock Platform API (Swiggy/Zepto simulation) | Verified trailing average daily earnings; dispatch status for claim authorization | Simulated REST endpoints (hackathon prototype) |
| OpenWeatherMap | Temperature, rainfall, weather forecast | Free tier (prototype); paid for production |
| OpenAQ | CPCB AQI data | Public API; register for stable access in production |
| IMD District Alerts | Official IMD weather alerts | Public feed |
| NDMA Disaster Feed | Official disaster declarations | Public feed |
| PIB RSS | Official government civic announcements | Public feed |
| NewsAPI | Civic disruption keyword detection | Free tier (prototype use) |
| Firebase Auth | OTP phone verification | Free tier |
| Razorpay (Test Mode) | Premium collection and payout simulation | Sandbox (demo only) |
| OpenStreetMap / Overpass API | Zone geographic features for risk model | Free, open license |

The Mock Platform API is the critical addition to this stack. A production deployment would replace the simulated endpoints with authenticated integrations against real Q-Commerce platform data APIs, subject to data sharing agreements and IRDAI compliance requirements.

---

## Challenges We Ran Into

#### Designing a Unified Earnings Data Architecture Across Disparate Platform APIs

The most significant architectural challenge was designing the Mock Platform API layer to normalize and ingest earning data from structurally different Q-Commerce platform data models. Swiggy's internal earning records, for example, distinguish between base delivery pay, incentive bonuses, and tip income in ways that differ from Zepto's order-completion payout structure. A naive averaging approach would produce an earnings baseline that is inconsistent across platforms, making cross-worker comparisons and actuarial modeling unreliable. Resolving this required defining a normalized `trailing_average_daily_earnings` schema that maps each platform's payout components to a consistent active-day earning figure — excluding voluntary rest days from the denominator, capping anomalous incentive spikes that do not reflect a worker's typical earnings, and timestamping each snapshot so the policy period is always anchored to a clearly defined data vintage.

The resulting normalized API layer is a meaningful piece of infrastructure in its own right: it creates a unified risk profile for each worker that is platform-agnostic, auditable, and consistent with the payout formula. Getting the normalization logic right — and ensuring it was robust to missing data, partial week records, and platform-side delays in earnings reconciliation — required more iteration than expected.

#### Dynamic Work Areas

The original design treated Q-Commerce workers as permanently anchored to a single dark store. Workers change employers, get reassigned, and shift between dispatch hubs. This meant that the registered area model had to support updates while also introducing waiting periods to prevent the updates from being exploited as a timing mechanism. Calibrating the waiting period to be long enough to close the forecasting arbitrage window without being so long that it becomes a barrier to legitimate area changes required explicit reasoning about public forecast horizons.

#### Imperfect Spoof Detection

GPS spoofing cannot be perfectly detected. This is a real limitation that took time to think through honestly rather than paper over with overconfident technical claims. The resolution — structuring the core trigger mechanism to be entirely independent of device GPS, and anchoring the primary fraud defense to platform dispatch verification rather than device-level signals — is conceptually clean, but it required accepting that some potential fraud signals (anomalous device behavior) are useful for fraud scoring but not reliable enough to be used as direct claim triggers.

#### Earnings Volatility and the Trailing Window Choice

A worker's daily earnings in Q-Commerce are not stable. Monsoon months, festival seasons, and platform-side incentive campaigns can spike earnings by 40 to 60 percent above baseline for short windows. A naive trailing average that captures a festival spike would inflate both the worker's payout entitlement and their premium for the following weeks — neither of which reflects their typical economic position. Designing the trailing window to use a 30-day active-day average with a cap on anomalous earning days (days more than 2 standard deviations above the worker's own median) was the resolution, but getting the cap threshold right without systematically understating legitimate high-earning weeks required careful parameter testing.

#### Long-Duration Risk Exclusions

Defining the boundary between short-duration, event-bounded disruption (which GigShield covers) and long-duration systemic loss (which it does not) was harder than expected. The product design needed to be explicit about events like extended monsoon seasons, multi-week pollution crises, and prolonged civic disruptions — these are real scenarios that workers face, and the honest answer is that they are outside GigShield's current scope rather than awkwardly included.

#### Balancing Automation with Fairness

A fully automated claim system is fast and frictionless for workers, but it carries the risk of incorrectly holding or denying legitimate claims based on fraud scores. The design needed to specify exactly what happens to a legitimate worker who is incorrectly flagged — they receive a transparent notification with an estimated timeline, the automated secondary check gives them a first pass without human involvement, and human review is a backstop rather than a first resort.

---

## Accomplishments That We're Proud Of

**A unified dynamic earnings architecture.** Successfully designing a system that ingests and normalizes earning data from structurally disparate Q-Commerce platform APIs — and converts that data into a consistent, auditable risk profile for each worker — is the technical achievement that makes the income-linked model possible. The normalized `trailing_average_daily_earnings` schema is platform-agnostic, handles edge cases in earnings data honestly, and creates a pricing and payout foundation that is both fair to workers and defensible to regulators.

**A realistic automatic claims model.** Claims are never triggered by instantaneous readings, never filed by workers, and never dependent on device GPS. The multi-source, sustained-window observation requirement makes the trigger pipeline robust to API noise and data anomalies. The addition of platform dispatch verification at the point of payout authorization adds a structurally meaningful second check that is grounded in platform-side records rather than device signals.

**A coherent and explainable pricing architecture.** The premium formula has four components — earnings-linked base rate, Zone Risk Factor, Time Risk Factor, and Claims Loading Factor — each with a clear meaning, a bounded range, and a plain-English rationale. The Zone Risk Factor in particular reflects a well-reasoned principle: workers in high-risk zones pay a scaled premium because their statistical probability of claiming, and the expected magnitude of their payout, are both mathematically higher. The pricing is not punitive; it is proportionate.

**A layered fraud defense that acknowledges its own limits.** Rather than claiming fraud can be detected perfectly, the design is honest that direct spoof detection is partial and imperfect, explains exactly what it does and does not catch, and frames the primary defense as a combination of structural removal of attack surfaces (platform dispatch verification, server-side trigger evaluation) and economic deterrence — making abuse unprofitable rather than technically impossible.

**Scope discipline.** GigShield explicitly excludes a long list of things it does not cover, explains why, and does not overclaim. This makes the product more credible to judges, more defensible to workers, and more actionable for future development than a product that vaguely promises comprehensive coverage.

---

## What We Learned

The most important lesson from building GigShield was that **a model is only as honest as the data that anchors it**. The earlier fixed-benefit design was operationally clean precisely because it made no claims about verified income — it sidestepped the data problem entirely by paying flat amounts. Moving to an income-linked model required confronting the data problem directly: where does the earnings figure come from, how is it normalized, and what happens when it is anomalous or incomplete? Working through the Mock Platform API architecture — and the normalization decisions it required — made the final model far more robust and defensible than the flat-benefit approach it replaced, but it also made clear that every design decision in the earnings data pipeline has downstream consequences for both product fairness and actuarial soundness.

The second major lesson was about the difference between **what makes a feature impressive and what makes it defensible**. ML-based fraud detection sounds more compelling than a rule-based scoring system. But if the ML model cannot be explained to a regulator or a challenged worker, and if it is trained on synthetic data of uncertain quality, its functional contribution is limited. The hybrid rule-plus-model approach is less glamorous but more honest about what the model can reliably do at this stage.

The third lesson was about **scope creep as a design risk**. Parametric insurance products fail when they try to cover too much with too little certainty. A product that covers only discrete, publicly observable, short-duration events — and says so explicitly — is operationally tractable. A product that tries to cover all income disruption, including long-duration and systemic risks, requires capital, regulatory approvals, and actuarial infrastructure that a hackathon project cannot realistically model.

---

## What's Next for GigShield

**Live platform API integration.** The Mock Platform API layer is the most important near-term engineering milestone. Replacing the simulated endpoints with authenticated integrations against real Swiggy, Zepto, and Blinkit earning data APIs requires commercial data sharing agreements and IRDAI-compatible data handling commitments, but it is the step that converts the income-linked model from a prototype into a deployable product.

**Data calibration from real operational exposure.** The premium formula's coefficients — the earnings rate coefficient, α, β, λ, δ, γ — are currently set to reasonable prototype values. Real calibration requires actual claims data, actual fraud outcomes from human review, and real zone disruption frequency from accumulated API polling. The first meaningful improvement after deployment would be recalibrating these coefficients against observed loss ratios and fraud rates, particularly the earnings rate coefficient, which needs to be validated against actual claim severity distributions.

**Earnings anomaly handling in production.** The trailing window normalization logic — capping anomalous high-earning days, handling partial week records, and managing platform-side reconciliation delays — needs stress-testing against real platform data patterns before it can be relied on in a production premium calculation. Festival season spikes, platform incentive campaigns, and mid-month onboarding edge cases are the scenarios most likely to expose weaknesses in the current normalization design.

**Stronger anomaly detection models.** The movement anomaly model is currently a hybrid rule-plus-isolation-forest approach trained on synthetic data. As real location trace data and dispatch record consistency data accumulates under consent, the model can be retrained on genuine behavioral patterns, improving both the precision of fraud detection and the fairness of flagging thresholds.

**Regulated-insurer alignment.** GigShield as designed is a product concept. Converting it into a regulated insurance product in India requires IRDAI compliance, which involves product filing, reinsurance arrangements, solvency requirements, and policyholder protection obligations. Engaging with a licensed insurance partner or pursuing IRDAI's regulatory sandbox pathway is the path from concept to market.

**Better zone mapping and geographic precision.** The current zone model uses a center coordinate and a radius. More precise zone boundaries — based on ward boundaries, postal zones, or platform delivery radius data — would improve trigger accuracy and reduce the ambiguity of edge cases where a worker's zone is partially but not fully affected by a disruption.

**Privacy-preserving telemetry refinement.** The current location collection model is narrow and responsible, but it can be made more privacy-preserving through techniques such as local differential privacy on aggregated movement traces, on-device anomaly pre-scoring that transmits only a score rather than raw coordinates, and clearer retention and deletion policies for location data.

---

*GigShield — Dynamic, income-linked disruption cover for the workers who keep urban supply chains running.*
