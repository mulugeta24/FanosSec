# FANOS SEC

FANOS SEC is a cybersecurity education platform for structured learning, practical labs, security challenges, and verifiable certification. The application combines a React web client, an Express API, and a MongoDB data layer.

> Learn. Practice. Challenge. Certify.

## Platform Overview

FANOS SEC combines a modern web application, a RESTful backend, cloud database infrastructure, and an isolated cybersecurity training sandbox. Learners can progress from foundational concepts to practical exercises while administrators manage educational content, assessments, users, certificates, and security knowledge.

The platform is organized around four stages:

```text
LEARN -> PRACTICE -> CHALLENGE -> CERTIFY
```

Learners follow structured paths, complete courses and lessons, practice in controlled labs, solve security challenges, complete assessments, track progress, and earn verifiable certificates.

## Contents

- [Capabilities](#capabilities)
- [Architecture](#architecture)
- [Technology](#technology)
- [Requirements](#requirements)
- [Local development](#local-development)
- [Configuration](#configuration)
- [Application areas](#application-areas)
- [Deployment](#deployment)
- [Security notes](#security-notes)
- [License](#license)

## Capabilities

- JWT authentication with student and administrator roles
- Courses, modules, lessons, videos, resources, quizzes, and learning paths
- Hands-on labs and CTF-style challenges with progress and scoring
- Security guides, tools, vulnerabilities, advisories, threat intelligence, and glossary content
- Student enrollment, progress tracking, and PDF certificate generation
- Public certificate verification backed by the certificate registry
- Administrative CMS for managing learning and knowledge content
- Responsive frontend with dashboards for learners and administrators

### Authentication and Access Control

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based authorization for students and administrators
- Protected API endpoints and authenticated dashboards

### Hands-on Training

The isolated training sandbox currently provides intentionally vulnerable SQL injection and stored cross-site scripting (XSS) scenarios for authorized educational use. It is designed to keep practical experimentation separate from the main application and database.

### Security Knowledge Hub

The knowledge layer brings together security guides, vulnerability information, advisories, threat intelligence, security tools, news, glossary entries, cheat sheets, and technical articles.

### Certification Workflow

```text
Course Completion -> Eligibility Check -> PDF Generation -> Registry -> Public Verification
```

Certificates are generated for eligible learners and recorded in a registry that supports public verification.

## Architecture

```text
frontend/                 React 19 + Vite client
    |
    | HTTP/JSON (VITE_API_URL)
    v
backend/                  Express 5 REST API
    |
    v
MongoDB Atlas              Mongoose models and persistence

fanos-training-sandbox/   Isolated local labs on port 8080
```

The repository contains three independently runnable Node.js applications and one shared data service:

| Service | Technology | Port | Responsibility |
| --- | --- | ---: | --- |
| Frontend | React + Vite | `5173` | Learner and admin web application |
| Backend | Node.js + Express | `5000` | REST API, authentication, CMS, and certificates |
| Training sandbox | Express + SQLite | `8080` | Local SQL injection and stored XSS practice labs |
| MongoDB | MongoDB Atlas and Mongoose | Cloud | Persistent application data |

## Technology

- **Frontend:** React 19, React Router, Vite, Tailwind CSS, Framer Motion, Axios, Recharts
- **Backend:** Node.js, Express 5, Mongoose, MongoDB, JWT, bcryptjs, PDFKit
- **Training sandbox:** Express 4, SQLite, `sql.js`, and `sqlite3`
- **Deployment:** Vercel for the frontend and Render for the API

## Requirements

- Node.js 18 or later
- npm 9 or later
- A MongoDB Atlas database, or another reachable MongoDB instance
- Git

## Local development

Install dependencies in each application directory:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../fanos-training-sandbox
npm install
```

Create the backend environment file described in [Configuration](#configuration), then start the services in separate terminals:

```bash
# Terminal 1: API
cd backend
npm run dev

# Terminal 2: frontend
cd frontend
npm run dev

# Terminal 3: optional training sandbox
cd fanos-training-sandbox
npm run dev
```

Open the frontend at `http://localhost:5173`. The API health response is available at `http://localhost:5000/`. When the sandbox is running, open `http://localhost:8080`.

### Database seeding

The backend includes seed and administrator utilities. Run them from `backend` only after configuring a valid `MONGO_URI`:

```bash
cd backend
npm run seed
node ensure-admin.js
```

Review the scripts before running them against a shared or production database.

### Frontend quality checks

```bash
cd frontend
npm run lint
npm run build
```

## Configuration

Create `backend/.env` and keep it out of source control:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:5173
```

Create `frontend/.env` when the API is not running at the default local URL:

```env
VITE_API_URL=http://localhost:5000/api
```

`VITE_API_URL` must include the `/api` path. In local development the frontend defaults to `http://localhost:5000/api` when the variable is absent.

## Application areas

The API is organized by domain under `backend/routes/` and `backend/controllers/`:

- Authentication: `/api/auth`
- Learning: `/api/courses`, `/api/modules`, `/api/lessons`, `/api/videos`, `/api/resources`, `/api/paths`
- Assessment: `/api/quizzes`, `/api/question-bank`, `/api/challenges`, `/api/enrollments`
- Certification: `/api/certificates`
- Knowledge hub: `/api/blogs`, `/api/news`, `/api/guides`, `/api/glossary`, `/api/cheat-sheets`
- Security intelligence: `/api/vulnerabilities`, `/api/threat-intel`, `/api/security-advisories`, `/api/security-tools`
- Administration: `/api/admin/dashboard`, `/api/users`, and `/api/admin-activities`

## Deployment

### Backend on Render

The included `render.yaml` defines the API service:

1. Create a Render web service connected to this repository.
2. Set the root directory to `backend`.
3. Use `npm install` as the build command and `node server.js` as the start command.
4. Configure `MONGO_URI`, `JWT_SECRET`, and `FRONTEND_URL` as secret environment variables.
5. Set `NODE_ENV=production`.

### Frontend on Vercel

1. Create a Vercel project connected to this repository.
2. Set the root directory to `frontend`.
3. Use the default Vite build settings, or run `npm run build` and publish `dist`.
4. Set `VITE_API_URL` to the deployed API URL ending in `/api`, for example `https://your-api.onrender.com/api`.

## Security notes

- Never commit `.env` files, database credentials, JWT secrets, or generated private keys.
- Use a strong, unique `JWT_SECRET` in every deployed environment.
- Restrict `FRONTEND_URL` in production instead of relying on a wildcard CORS origin.
- The training sandbox intentionally contains SQL injection and stored XSS vulnerabilities. Run it locally for authorized training only; do not expose it to the public internet or a production database.
- Treat all challenge payloads and captured flags as educational content, not as authorization to test third-party systems.

## Project Goals

FANOS SEC is designed around a practical cybersecurity development model:

```text
FOUNDATION -> LEARNING -> PRACTICE -> CHALLENGES -> ASSESSMENT -> CERTIFICATION
```

The long-term goal is to make security learning structured, accessible, and practice-oriented, with measurable progress and demonstrable achievements.

## Project Status

**Status:** Active development

New educational content, practical laboratories, challenges, administrative capabilities, and platform features are added over time.

## Contributing

Contributions, suggestions, and improvements are welcome:

1. Create a focused feature branch.
2. Follow the existing project structure and conventions.
3. Test changes locally.
4. Run frontend linting and the production build where applicable.
5. Submit a clear pull request describing the change and validation performed.

## Responsible Security Use

FANOS SEC is intended for cybersecurity education, authorized security testing, and controlled laboratory environments. Users are responsible for complying with applicable laws, regulations, organizational policies, and explicit authorization requirements.

The training sandbox intentionally contains vulnerable functionality. Do not connect it to production databases, deploy it publicly, or use its payloads against systems without authorization.

## License

This project is released under the MIT License. See the repository license metadata for the applicable terms.

## Maintainer

### Mulugeta Ababi

**Founder and Maintainer - FANOS SEC**

FANOS SEC is developed as a cybersecurity education and practical training platform focused on making security learning more structured, accessible, and practice-oriented.

For project and training updates:

- **YouTube:** [ApexTechEthiopia](https://www.youtube.com/@ApexTechEthiopia)
- **Telegram:** [InfoSecureTech](https://t.me/InfoSecureTech)
