# Plokitch — Execution Plan
> Version 1 · Updated 2026-04-15 · Internal team document

---

## 🧭 North Star
**Secure the market and own distribution.**
We are mediators — vendors are partners, couriers are ours, customers are the prize.

---

## 📍 Current Status: Phase 1 — Live

| Metric | Target | Status |
|---|---|---|
| Vendors onboarded | 2–3 | 🔄 In progress |
| Orders generated | 10–20 in 5 days | 🔄 In progress |
| Capital required | ₦0 | ✅ Achieved |
| App required | None | ✅ Confirmed |

---

## 🗺️ Four-Phase Roadmap

### ✅ Phase 1 — Now: Demand Generation (Manual)
- WhatsApp-based promotion (status + groups)
- Manual order coordination via WhatsApp DMs  
- No app, no logistics system needed
- 2–3 vendors, Gombe only
- **Validation goal:** Can we grow vendor daily sales?

### 🔲 Phase 2 — Soon: Basic Delivery Coordination
- Introduce a simple rider system  
- Partner with existing local riders
- Basic order tracking (WhatsApp / spreadsheet)
- Expand to 5–8 vendors
- **Validation goal:** Can we own last-mile?

### 🔲 Phase 3 — Later: Own the Logistics Network
- Build and train our own rider network
- Launch Plokitch app (MVP)
- Implement structured payments and wallets
- **Validation goal:** Can we own distribution?

### 🔲 Phase 4 — Future: Expand
- Onboard best-in-class restaurants (Lane B)
- Consider acquiring a delivery company
- Launch Restaurant SaaS (smart menu)
- Expand beyond Gombe
- Pre-seed funding secured by now

---

## 👥 Team Responsibilities

| Name | Role | This Week's Task | Definition of Done |
|---|---|---|---|
| Abdulmumini Muhammad Bello | Vendor acquisition & ops | Identify and approach 2–3 vendors in Gombe. Secure first verbal yes. | At least 2 vendors agreed and ready to receive orders |
| Muhammad Adam Aliyu | Demand creation & tech prep | Run WhatsApp promotion for first vendor. Build order tracking log. | First real customer order received and fulfilled |
| Nasir Ibrahim Imam | Customer outreach & order handling | Manage WhatsApp groups. Handle incoming orders. Coordinate with vendors. | 10 orders logged and coordinated this week |
| Dalhatu Usman Aliyu | Ops support & QA | Document every order. Track vendor feedback. Report daily to Adam. | Clean order log with vendor ratings for each delivery |

---

## 💻 Landing Page Progress

### ✅ Completed Sections
| Section | Component | Status |
|---|---|---|
| Navigation bar | `Navbar.tsx` | ✅ Updated — Plokitch branding, correct nav links |
| Hero | `HeroSection.tsx` | ✅ Rewritten — demand-gen angle, 3-sided market intro, stats |
| How It Works | `HowItWorksSection.tsx` | ✅ New — 5-step manual execution process |
| For Vendors | `VendorSection.tsx` | ✅ New — 6 vendor perks, 20% commission model |
| About / Pivot | `AboutSection.tsx` | ✅ Rewritten — pivot rationale, strategy card |
| Accountability | `AccountabilitySection.tsx` | ✅ New — order flow, fault table, escrow model |
| Roadmap | `RoadmapSection.tsx` | ✅ New — 4-phase plan, Phase 1 marked live |
| Revenue Model | `RevenueSection.tsx` | ✅ New — now (commission) vs later (subscription) |
| Vendor CTA | `VendorCTASection.tsx` | ✅ New — WhatsApp-integrated signup form |
| Footer | `FooterSection.tsx` | ✅ Updated — Plokitch branding, Gombe, correct links |
| SEO | `index.html` | ✅ Updated — title, description, OG tags |

### ❌ Removed Sections (Restaurant template — irrelevant)
- `MenuSection.tsx` (restaurant food menu)
- `TestimonialsSection.tsx` (restaurant diner reviews)
- `InstagramGallery.tsx` (restaurant gram gallery)
- `ReservationSection.tsx` (restaurant table booking)
- `BlogSection.tsx` (generic restaurant blog)
- `NewsletterSection.tsx` (restaurant newsletter)

---

## 🚀 Next Steps

### Immediate (This Week)
- [ ] **Vendor ops:** Abdulmumini to approach 2–3 home vendors in Gombe
- [ ] **Demand creation:** Adam to run first WhatsApp status promotions with real food photos
- [ ] **Order log:** Create a shared Google Sheet for order tracking
- [ ] **Feedback form:** Set up a simple WhatsApp-based feedback collection after each order

### Landing Page (Next Sprint)
- [ ] Add real food photography from Gombe vendor dishes
- [ ] Add real vendor stories / testimonials from first week
- [ ] Embed a working WhatsApp CTA with the actual business number
- [ ] Add analytics (e.g., Plausible or simple Supabase event tracking)
- [ ] Deploy to production domain

### Phase 2 Prep (When Phase 1 Succeeds)
- [ ] Design rider onboarding flow
- [ ] Create vendor dashboard wireframes
- [ ] Begin MVP app scoping
- [ ] Document every friction point observed in Phase 1 for Phase 2 design input

---

## 📊 Success Metrics — Week 1

We consider week 1 successful if:
1. ✅ At least **1 vendor increases daily orders** (e.g., from 3 to 8)
2. ✅ We generate **10–20 total orders**
3. ✅ Vendors **want to continue** working with us

---

## 💰 Revenue Model

| Stream | Timing | Details |
|---|---|---|
| Commission | **Now** | 20% per order, charged after vendor profit. No charge until vendor is earning. |
| Vendor subscription | **Phase 3+** | Monthly subscription once traction is proven |
| Restaurant SaaS (Lane B) | **Phase 4** | Smart menu SaaS for restaurants |
| Loyalty wallet spend | **Phase 4** | Loyalty program that unlocks wallet spending |

---

## ⚠️ Key Rules
- **No production code before demand is validated**
- **App comes after proof of demand — not before**
- **Manual execution first. Every friction = design input.**
- **We don't charge vendors until they are earning**
- **Two vendors. Ten orders. Five days. That is the only goal.**

---

*Plokitch Execution Plan v1 · Confidential · Gombe, 2025*
