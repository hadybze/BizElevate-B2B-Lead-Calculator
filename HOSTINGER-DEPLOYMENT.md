# Hostinger Deployment Guide - Calculator as /calculator Page

## Prerequisites
- Hostinger account login credentials
- FTP client (FileZilla) OR access to Hostinger File Manager
- Your Next.js site already deployed on Hostinger

---

## Option 1: Deploy via Hostinger File Manager (No FTP Needed)

### Step 1: Prepare Files

You need these 4 files:
- `index.html`
- `styles.css`
- `calculator.js`
- `logo.png`

### Step 2: Access Hostinger File Manager

1. Log in to Hostinger: https://www.hostinger.com/
2. Go to your hosting dashboard
3. Find your website in the list
4. Click **File Manager** button

### Step 3: Navigate to Your Website Root

1. In File Manager, navigate to `public_html` or your website root folder
2. This is where your Next.js static export is located
3. You should see folders like `_next`, `assets`, etc.

### Step 4: Create Calculator Folder

1. Inside `public_html`, click **+ New Folder**
2. Name it: `calculator`
3. Open the new `calculator` folder

### Step 5: Upload Calculator Files

1. Inside the `/calculator` folder, click **Upload Files**
2. Upload these 4 files:
   - `index.html`
   - `styles.css`
   - `calculator.js`
   - `logo.png`

3. Wait for upload to complete

### Step 6: Set Permissions (if needed)

1. Select all uploaded files
2. Right-click → **Permissions** → Set to **644**
3. This ensures files are readable

### Step 7: Test Your Calculator

Visit: `https://yourdomain.com/calculator/`

**Important:** Make sure to include the trailing slash or it might not load properly.

---

## Option 2: Deploy via FTP (FileZilla)

### Step 1: Get FTP Credentials from Hostinger

1. Go to Hostinger dashboard
2. Find your hosting plan
3. Click **FTP Accounts** or **File Manager**
4. Note down:
   - FTP Host (usually: `ftp.yourdomain.com`)
   - FTP Username
   - FTP Password
   - Port: 21

### Step 2: Connect with FileZilla

1. Download FileZilla: https://filezilla-project.org/
2. Open FileZilla
3. Enter your FTP credentials:
   - Host: `ftp.yourdomain.com`
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
4. Click **Quickconnect**

### Step 3: Navigate to Website Root

1. On the right panel (Remote site), navigate to `/public_html`
2. This is your website root

### Step 4: Create Calculator Folder

1. Right-click in the remote panel
2. Select **Create directory**
3. Name it: `calculator`
4. Double-click to open the folder

### Step 5: Upload Files

1. On the left panel (Local site), navigate to your calculator files folder
2. Select these files:
   - `index.html`
   - `styles.css`
   - `calculator.js`
   - `logo.png`
3. Drag them to the right panel (into the `/calculator` folder)
4. Wait for upload to complete

### Step 6: Verify Upload

Check that your remote `/public_html/calculator/` folder contains:
```
/public_html/calculator/
├── index.html
├── styles.css
├── calculator.js
└── logo.png
```

### Step 7: Test

Visit: `https://yourdomain.com/calculator/`

---

## Folder Structure After Deployment

Your Hostinger hosting should look like this:

```
/public_html/
├── _next/                  (Next.js files)
├── assets/                 (Your existing assets)
├── calculator/             (NEW FOLDER)
│   ├── index.html
│   ├── styles.css
│   ├── calculator.js
│   └── logo.png
├── index.html              (Your homepage)
└── ... (other Next.js files)
```

---

## Common Issues & Solutions

### Issue 1: 404 Error when visiting /calculator

**Solution:**
- Make sure the folder is named exactly `calculator` (lowercase)
- Ensure `index.html` is inside the calculator folder
- Try visiting with trailing slash: `/calculator/`

### Issue 2: Styles Not Loading

**Solution:**
- Check that `styles.css` and `calculator.js` are in the same folder as `index.html`
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check file permissions are set to 644

### Issue 3: Logo Not Showing

**Solution:**
- Verify `logo.png` uploaded correctly
- Check file name matches exactly (case-sensitive)
- Open browser console (F12) to see any errors

### Issue 4: Calculator Not Working

**Solution:**
- Open browser console (F12) and check for JavaScript errors
- Ensure `calculator.js` uploaded correctly
- Clear browser cache and reload

---

## Linking Calculator from Your Main Site

After deployment, add links to your calculator from your main website:

### Example Navigation Link:
```html
<a href="/calculator/">Lead Calculator</a>
```

### Example Button:
```html
<a href="/calculator/" className="btn btn-primary">
  Calculate Your Outbound Volume
</a>
```

### Example in Next.js Component:
```jsx
import Link from 'next/link'

<Link href="/calculator/">
  <a className="calculator-link">Calculate Volume</a>
</Link>
```

---

## Performance Optimization (Optional)

### Enable Compression in Hostinger

1. Go to Hostinger dashboard
2. Find **Advanced** → **htaccess Editor** or **File Manager**
3. Look for `.htaccess` file in `public_html`
4. Add compression rules (if not already there)

### Clear Hostinger Cache

1. In Hostinger dashboard, find **Cache Manager**
2. Click **Clear Cache** for your domain
3. This ensures visitors see the latest version

---

## SEO Considerations

### Add to sitemap.xml

Add calculator page to your Next.js sitemap:

```xml
<url>
  <loc>https://yourdomain.com/calculator/</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Add Internal Links

Link to calculator from:
- Main navigation
- Homepage
- Services page
- Blog posts about outbound

---

## Maintenance

### Updating Calculator

To update the calculator in the future:
1. Make changes to local files
2. Re-upload via File Manager or FTP
3. Overwrite existing files
4. Clear Hostinger cache

### Backup

Before making changes:
1. Download current files from Hostinger
2. Keep a local backup
3. This allows quick rollback if needed

---

## Alternative: Full Next.js Integration (Advanced)

If you want to rebuild your Next.js app with the calculator integrated:

1. Add calculator files to `/public/calculator/` in your Next.js project
2. Rebuild and export: `npm run build && npm run export`
3. Upload the entire `/out` folder to Hostinger
4. This method keeps everything in your Next.js workflow

---

## Support

### Hostinger Support
- Live Chat: Available 24/7 in Hostinger dashboard
- Help Center: https://support.hostinger.com/

### Common Hostinger File Paths
- Website root: `/public_html/`
- Addon domains: `/public_html/addon_domain.com/`
- Subdomains: `/public_html/subdomain/`

---

**Deployment Complete!**

Your calculator should now be live at: `https://yourdomain.com/calculator/`

Test all functionality:
- [ ] Page loads correctly
- [ ] Styles apply properly
- [ ] Logo displays
- [ ] Calculator performs calculations
- [ ] Form inputs work
- [ ] Results display correctly
- [ ] Mobile responsive
- [ ] Works in different browsers

---

**Questions or issues?** Check the Common Issues section above or contact Hostinger support.
