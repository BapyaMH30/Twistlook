# TwistLook - Real Estate Platform

A full-stack real estate platform for listing and browsing land and construction sites. Built with React, Node.js, Express, and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Frontend Components](#frontend-components)
- [Authentication](#authentication)
- [Deployment Strategy](#deployment-strategy)
- [Environment Variables](#environment-variables)

---

## Overview

TwistLook is a real estate marketplace that allows users to:
- Browse land and construction site listings
- Search and filter properties by location, price, and type
- View detailed property information with image galleries
- Register and authenticate users
- Send messages to property owners
- Leave reviews and ratings on properties

The application was reverse-engineered from a MongoDB database dump and built to work with both legacy data (uppercase field names) and new data formats.

---

## Features

- **Property Listings**: Browse land sites and construction projects
- **Advanced Search**: Filter by location, price range, property type
- **Image Gallery**: View property images stored in MongoDB GridFS
- **User Authentication**: JWT-based auth with bcrypt password hashing
- **Messaging System**: Contact property owners directly
- **Reviews & Ratings**: Rate and review properties
- **Responsive Design**: Mobile-friendly UI with TailwindCSS
- **Legacy Data Support**: Handles both old (UPPERCASE) and new field formats

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| Vite 4 | Build tool & dev server |
| TailwindCSS 3 | Utility-first CSS framework |
| React Router 6 | Client-side routing |
| TanStack Query 5 | Data fetching & caching |
| Axios | HTTP client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express 4 | Web framework |
| Mongoose 8 | MongoDB ODM |
| JSON Web Token | Authentication |
| bcryptjs | Password hashing |
| multer | File uploads |

### Database
| Technology | Purpose |
|------------|---------|
| MongoDB 6.0 | Document database |
| GridFS | Binary file storage (images) |
| Docker | Container runtime |

---

## Project Structure

```
twistlook/
├── docker-compose.yml       # Docker services configuration
├── CLAUDE.md               # AI assistant guidance
├── README.md               # This file
│
├── backend/                # Express API server
│   ├── package.json
│   ├── .env               # Environment variables
│   └── src/
│       ├── index.js       # Application entry point
│       ├── config/
│       │   └── db.js      # MongoDB connection
│       ├── models/
│       │   ├── User.js    # User schema
│       │   ├── Property.js # Land & Construction schemas
│       │   ├── Message.js # Message schema
│       │   └── Review.js  # Review schema
│       ├── routes/
│       │   ├── auth.js    # Authentication endpoints
│       │   ├── properties.js # Property CRUD
│       │   ├── messages.js # Messaging endpoints
│       │   ├── reviews.js # Review endpoints
│       │   ├── users.js   # User profile endpoints
│       │   └── images.js  # GridFS image serving
│       └── middleware/
│           └── auth.js    # JWT verification
│
├── frontend/              # React application
│   ├── package.json
│   ├── vite.config.js    # Vite configuration
│   ├── tailwind.config.js # Tailwind configuration
│   ├── index.html        # HTML entry point
│   └── src/
│       ├── main.jsx      # React entry point
│       ├── App.jsx       # Root component with routes
│       ├── index.css     # Global styles
│       ├── context/
│       │   └── AuthContext.jsx # Authentication state
│       ├── services/
│       │   └── api.js    # API client
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── PropertyCard.jsx
│       │   ├── PropertyGrid.jsx
│       │   ├── SearchBar.jsx
│       │   └── ReviewSection.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Land.jsx
│           ├── Construction.jsx
│           ├── PropertyDetail.jsx
│           ├── Search.jsx
│           ├── Login.jsx
│           ├── Register.jsx
│           ├── Profile.jsx
│           ├── Messages.jsx
│           └── PostListing.jsx
│
├── data/                  # Database dump
│   └── dump/
│       └── twistslook/   # BSON & metadata files
│
└── scripts/
    └── restore-db.sh     # Database restore script
```

---

## Getting Started

### Prerequisites

- Node.js 16+ (18+ recommended)
- Docker Desktop
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd twistlook
   ```

2. **Start MongoDB with Docker**
   ```bash
   docker-compose up -d
   ```

3. **Restore the database**
   ```bash
   docker exec twistlook-mongo mongorestore --db twistslook /docker-entrypoint-initdb.d/dump/twistslook
   ```

4. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

5. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start the backend server**
   ```bash
   cd ../backend
   npm run dev
   ```

7. **Start the frontend server** (new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001/api

### Test Credentials

```
Email: jakirpatel@hotmail.com
Password: @hotmail786jk
```

---

## API Documentation

### Base URL
```
http://localhost:5001/api
```

### Endpoints

#### Health Check
```
GET /health
Response: { "status": "ok", "message": "TwistLook API is running" }
```

#### Authentication
```
POST /auth/register
Body: { name, email, password, phone?, city?, state? }
Response: { user: { id, name, email }, token }

POST /auth/login
Body: { email, password }
Response: { user: { id, name, email }, token }

GET /auth/me
Headers: Authorization: Bearer <token>
Response: { id, name, email, phone, location, type }
```

#### Properties
```
GET /properties/land
Query: ?city=&minPrice=&maxPrice=&status=
Response: [{ _id, LOCATION, MAX_PRICE, AREA, ... }]

GET /properties/land/:id
Response: { _id, LOCATION, MAX_PRICE, AREA, IMAGE1, ... }

GET /properties/construction
Query: ?city=&minPrice=&maxPrice=&projectType=&status=
Response: [{ _id, NAME, LOCATION, MIN_PRICE, MAX_PRICE, ... }]

GET /properties/construction/:id
Response: { _id, NAME, LOCATION, FEATURES, ... }

GET /properties/search
Query: ?q=&type=&city=&minPrice=&maxPrice=
Response: [{ ...property, propertyType: 'land'|'construction' }]

POST /properties/land (Auth required)
Body: { title, description, price, area, location, ... }

POST /properties/construction (Auth required)
Body: { title, description, price, area, location, ... }
```

#### Messages
```
GET /messages (Auth required)
Response: [{ otherUser, lastMessage, unreadCount }]

GET /messages/:userId (Auth required)
Response: [{ sender, receiver, content, createdAt }]

POST /messages/:userId (Auth required)
Body: { content, propertyId?, propertyType? }
```

#### Reviews
```
GET /reviews/:propertyType/:propertyId
Response: { reviews: [...], avgRating, count }

POST /reviews/:propertyType/:propertyId (Auth required)
Body: { rating: 1-5, comment }
```

#### Images
```
GET /images/:id
Response: Binary image data (from GridFS)
```

---

## Database Schema

### Collections

#### `user`
```javascript
{
  // Legacy fields (existing data)
  ID: String,           // "email@Type" format
  TYPE: String,         // "Constructor", "LandDealer"
  NAME: String,
  EMAIL: String,
  PASSWORD: String,     // Plain text (legacy)
  MOBILE: String,
  LOCATION: String,
  GROUP_NAME: String,   // For constructors

  // New fields (new registrations)
  name: String,
  email: String,
  password: String,     // bcrypt hashed
  phone: String,
  city: String,
  state: String,
  role: String
}
```

#### `posted_construction_sites`
```javascript
{
  POSTED_BY: String,
  ID: String,
  NAME: String,         // Project name
  LOCATION: String,
  START_DATE: String,
  END_DATE: String,
  MIN_PRICE: Number,
  MAX_PRICE: Number,
  AREA: Number,
  FEATURES: String,     // Comma-separated
  DESCRIPTION: String,
  IMAGE1: ObjectId,     // GridFS reference
  IMAGE2: ObjectId,
  RATING: Number
}
```

#### `posted_land_sites`
```javascript
{
  POSTED_BY: String,
  ID: String,
  TYPE: String,         // "Owner of land site"
  LOCATION: String,
  POSSESSION_DATE: String,
  MAX_PRICE: Number,
  AREA: Number,
  DESCRIPTION: String,
  FREEHOLD: String,
  OWNER_FIRST_NAME: String,
  OWNER_LAST_NAME: String,
  OWNER_EMAIL: String,
  OWNER_MOBILE: String,
  IMAGE1: ObjectId,
  IMAGE2: ObjectId,
  RATING: Number
}
```

#### `fs.files` & `fs.chunks` (GridFS)
```javascript
// fs.files
{
  _id: ObjectId,
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  filename: String,
  contentType: String   // "image/jpg"
}

// fs.chunks
{
  _id: ObjectId,
  files_id: ObjectId,   // Reference to fs.files
  n: Number,            // Chunk index
  data: Binary          // Chunk data
}
```

---

## Frontend Components

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with featured listings and search |
| Land | `/land` | Browse all land sites with filters |
| Construction | `/construction` | Browse construction projects with filters |
| PropertyDetail | `/property/:type/:id` | Full property details with gallery |
| Search | `/search` | Search results with filters |
| Login | `/login` | User login form |
| Register | `/register` | User registration form |
| Profile | `/profile/:id` | User profile and their listings |
| Messages | `/messages` | Messaging inbox |
| PostListing | `/post` | Create new property listing |

### Reusable Components

| Component | Purpose |
|-----------|---------|
| `Navbar` | Navigation with auth state |
| `PropertyCard` | Property preview card |
| `PropertyGrid` | Grid layout of property cards |
| `SearchBar` | Search form with filters |
| `ReviewSection` | Reviews list and submission form |

---

## Authentication

### Flow

1. **Registration**: User submits form → Password hashed with bcrypt → User saved → JWT issued
2. **Login**: User submits credentials → Password compared (plain text for legacy, bcrypt for new) → JWT issued
3. **Protected Routes**: JWT sent in `Authorization: Bearer <token>` header → Middleware verifies → Request proceeds

### JWT Payload
```javascript
{
  id: ObjectId,  // User's MongoDB _id
  iat: Number,   // Issued at timestamp
  exp: Number    // Expiration timestamp
}
```

---

## Deployment Strategy

### Option 1: Docker Compose (Recommended for Development)

```yaml
# docker-compose.yml
version: '3.8'
services:
  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5001:5001"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/twistslook
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

### Option 2: Cloud Deployment

#### MongoDB Atlas (Database)
1. Create a MongoDB Atlas cluster
2. Whitelist IP addresses or use VPC peering
3. Get connection string and update `MONGODB_URI`

#### Backend (Node.js)

**AWS EC2 / DigitalOcean Droplet:**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <repo>
cd twistlook/backend
npm install --production

# Use PM2 for process management
npm install -g pm2
pm2 start src/index.js --name twistlook-api
pm2 startup
pm2 save
```

**AWS Lambda / Vercel Serverless:**
- Wrap Express app with serverless adapter
- Configure API Gateway / Vercel routes

**Railway / Render / Fly.io:**
```bash
# railway.toml / render.yaml
[build]
  command = "npm install"

[deploy]
  command = "node src/index.js"
```

#### Frontend (React)

**Vercel (Recommended):**
```bash
npm install -g vercel
cd frontend
vercel
```

**Netlify:**
```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "https://your-backend.com/api/:splat"
  status = 200
```

**AWS S3 + CloudFront:**
```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# Configure CloudFront for caching and HTTPS
```

### Option 3: Kubernetes (Production at Scale)

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: twistlook-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: twistlook-backend
  template:
    spec:
      containers:
      - name: backend
        image: your-registry/twistlook-backend:latest
        ports:
        - containerPort: 5001
        env:
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: twistlook-secrets
              key: mongodb-uri
---
apiVersion: v1
kind: Service
metadata:
  name: twistlook-backend
spec:
  selector:
    app: twistlook-backend
  ports:
  - port: 80
    targetPort: 5001
  type: LoadBalancer
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: cd backend && npm ci

      - name: Run tests
        run: cd backend && npm test

      - name: Deploy to Railway
        uses: railwayapp/deploy-action@v1
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Vercel
        uses: vercel/action@v3
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Environment Variables

### Backend (.env)
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/twistslook
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRE=7d
```

### Frontend (Production)
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## Security Considerations

1. **Secrets Management**: Use environment variables, never commit `.env` files
2. **HTTPS**: Always use SSL/TLS in production
3. **CORS**: Configure allowed origins in production
4. **Rate Limiting**: Add express-rate-limit for API protection
5. **Input Validation**: Sanitize all user inputs
6. **Password Policy**: Enforce strong passwords for new users
7. **JWT Security**: Use secure, httpOnly cookies in production

---

## License

MIT License - See LICENSE file for details.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
