# Plokitch Deployment & Hosting Strategy

> **Last Updated**: April 16, 2026  
> **Student Pack Benefits**: GitHub Student Developer Pack

---

## **Student Pack Benefits Available**

### **Digital Ocean Student Pack**
- **$200 Free Credit**: Valid for 1 year from signup
- **Eligibility**: New users verified through GitHub Student Developer Pack
- **How to Claim**: Link GitHub account to DigitalOcean through student offer page
- **No Credit Card Required**: Just GitHub verification needed

### **Free Domain Names (GitHub Student Pack)**
- **Name.com**: 1-year free domain with 15+ extensions (.app, .dev, .live, .studio, etc.)
- **Namecheap**: 1-year free .me domain + SSL certificate
- **Multiple Options**: Choose from various domain registrars

---

## **Hosting Architecture**

### **Frontend: Vercel**
```
Frontend (React + TypeScript)
    |
    V
Vercel Hosting
    |
    V
Custom Domain (plokitch.app or similar)
```

### **Backend: Digital Ocean**
```
Backend (Fastify + Node.js)
    |
    V
Digital Ocean Droplet
    |
    V
Supabase Database (Managed PostgreSQL)
```

---

## **Frontend Deployment (Vercel)**

### **Setup Process**
1. **Connect Repository**
   - Link GitHub repository to Vercel
   - Automatic deployment on main branch push

2. **Configuration**
   ```bash
   # Environment Variables
   VITE_API_URL=https://api.plokitch.app
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Build Settings**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "installCommand": "npm install"
   }
   ```

4. **Domain Setup**
   - Purchase domain via GitHub Student Pack
   - Configure DNS records to point to Vercel
   - Enable SSL (automatic with Vercel)

### **Benefits of Vercel**
- **Free Tier**: Generous free tier for hobby projects
- **Automatic HTTPS**: SSL certificates included
- **Global CDN**: Fast content delivery worldwide
- **Preview Deployments**: Automatic previews for PRs
- **Analytics**: Built-in performance analytics

---

## **Backend Deployment (Digital Ocean)**

### **Server Setup**
1. **Create Droplet**
   ```bash
   # Recommended Specs
   - OS: Ubuntu 22.04 LTS
   - Size: $6/month (s-1vcpu-1gb) or higher
   - Region: Choose closest to Nigeria (e.g., London)
   ```

2. **Initial Server Configuration**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 (Process Manager)
   sudo npm install -g pm2
   
   # Install Nginx (Reverse Proxy)
   sudo apt install nginx -y
   ```

3. **Application Deployment**
   ```bash
   # Clone repository
   git clone your-backend-repo.git
   cd backend-repo
   
   # Install dependencies
   npm install
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start ecosystem.config.js
   ```

### **Nginx Reverse Proxy Configuration**
```nginx
server {
    listen 80;
    server_name api.plokitch.app;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### **SSL Certificate Setup**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL Certificate
sudo certbot --nginx -d api.plokitch.app

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## **Database Setup (Supabase)**

### **Configuration**
1. **Create Supabase Project**
   - Sign up at supabase.com
   - Create new project
   - Choose region closest to Nigeria

2. **Environment Variables**
   ```bash
   # Backend .env
   SUPABASE_URL=your-project-url
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_KEY=your-service-key
   ```

3. **Database Migration**
   ```bash
   # Run Drizzle migrations
   npm run db:push
   npm run db:generate
   ```

---

## **Domain Strategy**

### **Recommended Domain Extensions**
Based on GitHub Student Pack availability:

1. **Primary Options**
   - `.app` - Modern, tech-focused
   - `.dev` - Developer-focused
   - `.live` - Great for service-based apps
   - `.studio` - Creative/professional

2. **Backup Options**
   - `.me` (via Namecheap)
   - `.software`
   - `.engineer`

### **Domain Configuration**
```
Frontend: plokitch.app (or similar)
Backend API: api.plokitch.app
Database: Managed by Supabase
```

---

## **Deployment Workflow**

### **Development to Production**
1. **Development**
   - Local development with hot reload
   - Feature branches for new features

2. **Staging**
   - Preview deployments on Vercel
   - Test backend on Digital Ocean staging

3. **Production**
   - Merge to main branch
   - Automatic frontend deployment (Vercel)
   - Manual backend deployment (PM2 restart)

### **CI/CD Pipeline**
```yaml
# .github/workflows/deploy.yml
name: Deploy Backend
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Digital Ocean
        run: |
          # SSH into server and pull latest changes
          ssh root@api.plokitch.app "cd /var/www/backend && git pull && npm install && npm run build && pm2 restart all"
```

---

## **Cost Analysis**

### **First Year (Student Pack Benefits)**
- **Digital Ocean**: $0 (covered by $200 credit)
- **Domain**: $0 (covered by GitHub Student Pack)
- **Vercel**: $0 (generous free tier)
- **Supabase**: $0-25/month (free tier sufficient for Phase 1)

**Total First Year Cost: $0-25/month**

### **After Student Pack (Year 2+)**
- **Digital Ocean**: $6-20/month (depending on server size)
- **Domain**: $10-20/year (domain renewal)
- **Vercel**: $0-20/month (pro tier if needed)
- **Supabase**: $25-100/month (based on usage)

**Total Ongoing Cost: $40-140/month**

---

## **Security Considerations**

### **Frontend Security**
- **Environment Variables**: Never expose secrets in frontend
- **HTTPS**: Automatic with Vercel
- **CORS**: Properly configured on backend

### **Backend Security**
- **API Keys**: Store in environment variables
- **Database Security**: Use Supabase RLS policies
- **Rate Limiting**: Implement on API endpoints
- **Input Validation**: Comprehensive validation with Zod

### **Server Security**
- **Firewall**: Configure UFW on Digital Ocean
- **SSH Keys**: Use key-based authentication
- **Regular Updates**: Keep system packages updated
- **Monitoring**: Set up basic monitoring and alerts

---

## **Monitoring & Analytics**

### **Frontend Monitoring**
- **Vercel Analytics**: Built-in performance metrics
- **Google Analytics**: User behavior tracking
- **Sentry**: Error tracking (if needed)

### **Backend Monitoring**
- **PM2 Monitoring**: Process monitoring
- **Digital Ocean Monitoring**: Server metrics
- **Supabase Monitoring**: Database performance
- **Custom Logging**: Application-level logging

---

## **Backup Strategy**

### **Database Backups**
- **Supabase**: Automatic daily backups
- **Manual Backups**: Weekly manual exports
- **Point-in-Time Recovery**: Available in Supabase Pro

### **Code Backups**
- **GitHub**: Version control backup
- **Server Backup**: Regular server snapshots
- **Configuration Backup**: Document all configurations

---

## **Migration Plan**

### **Phase 1: Manual Operations**
- **Frontend**: Deploy to Vercel with domain
- **Backend**: Minimal setup for future use
- **Database**: Supabase with basic schema

### **Phase 2: Basic Backend**
- **API Development**: Core endpoints
- **Authentication**: User management
- **Order System**: Basic functionality

### **Phase 3: Full Stack**
- **Real-time Features**: WebSocket connections
- **Payment Integration**: Paystack integration
- **Advanced Features**: Analytics, notifications

---

## **Next Steps**

### **Immediate Actions (This Week)**
1. **Claim Student Pack Benefits**
   - Activate Digital Ocean $200 credit
   - Claim free domain from Name.com or Namecheap

2. **Setup Frontend Deployment**
   - Connect repository to Vercel
   - Configure environment variables
   - Deploy and test

3. **Setup Backend Server**
   - Create Digital Ocean droplet
   - Configure basic server setup
   - Deploy basic Fastify server

### **Short-term Goals (Next 2 Weeks)**
1. **Domain Configuration**
   - Point domain to Vercel
   - Setup SSL certificates
   - Configure subdomain for API

2. **Database Setup**
   - Create Supabase project
   - Setup Drizzle ORM
   - Create initial schema

3. **CI/CD Pipeline**
   - Setup GitHub Actions
   - Configure automated deployments
   - Test deployment workflow

---

## **Troubleshooting Guide**

### **Common Issues**
1. **Vercel Deployment Fails**
   - Check environment variables
   - Verify build command
   - Review build logs

2. **Backend Server Issues**
   - Check PM2 status: `pm2 status`
   - Review logs: `pm2 logs`
   - Verify port availability

3. **Database Connection Issues**
   - Verify Supabase credentials
   - Check network connectivity
   - Review connection string

4. **Domain Issues**
   - Verify DNS propagation
   - Check SSL certificate status
   - Review domain configuration

---

*This deployment plan leverages student benefits to minimize costs while providing a robust, scalable infrastructure for Plokitch's growth.*
