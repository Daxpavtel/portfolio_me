# DevPortfolio API

Express.js backend for the DevPortfolio platform.

## Setup

```bash
cp .env.example .env
npm install
npm run seed
npm run dev
```

## Verify API

```bash
# Health check
curl http://localhost:5000/api/v1/health

# Public endpoints
curl http://localhost:5000/api/v1/projects
curl http://localhost:5000/api/v1/skills
curl http://localhost:5000/api/v1/experience

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_password"}'
```
