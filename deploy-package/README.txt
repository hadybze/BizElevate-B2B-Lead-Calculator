================================================================================
BIZELEVATE CALCULATOR - DEPLOYMENT PACKAGE
================================================================================

This folder contains all files needed to deploy the calculator to Hostinger.

FILES INCLUDED (5 total):
------------------------
✓ index.html       - Main calculator page (16 KB)
✓ styles.css       - Styling (14 KB)
✓ calculator.js    - Calculator logic (11 KB)
✓ logo.png         - BizElevate logo (15 KB)
✓ favicon.png      - Browser tab icon (7 KB)

TOTAL SIZE: ~63 KB (very lightweight!)

================================================================================
QUICK DEPLOYMENT STEPS - HOSTINGER FILE MANAGER
================================================================================

1. LOG INTO HOSTINGER
   - Go to: https://www.hostinger.com/
   - Click File Manager

2. NAVIGATE TO YOUR WEBSITE ROOT
   - Go to: public_html/

3. CREATE CALCULATOR FOLDER
   - Click: + New Folder
   - Name it: calculator

4. UPLOAD ALL 5 FILES
   - Open the calculator folder
   - Click: Upload Files
   - Select all 5 files from this deploy-package folder:
     • index.html
     • styles.css
     • calculator.js
     • logo.png
     • favicon.png

5. TEST YOUR CALCULATOR
   - Visit: https://yourdomain.com/calculator/
   - Test all calculations work
   - Check favicon appears in browser tab

================================================================================
YOUR FINAL STRUCTURE ON HOSTINGER
================================================================================

/public_html/
├── _next/              (Your Next.js files)
├── calculator/         ← NEW FOLDER
│   ├── index.html      ← Upload these 5 files
│   ├── styles.css
│   ├── calculator.js
│   ├── logo.png
│   └── favicon.png
├── index.html         (Your homepage)
└── ... (other files)

================================================================================
AFTER DEPLOYMENT
================================================================================

Your calculator will be live at: https://yourdomain.com/calculator/

✓ Check favicon shows in browser tab
✓ Test all form inputs
✓ Verify calculations work
✓ Test on mobile
✓ Test in different browsers

================================================================================
LINKING FROM YOUR MAIN SITE
================================================================================

Add links to your calculator:

HTML:
<a href="/calculator/">Lead Calculator</a>

Next.js:
<Link href="/calculator/">Calculate Volume</Link>

Button:
<a href="/calculator/" class="btn btn-primary">Calculate Your Volume</a>

================================================================================
NEED HELP?
================================================================================

See: HOSTINGER-DEPLOYMENT.md (in parent folder) for detailed instructions

Hostinger Support: Available 24/7 via live chat in dashboard

================================================================================
READY TO DEPLOY!
================================================================================

Just upload these 5 files to /public_html/calculator/ on Hostinger.
