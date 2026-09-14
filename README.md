# 🛡️ FANOS SEC

> A professional cybersecurity learning and practical security training platform — built with React 19, Node.js, Express 5, and MongoDB Atlas.
>
> **Core Identity:** *Learn. Practice. Challenge. Certify.*

![GitHub repo size](https://img.shields.io/github/repo-size/mulugeta24/darkmodecyber)
![GitHub last commit](https://img.shields.io/github/last-commit/mulugeta24/darkmodecyber)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Live Demo

- **Frontend:** [Vercel](https://darkmodecyber.vercel.app) *(deploy to activate)*
- **Backend API:** [Render](https://darkmodecyber-api.onrender.com) *(deploy to activate)*

---

## ✨ Features

- 🔐 JWT Authentication with role-based access control (Admin / Student)
- 📚 4 Professional Cybersecurity Certification Tracks (DMCST, DMCWSS, DMCCRT, DMCCBT)
- 🗺️ Structured Learning Paths (Fundamentals, Red Team, Blue Team, SOC Analyst, Web Security)
- 🧪 Hands-On Interactive Labs & Virtual Sandboxes across 6 security categories
- 🚩 Security Challenges & CTF Arena with dynamic flag verification and points
- 📖 Cybersecurity Knowledge Hub (Security Guides, Security Tools, Vulnerabilities, Threat Intel)
- 📊 Student Progress Tracking System with live completion metrics
- 🏆 Verifiable PDF Certification Center with cryptographic verification registry (`/verify`)
- 👨‍💼 Comprehensive Admin Dashboard (courses, paths, challenges, blogs, messages)
- 📝 Cyber Threat Intelligence & Blog platform
- 📬 Direct transmission contact system with admin inbox
- 🌐 Fully responsive, state-of-the-art dark cybersecurity UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcryptjs |
| PDF | PDFKit |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📁 Project Structure

```
fanossec/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   └── data/
    └── index.html
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend
```bash
cd backend
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_atlas_uri
# JWT_SECRET=your_secret_key
# PORT=5000
node server.js
```

### Seed Database
```bash
cd backend
node seeder.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Authentication & Access Setup

- **Admin Account:** Create an administrator account using the secure setup process or administrative seed command configured with your private environment variables.
- **Student Account:** Use the registration page (`/signup`) to create a learner account and begin tracking progress.

---

## 📜 Professional Certification Tracks

| Track | Level | Focus |
|-------|-------|-------|
| FANOS SEC Security Tester (DMCST) | Beginner | Foundational programming, networking, offensive & defensive basics |
| FANOS SEC Web Security Specialist (DMCWSS) | Intermediate | OWASP Top 10, API security, WAF bypass, bug hunting |
| FANOS SEC Certified Red Teamer (DMCCRT) | Intermediate | Enterprise penetration testing, Active Directory, evasion & pivoting |
| FANOS SEC Certified Blue Teamer (DMCCBT) | Advanced | Threat hunting, SIEM engineering, malware analysis, incident response |

---

## 🚀 Deployment

### Backend → Render
1. New Web Service → connect this repo
2. Root Directory: `backend`
3. Build: `npm install` | Start: `node server.js`
4. Add env vars: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`

### Frontend → Vercel
1. New Project → connect this repo
2. Root Directory: `frontend`
3. Add env var: `VITE_API_URL=https://your-render-url.onrender.com/api`

---

## 👨‍💻 Author & Leadership

**Mulugeta Ababi**
- Cybersecurity Instructor & Platform Administrator
- YouTube: [@ApexTechEthiopia](https://www.youtube.com/@ApexTechEthiopia)
- Telegram: [InfoSecureTech](https://t.me/InfoSecureTech)
- Email: mulugetaababi237@gmail.com

---

## 📄 License

MIT License — feel free to use and modify.

---

*Built with ❤️ for the cybersecurity community in Ethiopia and beyond.*
