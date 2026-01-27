# BizElevate B2B Lead Calculator

A decision-making tool for B2B service agency founders to calculate the exact outbound volume needed to achieve monthly customer targets.

## Features

- **Real-time Calculations**: Instant results as you type
- **Professional UI**: Clean, modern interface with mobile responsiveness
- **Advanced Mode**: Optional mailbox constraints for detailed capacity planning
- **Smart Warnings**: Automatic alerts for unrealistic rates or high volumes
- **Conservative Estimates**: All numbers rounded upward for realistic planning

## What It Calculates

### Primary Metrics
- Required Emails per Month
- Required Emails per Day
- Leads Required per Month
- Domains Required

### Secondary Metrics (Funnel Reality Check)
- Replies Needed per Month
- Appointments Needed per Month

## Installation

This is a static HTML/CSS/JavaScript application with no dependencies. Simply upload the files to your web server.

### Files Required
```
/
├── index.html
├── styles.css
└── calculator.js
```

## Deployment to VPS

### Option 1: Deploy with Nginx

1. **Upload files to your VPS:**
```bash
scp -r * user@your-vps-ip:/var/www/calculator/
```

2. **Configure Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/calculator;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/css application/javascript;

    # Cache static assets
    location ~* \.(css|js)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **Restart Nginx:**
```bash
sudo systemctl restart nginx
```

### Option 2: Deploy with Apache

1. **Upload files to your VPS:**
```bash
scp -r * user@your-vps-ip:/var/www/html/calculator/
```

2. **Configure Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /calculator/

    # Force HTTPS (optional)
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

3. **Restart Apache:**
```bash
sudo systemctl restart apache2
```

### Option 3: Quick Deploy with Docker

1. **Create a Dockerfile:**
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

2. **Build and run:**
```bash
docker build -t bizelevate-calculator .
docker run -d -p 80:80 bizelevate-calculator
```

## Testing Scenarios

### Scenario 1: Conservative Agency
- Target: 5 customers/month
- Reply Rate: 5%
- Appointment Rate: 30%
- Close Rate: 20%
- Emails per Domain: 50/day
- Expected: ~1,667 emails/month, ~76 emails/day, ~2 domains

### Scenario 2: Aggressive Scale
- Target: 20 customers/month
- Reply Rate: 3%
- Appointment Rate: 25%
- Close Rate: 15%
- Emails per Domain: 50/day
- Expected: ~17,778 emails/month, ~808 emails/day, ~17 domains

### Scenario 3: High Conversion Funnel
- Target: 10 customers/month
- Reply Rate: 8%
- Appointment Rate: 40%
- Close Rate: 30%
- Emails per Domain: 50/day
- Expected: ~1,042 emails/month, ~48 emails/day, ~1 domain

### Edge Cases to Test
- Zero values in any field (should show error)
- Very low rates (<1%) (should show warning)
- High domain count (>20) (should show info message)
- Advanced mode with mailbox constraints
- Extremely high target numbers

## Embedding in Existing Website

### As an iframe:
```html
<iframe
    src="https://your-domain.com/calculator/"
    width="100%"
    height="1200px"
    frameborder="0"
    title="Lead Calculator"
></iframe>
```

### Direct integration:
Simply copy the HTML from `index.html` into your page and ensure `styles.css` and `calculator.js` are properly linked.

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;  /* Change primary color */
    --secondary-color: #10b981; /* Change secondary color */
    /* ... more variables ... */
}
```

### Default Values
Edit in `index.html`:
```html
<input value="22"> <!-- Workdays per month -->
<input value="3">  <!-- Emails per lead -->
```

### Copy/Text
All copy is in `index.html` and can be easily modified without touching the logic.

## Performance

- **Load Time**: <1 second (total page size ~15KB gzipped)
- **Calculation Speed**: Instant (runs in-browser)
- **Mobile Performance**: Optimized for mobile devices
- **No External Dependencies**: No CDN calls, runs entirely offline after initial load

## Security Considerations

- No backend required (no server-side vulnerabilities)
- No data collection or storage
- No external API calls
- No cookies or tracking
- Safe to embed in any website

## Maintenance

This is a static application with no dependencies, so maintenance is minimal:
- No security patches required
- No database maintenance
- No server-side updates
- Update text/copy as needed directly in HTML

## Support

For issues or feature requests, contact: support@bizelevate.com

## License

Proprietary - BizElevate © 2025

---

**Built by BizElevate** | Outbound is math, not hope.
