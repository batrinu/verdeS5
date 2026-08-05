# Verde în Sectorul 5 - Cloudflare Backend

Backend API built with **Cloudflare Workers**, **Hono**, and **D1 Database** (SQLite) for the tree management and citizen reporting platform.

## 🌟 Features

- ✅ **Serverless Architecture** - Deploy on Cloudflare's global edge network
- ✅ **Zero Cold Starts** - Instant response times
- ✅ **Free Tier Friendly** - Runs entirely on Cloudflare's generous free tier
- ✅ **GDPR Compliant** - EU data residency with R2 EU jurisdiction
- ✅ **Role-Based Access Control** - Citizen, Field Worker, Admin roles
- ✅ **JWT Authentication** - Secure token-based auth with refresh tokens
- ✅ **Photo Storage** - Cloudflare R2 for image uploads
- ✅ **Geospatial Queries** - Location-based filtering using lat/lon bounding boxes
- ✅ **Audit Logging** - Complete audit trail for admin actions
- ✅ **Analytics Dashboard** - Real-time metrics and CSV export

## 📁 Project Structure

```
cloudflare-backend/
├── src/
│   ├── index.ts              # Main entry point
│   ├── routes/
│   │   ├── auth.ts           # Authentication endpoints
│   │   ├── users.ts          # User management
│   │   ├── reports.ts        # Citizen reports
│   │   ├── trees.ts          # Tree registry
│   │   ├── green-spaces.ts   # Green spaces
│   │   ├── campaigns.ts      # Planting campaigns
│   │   ├── upload.ts         # Photo uploads
│   │   └── analytics.ts      # Analytics & exports
│   ├── middleware/           # Custom middleware
│   ├── utils/                # Helper functions
│   └── lib/                  # Libraries
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
├── migrations/               # D1 migrations
├── wrangler.toml             # Cloudflare config
├── package.json
└── tsconfig.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account (free)
- Wrangler CLI installed globally

### Installation

```bash
cd cloudflare-backend

# Install dependencies
npm install

# Generate Prisma client
npm run db:generate
```

### Local Development

```bash
# Start local development server
npm run dev
```

The API will be available at `http://localhost:8787`

### Setup Cloudflare Resources

```bash
# Login to Cloudflare
npx wrangler login

# Create D1 database
npx wrangler d1 create verde-sector-5-db

# Update wrangler.toml with the database_id

# Create R2 bucket (EU jurisdiction for GDPR)
npx wrangler r2 bucket create verde-sector-5-photos --location eu

# Apply database migrations
npx wrangler d1 execute verde-sector-5-db --file=prisma/schema.sql

# Or use Prisma push (development only)
npm run db:push

# Seed the database
npm run db:seed
```

### Deploy to Production

```bash
# Deploy to Cloudflare
npm run deploy

# Deploy to staging environment
npx wrangler deploy --env staging
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | Login | ❌ |
| POST | `/api/v1/auth/refresh` | Refresh access token | ❌ |
| GET | `/api/v1/auth/me` | Get current user | ✅ |
| POST | `/api/v1/auth/logout` | Logout | ✅ |

### Reports

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/api/v1/reports` | List reports (filtered) | All |
| GET | `/api/v1/reports/:id` | Get single report | All* |
| POST | `/api/v1/reports` | Create report | Citizen+ |
| PATCH | `/api/v1/reports/:id` | Update report | Admin/Worker |
| DELETE | `/api/v1/reports/:id` | Delete report | Admin |
| POST | `/api/v1/reports/:id/assign` | Assign to worker | Admin |
| GET | `/api/v1/reports/nearby` | Reports near location | All |

*Citizens can only view their own reports

### Trees

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/api/v1/trees` | List trees | All |
| GET | `/api/v1/trees/:id` | Get single tree | All |
| POST | `/api/v1/trees` | Create tree | Admin |
| PATCH | `/api/v1/trees/:id` | Update tree | Admin/Worker |
| DELETE | `/api/v1/trees/:id` | Delete tree | Admin |
| POST | `/api/v1/trees/:id/adopt` | Adopt tree | Citizen |
| DELETE | `/api/v1/trees/:id/adopt` | Release tree | Adopter/Admin |
| GET | `/api/v1/trees/nearby` | Trees near location | All |

### Green Spaces

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/api/v1/green-spaces` | List green spaces | All |
| GET | `/api/v1/green-spaces/:id` | Get single space | All |
| POST | `/api/v1/green-spaces` | Create space | Admin |
| PATCH | `/api/v1/green-spaces/:id` | Update space | Admin |
| DELETE | `/api/v1/green-spaces/:id` | Delete space | Admin |

### Campaigns

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/api/v1/campaigns` | List campaigns | All |
| GET | `/api/v1/campaigns/:id` | Get campaign | All |
| POST | `/api/v1/campaigns` | Create campaign | Admin |
| PATCH | `/api/v1/campaigns/:id` | Update campaign | Admin |
| DELETE | `/api/v1/campaigns/:id` | Delete campaign | Admin |
| POST | `/api/v1/campaigns/:id/join` | Join as volunteer | Citizen |
| DELETE | `/api/v1/campaigns/:id/join` | Leave campaign | Citizen |

### Upload

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| POST | `/api/v1/upload/photo` | Upload photo | All |
| DELETE | `/api/v1/upload/photo` | Delete photo | All |
| GET | `/api/v1/upload/stats` | Upload statistics | Admin |

### Analytics

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/api/v1/analytics/dashboard` | Dashboard metrics | Admin |
| GET | `/api/v1/analytics/export/reports` | Export CSV | Admin |
| GET | `/api/v1/analytics/activity` | Activity log | Admin |

### Users

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/api/v1/users/me` | Get profile | Owner |
| PATCH | `/api/v1/users/me` | Update profile | Owner |
| GET | `/api/v1/users` | List users | Admin |
| POST | `/api/v1/users` | Create user | Admin |
| GET | `/api/v1/users/:id` | Get user | Admin |
| PATCH | `/api/v1/users/:id` | Update user | Admin |
| DELETE | `/api/v1/users/:id` | Delete user | Admin |

## 🔐 Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

Tokens expire after 7 days. Use the refresh token endpoint to get a new access token.

## 🗄️ Database Schema

The application uses SQLite via Cloudflare D1. Key entities:

- **User** - Citizens, field workers, administrators
- **Report** - Citizen-submitted tree issues
- **Tree** - Individual trees in the registry
- **GreenSpace** - Parks, gardens, green strips
- **PlantingCampaign** - Tree planting initiatives
- **Notification** - Push notifications
- **AuditLog** - Admin action tracking

## 🌍 Geospatial Queries

Since SQLite doesn't support PostGIS, we use bounding box queries:

```typescript
// Calculate delta for radius in km
const latDelta = radius / 111.32;
const lonDelta = radius / (111.32 * Math.cos((lat * Math.PI) / 180));

// Query within bounding box
WHERE latitude BETWEEN lat - latDelta AND lat + latDelta
  AND longitude BETWEEN lon - lonDelta AND lon + lonDelta
```

For more precise distance calculations, implement the Haversine formula in your application logic.

## 📊 Free Tier Limits

Cloudflare's free tier includes:

- **D1 Database**: 5 GB storage, 5M read rows/day, 100K write rows/day
- **R2 Storage**: 10 GB storage, 10M reads/month, 1M writes/month
- **Workers**: 100K requests/day, 30M CPU ms/month
- **Pages**: Unlimited sites, 500 builds/month

This is sufficient for:
- ~50,000 citizens
- ~10,000 active monthly users
- ~5,000 reports/month
- ~20,000 photos

## 🔒 Security

- JWT tokens with short expiration (7 days)
- Refresh tokens for seamless re-authentication
- Role-based access control on all endpoints
- Input validation with Zod schemas
- CORS configured for specific origins
- Secure headers (HSTS, CSP, etc.)
- Audit logging for all admin actions
- Password hashing with bcrypt

## 🇪🇺 GDPR Compliance

- Data stored in EU region (R2 jurisdiction)
- Minimal data collection
- User data export capability
- Right to deletion supported
- No third-party trackers
- Transparent privacy policy required

## 🧪 Testing

```bash
# Run type checking
npm run typecheck

# Test with curl
curl http://localhost:8787/health

# Test authentication
curl -X POST http://localhost:8787/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sector5.ro","password":"password"}'
```

## 📝 Environment Variables

Set these in `wrangler.toml` or Cloudflare dashboard:

```toml
[vars]
JWT_SECRET = "your-super-secret-key-change-this"
JWT_EXPIRY = "7d"
REFRESH_TOKEN_EXPIRY = "30d"
ENVIRONMENT = "production"
```

## 🚨 Error Handling

All errors return consistent JSON format:

```json
{
  "error": "Error message here"
}
```

HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 📈 Monitoring

Use Cloudflare's built-in analytics:
- Request counts and latency
- Error rates
- Cache hit ratios
- D1 query performance

Access via Cloudflare Dashboard → Workers & Pages → Your Worker → Analytics

## 🔄 CI/CD

GitHub Actions example (`.github/workflows/deploy.yml`):

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run db:generate
      - name: Deploy to Cloudflare
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## 🤝 Integration with Frontend

Update your frontend API base URL:

```typescript
// web-dashboard/src/config.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

// mobile-app/src/config.ts
export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:8787' 
  : 'https://api.verde-sector5.ro';
```

## 📞 Support

For issues or questions:
- Check Cloudflare Workers documentation
- Review Hono framework docs
- Contact the development team

---

**Built with ❤️ for Sectorul 5, București**
