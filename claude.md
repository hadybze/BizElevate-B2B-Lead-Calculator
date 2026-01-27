# BizElevate B2B Lead Calculator - Development Guide

## Project Overview

A decision-making tool for B2B service agency founders to calculate the exact outbound volume needed to achieve their monthly customer targets. This is not educational content - it's a practical calculator that quantifies effort and sets realistic expectations for cold outbound campaigns.

## Target Users (ICP)

- B2B Service Agency Founders
- Revenue: $300k-$3M
- Founder-led sales
- Doing or considering cold outbound
- Need to answer: "What do I actually need to send to close X deals per month?"

## Core Functionality

### Input Parameters

1. **Target Metrics**
   - Target Customers per Month (required)

2. **Funnel Conversion Rates**
   - Reply Rate (Email → Reply)
   - Appointment Rate (Reply → Meeting)
   - Close Rate (Meeting → Customer)
   - Validation: 0-100%, warnings for zero values

3. **Sending Capacity**
   - Workdays per Month (default: 22)
   - Emails per Domain per Day
   - Emails per Lead (sequence length, default: 3)

4. **Optional: Mailbox Constraints** (Advanced toggle)
   - Emails per Mailbox per Day
   - Mailboxes per Domain

### Output Metrics

**Primary Outputs:**
- Required Emails per Month
- Required Emails per Day
- Leads Required per Month
- Domains Required

**Secondary Outputs (Funnel Reality Check):**
- Replies Needed per Month
- Appointments Needed per Month

## Calculation Formulas

```javascript
// Core calculations
Required_Emails_Month = Target_Customers / (Reply_Rate × Appointment_Rate × Close_Rate)
Required_Emails_Day = Required_Emails_Month / Workdays_Per_Month
Leads_Month = Required_Emails_Month / Emails_Per_Lead

// Domain calculations (standard mode)
Domains = ceil(Required_Emails_Day / Emails_Per_Domain_Per_Day)

// Domain calculations (mailbox mode)
Emails_Per_Domain_Day_Max = Emails_Per_Mailbox_Per_Day × Mailboxes_Per_Domain
Domains = ceil(Required_Emails_Day / Emails_Per_Domain_Day_Max)

// Funnel reality numbers
Appointments_Needed = Target_Customers / Close_Rate
Replies_Needed = Appointments_Needed / Appointment_Rate
```

## Technical Architecture

### Technology Stack
- **Static HTML + JavaScript** (no backend required)
- Vanilla JS or lightweight framework
- Mobile responsive design
- Easy embed capability

### Key Requirements
- Real-time calculation on input change
- All rounding should be upward (conservative estimates)
- Instant recalculation (no submit button)
- Clean, professional UI

## UX Principles

1. **No jargon** - Clear, founder-friendly language
2. **Large numbers, clear labels** - Outputs should be immediately scannable
3. **Real-time feedback** - Calculate as user types
4. **Conservative estimates** - Always round up

### Layout Structure
1. Target input (top)
2. Funnel rates section
3. Sending capacity section
4. Results panel (sticky/highlighted)

### Warnings & Guards
- If any rate < 1% → "Volume required will be high"
- If domains > 20 → "You're operating at scale"
- If any rate = 0 → Warning state

## Copy Requirements

**Headline:**
"Know exactly how many emails, leads, and domains you need to hit your deal target."

**Subtext:**
"Outbound is math. This calculator shows the volume required to close X customers per month."

## Success Criteria

The tool succeeds if:
- A founder can self-qualify in under 60 seconds
- Sales can reference it live on calls
- Users shift from "will outbound work?" to "can I support this volume?"

## Non-Goals

- Education on cold email theory
- Tool comparison features
- Lead generation promises
- Cost/ROI calculators (future extensions)

## Development Approach

### Phase 1: Core Calculator
1. Set up project structure (HTML/CSS/JS)
2. Build input form with validation
3. Implement core calculation logic
4. Create results display panel
5. Add real-time recalculation

### Phase 2: Enhanced UX
1. Implement mailbox constraints toggle (advanced mode)
2. Add warnings and guards
3. Mobile responsive design
4. Polish visual design

### Phase 3: Testing & Deployment
1. Test edge cases (zero values, extreme numbers)
2. Validate calculations
3. Test on mobile devices
4. Prepare for embedding

## Important Notes

- This is a **pre-sales asset** - it should inspire confidence, not overwhelm
- Focus on clarity over complexity
- The tool should feel professional and trustworthy
- Performance matters - calculations should feel instant
- All numbers should be clearly labeled with units

## File Structure Recommendation

```
/
├── index.html          # Main calculator page
├── css/
│   └── styles.css      # Styling
├── js/
│   ├── calculator.js   # Core calculation logic
│   └── ui.js          # UI interactions and updates
├── prd.md             # Product requirements (reference)
├── claude.md          # This file
└── README.md          # Project documentation
```

## Next Steps

1. Set up basic HTML structure
2. Create input form with proper labels
3. Implement JavaScript calculation engine
4. Style the results panel
5. Add real-time interactivity
6. Test with realistic scenarios
7. Add warnings and edge case handling
8. Polish and optimize for production

---

**Project Focus:** Volume clarity, not motivation. This tool quantifies effort and sets realistic expectations for B2B outbound campaigns.
