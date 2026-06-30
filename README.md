# DevPortfolio

A modern, production-ready personal portfolio website with a public-facing site and a private admin dashboard for content management. Built with vanilla HTML/CSS/JS frontend and Express.js + MongoDB backend.

## Tech Stack

**Frontend:** HTML5, CSS3 (vanilla), JavaScript ES6+  
**Backend:** Node.js, Express.js  
**Database:** MongoDB with Mongoose  
**Auth:** JWT + bcrypt  
**Email:** Nodemailer  
**Security:** Helmet, CORS, express-rate-limit, express-validator

## Project Structure

```
devportfolio/
├── client/                  # Static frontend
│   ├── index.html           # Single-page portfolio
│   ├── admin/               # Admin dashboard (login + CRUD)
│   ├── css/                 # Stylesheets
│   ├── js/                  # JavaScript modules
│   └── assets/              # Images, icons, resume
├── server/                  # Express API backend
│   ├── src/
│   │   ├── config/          # DB connection, env validation
│   │   ├── models/          # Mongoose schemas
│   │   ├── controllers/     # Route handlers
│   │   ├── routes/          # Express routers
│   │   ├── middleware/       # Auth, validation, rate limiting
│   │   ├── validators/      # express-validator rules
│   │   ├── utils/           # Helpers (ApiError, sendEmail, etc.)
│   │   └── scripts/         # seed.js
│   ├── .env.example
│   └── package.json
└── .gitignore
```

## Local Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or [Atlas free tier](https://mongodb.com/atlas))

### Server

```bash
cd server
cp .env.example .env
# Edit .env — add your MongoDB URI and set a JWT_SECRET + ADMIN_PASSWORD
npm install
npm run seed     # Populates sample data + creates admin user
npm run dev      # Starts on http://localhost:5000
```

Open **http://localhost:5000** — the server serves both the API and the frontend.

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret for signing JWT tokens |
| `ADMIN_USERNAME` | Yes | Initial admin username (seed only) |
| `ADMIN_PASSWORD` | Yes | Initial admin password (seed only) |
| `NODE_ENV` | No | `development` or `production` |
| `PORT` | No | Server port (default 5000) |
| `CLIENT_URL` | No | Frontend origin for CORS (production) |
| `EMAIL_HOST` | No | SMTP host (default smtp.gmail.com) |
| `EMAIL_PORT` | No | SMTP port (default 587) |
| `EMAIL_USER` | No | SMTP username |
| `EMAIL_PASS` | No | SMTP password or app password |
| `OWNER_EMAIL` | No | Where contact notifications go |

### npm Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm start` | Start production server |
| `npm run seed` | Seed database with sample data |

## API Endpoints

Base path: `/api/v1`

### Public

| Method | Endpoint | Description |
|---|---|---|
| GET | `/projects` | List projects (`?category=`, `?featured=true`) |
| GET | `/projects/:id` | Get single project |
| GET | `/skills` | List skills |
| GET | `/experience` | List experience |
| POST | `/contact` | Send contact message (rate-limited) |
| GET | `/health` | Health check |

### Admin (requires JWT)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Login, returns JWT |
| GET | `/auth/me` | Verify token / get current admin |
| POST | `/projects` | Create project |
| PUT | `/projects/:id` | Update project |
| DELETE | `/projects/:id` | Delete project |
| POST | `/skills` | Create skill |
| PUT | `/skills/:id` | Update skill |
| DELETE | `/skills/:id` | Delete skill |
| POST | `/experience` | Create experience entry |
| PUT | `/experience/:id` | Update experience entry |
| DELETE | `/experience/:id` | Delete experience entry |
| GET | `/contact` | List messages (paginated) |
| PATCH | `/contact/:id/read` | Mark message as read |
| DELETE | `/contact/:id` | Delete message |

## Admin Dashboard

Access at **/admin/login.html** after starting the server. Login with the credentials from your `.env` file. From the dashboard you can manage all portfolio content (projects, skills, experience) and view contact messages.

## Deployment

### 1. MongoDB Atlas
Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas), set up database access and network access (allow `0.0.0.0/0`), and copy your connection string.

### 2. Backend — Render
- Push code to GitHub
- Create a [Render](https://render.com) Web Service connected to your repo
- Set Root Directory: `server`, Build: `npm install`, Start: `npm start`
- Add all environment variables from `.env.example`
- Deploy and copy the URL

### 3. Frontend — Vercel
- Create a [Vercel](https://vercel.com) project from the same repo
- Set Root Directory: `client`, Output Directory: `.`
- Add environment variable: `API_BASE_URL` = `https://your-backend-url.onrender.com/api/v1`
- Deploy

## License

MIT
