# Lead Count Calculator PRD

## 1. Purpose

Build a simple, founder-facing online calculator that shows **exactly how much outbound volume is required to hit a target number of customers per month**.

This calculator is not educational fluff.
It is a **decision-making tool** that:

* Quantifies effort
* Sets realistic expectations
* Justifies infrastructure (domains, inboxes, leads)

Primary use:

* Pre‑sales asset
* Sales calls
* Founder self‑qualification

---

## 2. Target User (ICP)

**B2B Service Agency Founders**

* Revenue: $300k–$3M
* Founder-led sales
* Doing or considering cold outbound
* Feels revenue uncertainty

They want one answer:

> “What do I actually need to send to close X deals per month?”

---

## 3. Core Outcome

The user leaves knowing:

* Emails required (day + month)
* Leads required per month
* Domains required
* (Optional) Mailboxes required

And understands:

> Deals are math, not hope.

---

## 4. Inputs (User Editable)

### 4.1 Target

* **Target Customers per Month (X)**

  * Type: Number
  * Required

---

### 4.2 Funnel Rates

All rates accept % or decimal.

* **Reply Rate** (Email → Reply)
* **Appointment Rate** (Reply → Meeting)
* **Close Rate** (Meeting → Customer)

Validation:

* Each rate must be between 0 and 100%
* Zero values return warning state

---

### 4.3 Sending Capacity

* **Workdays per Month** (default: 22)
* **Emails per Domain per Day**
* **Emails per Lead** (sequence length, default: 3)

---

### 4.4 Optional: Mailbox Constraints

(Advanced toggle)

* **Emails per Mailbox per Day**
* **Mailboxes per Domain**

If enabled, domain calculation must respect mailbox limits.

---

## 5. Outputs (Calculated)

### 5.1 Core Metrics (Primary)

Displayed prominently.

* **Required Emails per Month**
* **Required Emails per Day**
* **Leads Required per Month**
* **Domains Required**

---

### 5.2 Funnel Reality Check (Secondary)

Displayed as supporting insight.

* Replies Needed per Month
* Appointments Needed per Month

Purpose:

* Make the funnel tangible
* Increase perceived seriousness

---

## 6. Calculation Logic

### 6.1 Required Emails per Month

```
Required_Emails_Month = Target_Customers / (Reply_Rate × Appointment_Rate × Close_Rate)
```

---

### 6.2 Required Emails per Day

```
Required_Emails_Day = Required_Emails_Month / Workdays_Per_Month
```

---

### 6.3 Domains Required (Standard)

```
Domains = Required_Emails_Day / Emails_Per_Domain_Per_Day
```

Round up.

---

### 6.4 Domains Required (Mailbox Mode)

```
Emails_Per_Domain_Day_Max = Emails_Per_Mailbox_Per_Day × Mailboxes_Per_Domain
Domains = Required_Emails_Day / Emails_Per_Domain_Day_Max
```

Round up.

---

### 6.5 Leads Required per Month

```
Leads_Month = Required_Emails_Month / Emails_Per_Lead
```

---

### 6.6 Funnel Reality Numbers

```
Appointments_Needed = Target_Customers / Close_Rate
Replies_Needed = Appointments_Needed / Appointment_Rate
```

---

## 7. UX Requirements

### 7.1 Layout

1. Target input (top)
2. Funnel rates
3. Sending capacity
4. Results panel (sticky / highlighted)

---

### 7.2 UX Principles

* No jargon
* Real-time calculation
* Large numbers, clear labels
* Rounding always upward (conservative)

---

### 7.3 Warnings & Guards

* If any rate < 1% → show warning: “Volume required will be high.”
* If domains > 20 → show note: “You’re operating at scale.”

---

## 8. Copy Requirements

### Headline

**“Know exactly how many emails, leads, and domains you need to hit your deal target.”**

### Subtext

“Outbound is math. This calculator shows the volume required to close X customers per month.”

---

## 9. Technical Requirements

* Static HTML + JS (no backend required)
* Instant recalculation on input change
* Mobile responsive
* Easy embed into existing site

---

## 10. Success Criteria

This PRD is successful if:

* A founder can self‑qualify in under 60 seconds
* Sales can reference it live on calls
* Users stop asking “will outbound work?” and start asking “can I support this volume?”

---

## 11. Non‑Goals

* Education on cold email theory
* Tool comparison
* Lead generation promises

This is **volume clarity**, not motivation.

---

## 12. Next Logical Extensions (Out of Scope)

* Cost calculator (infra + leads)
* ROI calculator
* Auto‑recommendation of outbound stack

---

**End of PRD**
