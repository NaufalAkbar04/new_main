# Deployment Guide

## 1. Database Setup
- Install MySQL on your server
- Create a production database:
  ```sql
  mysql -u root -p
  CREATE DATABASE production_db;
  CREATE USER 'prod_user'@'localhost' IDENTIFIED BY 'secure_password';
  GRANT ALL PRIVILEGES ON production_db.* TO 'prod_user'@'localhost';
  FLUSH PRIVILEGES;
  ```
- Import the schema:
  ```bash
  mysql -u prod_user -p production_db < database_setup.sql
  ```

## 2. Environment Configuration
Create `.env` file:
```ini
DB_HOST=localhost
DB_USER=prod_user
DB_PASSWORD=secure_password
DB_NAME=production_db
SESSION_SECRET=your_production_secret
NODE_ENV=production
PORT=5000
```

Update server.js to use environment variables:
```javascript
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // ... rest of config
});
```

## 3. Production Dependencies
Install production dependencies:
```bash
npm install --production
npm install -g pm2
```

## 4. Process Management with PM2
Start the server:
```bash
pm2 start server.js --name "my-app"
```

Configure PM2 to start on reboot:
```bash
pm2 save
pm2 startup
```

## 5. Frontend Deployment
- Build your frontend files (if using a build tool)
- Configure your web server (Nginx/Apache) to:
  - Serve static files from your frontend directory
  - Proxy API requests to your Node.js server

Example Nginx config:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /path/to/your/frontend;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 6. SSL Configuration (Recommended)
Use Let's Encrypt for free SSL certificates:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## 7. Monitoring
Set up monitoring with PM2:
```bash
pm2 monit
```

## Maintenance Commands
- Restart server: `pm2 restart my-app`
- View logs: `pm2 logs my-app`
- Stop server: `pm2 stop my-app`
