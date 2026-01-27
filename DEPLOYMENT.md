# Deployment Checklist for VPS

## Pre-Deployment Checklist

- [ ] Test calculator locally by opening `index.html` in a browser
- [ ] Verify all calculations work correctly
- [ ] Test on mobile device or responsive view
- [ ] Check all input validations
- [ ] Test advanced mode toggle
- [ ] Verify warning messages appear correctly
- [ ] Test with edge cases (zero values, extreme numbers)

## VPS Server Requirements

### Minimum Requirements
- **OS**: Ubuntu 20.04+ / Debian 10+ / CentOS 8+
- **Web Server**: Nginx 1.18+ or Apache 2.4+
- **Disk Space**: 10MB (application is very lightweight)
- **RAM**: 256MB minimum (static files only)
- **CPU**: Any (no processing required)

### Optional
- **SSL Certificate**: Let's Encrypt (recommended for HTTPS)
- **Domain**: Custom domain or subdomain

## Quick Deployment Guide

### Step 1: Prepare Your VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Nginx (recommended)
sudo apt install nginx -y

# Or install Apache
# sudo apt install apache2 -y

# Start and enable web server
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### Step 2: Upload Files to VPS

#### Option A: Using SCP (from your local machine)
```bash
# Navigate to project directory
cd "/Users/Hadygwu/Hady's Local Drive/Business/BizElevate/AI Project/BizElevate/BizElevate-B2B-AI-Calculator"

# Upload files (replace USER and SERVER_IP)
scp index.html styles.css calculator.js user@SERVER_IP:/tmp/

# SSH into server and move files
ssh user@SERVER_IP
sudo mkdir -p /var/www/calculator
sudo mv /tmp/{index.html,styles.css,calculator.js} /var/www/calculator/
sudo chown -R www-data:www-data /var/www/calculator
```

#### Option B: Using Git (recommended for updates)
```bash
# On your local machine, initialize git repo
cd "/Users/Hadygwu/Hady's Local Drive/Business/BizElevate/AI Project/BizElevate/BizElevate-B2B-AI-Calculator"
git init
git add index.html styles.css calculator.js README.md
git commit -m "Initial calculator deployment"

# Push to your git repository (GitHub/GitLab/etc)
# git remote add origin YOUR_REPO_URL
# git push -u origin main

# On VPS
ssh user@SERVER_IP
cd /var/www
sudo git clone YOUR_REPO_URL calculator
sudo chown -R www-data:www-data /var/www/calculator
```

#### Option C: Using SFTP (FileZilla, Cyberduck, etc)
- Connect to your VPS via SFTP
- Upload `index.html`, `styles.css`, `calculator.js` to `/var/www/calculator/`
- Set permissions to 644 for files, 755 for directories

### Step 3: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/calculator

# Paste this configuration (adjust domain name):
```

```nginx
server {
    listen 80;
    listen [::]:80;

    # Replace with your domain or VPS IP
    server_name calculator.yourdomain.com;

    # Root directory
    root /var/www/calculator;
    index index.html;

    # Logging
    access_log /var/log/nginx/calculator_access.log;
    error_log /var/log/nginx/calculator_error.log;

    # Main location
    location / {
        try_files $uri $uri/ =404;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/css application/javascript text/html;

    # Cache static assets
    location ~* \.(css|js)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/calculator /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 4: Set Up SSL (HTTPS) with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate (replace with your domain)
sudo certbot --nginx -d calculator.yourdomain.com

# Certbot will automatically configure HTTPS
# Certificate will auto-renew

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 5: Configure Firewall

```bash
# If using UFW
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status

# If using firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### Step 6: Verify Deployment

1. **Test HTTP access:**
   ```bash
   curl http://your-server-ip/
   ```

2. **Test HTTPS (if configured):**
   ```bash
   curl https://calculator.yourdomain.com/
   ```

3. **Open in browser:**
   - Navigate to `http://your-server-ip/` or `https://calculator.yourdomain.com/`
   - Test all calculator functions
   - Test on mobile device

## Post-Deployment Tasks

- [ ] Add DNS record pointing to your VPS IP
- [ ] Test calculator functionality on live site
- [ ] Set up monitoring (optional but recommended)
- [ ] Configure automated backups (optional)
- [ ] Add analytics if needed (Google Analytics, etc.)
- [ ] Test loading speed with GTmetrix or PageSpeed Insights

## Updating the Calculator

### Using Git (recommended)
```bash
# On local machine, make changes then:
git add .
git commit -m "Update calculator"
git push

# On VPS:
ssh user@SERVER_IP
cd /var/www/calculator
sudo git pull
sudo systemctl reload nginx
```

### Using SCP
```bash
# Upload updated files
scp index.html styles.css calculator.js user@SERVER_IP:/tmp/
ssh user@SERVER_IP
sudo cp /tmp/{index.html,styles.css,calculator.js} /var/www/calculator/
sudo systemctl reload nginx
```

## Monitoring & Maintenance

### Check Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/calculator_access.log

# Error logs
sudo tail -f /var/log/nginx/calculator_error.log
```

### Check Server Status
```bash
sudo systemctl status nginx
```

### Set Up Monitoring (Optional)
```bash
# Install monitoring tool (example: Netdata)
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

## Troubleshooting

### Calculator not loading
1. Check Nginx is running: `sudo systemctl status nginx`
2. Check file permissions: `ls -la /var/www/calculator/`
3. Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
4. Verify files exist: `ls /var/www/calculator/`

### 404 Error
- Verify files are in `/var/www/calculator/`
- Check Nginx configuration: `sudo nginx -t`
- Verify root path in Nginx config matches actual file location

### Calculations not working
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify `calculator.js` is loading correctly
4. Check Content-Security-Policy headers if implemented

### SSL issues
- Verify domain points to correct IP
- Check Certbot logs: `sudo certbot certificates`
- Renew manually: `sudo certbot renew`

## Security Best Practices

1. **Keep system updated:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Disable directory listing** (already configured in above Nginx config)

3. **Use HTTPS only** (force redirect from HTTP to HTTPS)

4. **Set up fail2ban** (optional, protects against brute force):
   ```bash
   sudo apt install fail2ban -y
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

5. **Regular backups:**
   ```bash
   # Create backup script
   sudo nano /usr/local/bin/backup-calculator.sh
   ```
   ```bash
   #!/bin/bash
   tar -czf /backups/calculator-$(date +%Y%m%d).tar.gz /var/www/calculator/
   find /backups/ -name "calculator-*.tar.gz" -mtime +30 -delete
   ```
   ```bash
   sudo chmod +x /usr/local/bin/backup-calculator.sh
   # Add to crontab (runs daily at 2 AM)
   sudo crontab -e
   # Add: 0 2 * * * /usr/local/bin/backup-calculator.sh
   ```

## Performance Optimization

### Enable HTTP/2 (Nginx)
```nginx
listen 443 ssl http2;
listen [::]:443 ssl http2;
```

### Set up CDN (Optional)
- Cloudflare (free tier available)
- Amazon CloudFront
- Fastly

### Compress files
```bash
# Pre-compress static files
gzip -k -9 /var/www/calculator/styles.css
gzip -k -9 /var/www/calculator/calculator.js
```

## Cost Estimate

### Minimal VPS Options
- **DigitalOcean**: $4-6/month (512MB RAM droplet)
- **Linode**: $5/month (Nanode 1GB)
- **Vultr**: $2.50-5/month (depending on region)
- **Hetzner**: €4/month (~$4.50)
- **OVH**: $3.50/month

### Additional Costs
- **Domain**: $10-15/year (optional if using subdomain)
- **SSL**: Free (Let's Encrypt)
- **Monitoring**: Free (Netdata, UptimeRobot)

## Support Contacts

- Server issues: Contact your VPS provider support
- Application issues: Check README.md
- Web server issues: Consult Nginx/Apache documentation

---

**Deployment completed? Check all items above before going live!**
