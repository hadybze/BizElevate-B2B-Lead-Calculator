# Calculator Test Scenarios

Use these test cases to verify the calculator is working correctly before deployment.

## Test Scenario 1: Basic Calculation (Conservative Agency)

### Inputs:
- Target Customers per Month: **5**
- Reply Rate: **5%**
- Appointment Rate: **30%**
- Close Rate: **20%**
- Workdays per Month: **22**
- Emails per Domain per Day: **50**
- Emails per Lead: **3**

### Expected Outputs:
- Required Emails per Month: **1,667**
- Required Emails per Day: **76**
- Leads Required per Month: **556**
- Domains Required: **2**
- Replies Needed per Month: **84**
- Appointments Needed per Month: **25**

### Formula Check:
```
Conversion Rate = 0.05 × 0.30 × 0.20 = 0.003
Required Emails/Month = 5 / 0.003 = 1,666.67 → 1,667 (rounded up)
Required Emails/Day = 1,667 / 22 = 75.77 → 76 (rounded up)
Leads/Month = 1,667 / 3 = 555.67 → 556 (rounded up)
Domains = 76 / 50 = 1.52 → 2 (rounded up)
Appointments Needed = 5 / 0.20 = 25
Replies Needed = 25 / 0.30 = 83.33 → 84 (rounded up)
```

---

## Test Scenario 2: Aggressive Scale

### Inputs:
- Target Customers per Month: **20**
- Reply Rate: **3%**
- Appointment Rate: **25%**
- Close Rate: **15%**
- Workdays per Month: **22**
- Emails per Domain per Day: **50**
- Emails per Lead: **3**

### Expected Outputs:
- Required Emails per Month: **17,778**
- Required Emails per Day: **808**
- Leads Required per Month: **5,926**
- Domains Required: **17**
- Replies Needed per Month: **534**
- Appointments Needed per Month: **134**

### Formula Check:
```
Conversion Rate = 0.03 × 0.25 × 0.15 = 0.001125
Required Emails/Month = 20 / 0.001125 = 17,777.78 → 17,778
Required Emails/Day = 17,778 / 22 = 808.09 → 808
Leads/Month = 17,778 / 3 = 5,926
Domains = 808 / 50 = 16.16 → 17
Appointments Needed = 20 / 0.15 = 133.33 → 134
Replies Needed = 134 / 0.25 = 533.33 → 534
```

### Expected Warning:
- "Warning: One or more rates are below 1%. Volume required will be high."
- "You're operating at scale. You'll need 17 domains."

---

## Test Scenario 3: High Conversion Funnel

### Inputs:
- Target Customers per Month: **10**
- Reply Rate: **8%**
- Appointment Rate: **40%**
- Close Rate: **30%**
- Workdays per Month: **22**
- Emails per Domain per Day: **50**
- Emails per Lead: **3**

### Expected Outputs:
- Required Emails per Month: **1,042**
- Required Emails per Day: **48**
- Leads Required per Month: **348**
- Domains Required: **1**
- Replies Needed per Month: **84**
- Appointments Needed per Month: **34**

### Formula Check:
```
Conversion Rate = 0.08 × 0.40 × 0.30 = 0.0096
Required Emails/Month = 10 / 0.0096 = 1,041.67 → 1,042
Required Emails/Day = 1,042 / 22 = 47.36 → 48
Leads/Month = 1,042 / 3 = 347.33 → 348
Domains = 48 / 50 = 0.96 → 1
Appointments Needed = 10 / 0.30 = 33.33 → 34
Replies Needed = 34 / 0.40 = 83.33 → 84
```

---

## Test Scenario 4: Advanced Mode with Mailbox Constraints

### Inputs:
- Target Customers per Month: **10**
- Reply Rate: **5%**
- Appointment Rate: **30%**
- Close Rate: **20%**
- Workdays per Month: **22**
- Emails per Domain per Day: **Not used in advanced mode**
- Emails per Lead: **3**
- **Advanced Mode: ON**
- Emails per Mailbox per Day: **25**
- Mailboxes per Domain: **3**

### Expected Outputs:
- Required Emails per Month: **3,334**
- Required Emails per Day: **152**
- Leads Required per Month: **1,112**
- Domains Required: **3** (using mailbox constraints)
- Replies Needed per Month: **167**
- Appointments Needed per Month: **50**

### Formula Check:
```
Conversion Rate = 0.05 × 0.30 × 0.20 = 0.003
Required Emails/Month = 10 / 0.003 = 3,333.33 → 3,334
Required Emails/Day = 3,334 / 22 = 151.55 → 152
Leads/Month = 3,334 / 3 = 1,111.33 → 1,112

Advanced Mode Domain Calculation:
Emails per Domain per Day Max = 25 × 3 = 75
Domains = 152 / 75 = 2.03 → 3

Appointments Needed = 10 / 0.20 = 50
Replies Needed = 50 / 0.30 = 166.67 → 167
```

---

## Edge Case Tests

### Edge Case 1: Zero Values (Should Show Error)

#### Inputs:
- Target Customers per Month: **0**
- Reply Rate: **5%**
- Appointment Rate: **30%**
- Close Rate: **20%**

#### Expected Behavior:
- Error message: "Please enter a target number of customers per month."
- All outputs show "—"

---

### Edge Case 2: Zero Conversion Rate (Should Show Error)

#### Inputs:
- Target Customers per Month: **10**
- Reply Rate: **0%**
- Appointment Rate: **30%**
- Close Rate: **20%**

#### Expected Behavior:
- Error message: "Conversion rates cannot be zero. Please enter realistic rates."
- All outputs show "—"

---

### Edge Case 3: Very Low Rates (Should Show Warning)

#### Inputs:
- Target Customers per Month: **10**
- Reply Rate: **0.5%** (below 1%)
- Appointment Rate: **30%**
- Close Rate: **20%**

#### Expected Behavior:
- Calculation completes
- Warning: "Warning: One or more rates are below 1%. Volume required will be high."
- High email volume calculated

---

### Edge Case 4: Extreme Volume (Should Show Warning)

#### Inputs:
- Target Customers per Month: **100**
- Reply Rate: **1%**
- Appointment Rate: **20%**
- Close Rate: **10%**
- Workdays per Month: **22**
- Emails per Domain per Day: **50**

#### Expected Behavior:
- Calculation completes
- Required Emails per Day: **22,728**
- Warning: "This requires 22,728 emails per day. Ensure your infrastructure can support this volume."
- Warning about high domain count if domains > 20

---

### Edge Case 5: Missing Required Fields

#### Inputs:
- Target Customers per Month: **10**
- Reply Rate: **5%**
- Appointment Rate: **(empty)**
- Close Rate: **20%**

#### Expected Behavior:
- Error message: "Conversion rates cannot be zero. Please enter realistic rates."
- All outputs show "—"

---

## Manual Testing Checklist

### Functional Tests
- [ ] Enter valid inputs → Calculations appear instantly
- [ ] Change any input → Results update in real-time
- [ ] Toggle Advanced Mode → Mailbox fields appear/disappear
- [ ] Enter values in Advanced Mode → Domain calculation uses mailbox constraints
- [ ] Enter zero in required field → Error message appears
- [ ] Enter rate below 1% → Warning appears
- [ ] Calculate with domains > 20 → Info message appears
- [ ] Clear an input → Appropriate error handling

### UI/UX Tests
- [ ] All numbers format with commas (e.g., 1,000 not 1000)
- [ ] Large numbers are readable
- [ ] Warning boxes are clearly visible
- [ ] Input fields respond to hover/focus
- [ ] Toggle switch animates smoothly
- [ ] Results section is visually prominent
- [ ] All labels are clear and readable

### Responsive Tests
- [ ] Desktop view (1920×1080)
- [ ] Laptop view (1366×768)
- [ ] Tablet view (768×1024)
- [ ] Mobile view (375×667)
- [ ] Results section stacks properly on mobile
- [ ] Input fields are usable on touch devices
- [ ] Text is readable at all sizes

### Browser Compatibility Tests
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Calculation Accuracy Tests
- [ ] Run Scenario 1 → Verify outputs match expected
- [ ] Run Scenario 2 → Verify outputs match expected
- [ ] Run Scenario 3 → Verify outputs match expected
- [ ] Run Scenario 4 (Advanced) → Verify outputs match expected
- [ ] Verify all rounding is upward (conservative)
- [ ] Verify funnel reality numbers are correct

### Performance Tests
- [ ] Page loads in < 1 second
- [ ] Calculations are instant (< 100ms)
- [ ] No console errors in browser dev tools
- [ ] No JavaScript errors
- [ ] CSS loads correctly
- [ ] No 404 errors for assets

---

## Automated Testing (Optional)

If you want to add automated testing in the future, consider:

1. **Unit tests** for calculation functions
2. **Integration tests** for input/output flow
3. **E2E tests** with Playwright or Cypress
4. **Visual regression tests** for UI consistency

Example test structure:
```javascript
// Test: Calculate required emails
Input: { target: 5, replyRate: 0.05, appointmentRate: 0.30, closeRate: 0.20 }
Expected: { requiredEmailsMonth: 1667 }
```

---

## Reporting Issues

When reporting a calculation issue, include:
1. All input values used
2. Expected output
3. Actual output
4. Browser and version
5. Screenshot if relevant
6. Console errors (if any)

---

**Test all scenarios before deploying to production!**
