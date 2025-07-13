# 🧠 MockGenius – AI-Powered Mock Interview Platform

![React](https://img.shields.io/badge/Frontend-React.js-blue?style=for-the-badge\&logo=react)
![Firebase](https://img.shields.io/badge/Backend-Firebase-orange?style=for-the-badge\&logo=firebase)
![Gemini AI](https://img.shields.io/badge/AI-Gemini-blueviolet?style=for-the-badge\&logo=google)
![Clerk](https://img.shields.io/badge/Auth-Clerk-9cf?style=for-the-badge\&logo=clerk)
![Tailwind CSS](https://img.shields.io/badge/UI-TailwindCSS-38bdf8?style=for-the-badge\&logo=tailwindcss)
![ShadCN UI](https://img.shields.io/badge/UI-ShadCN_UI-7e22ce?style=for-the-badge)
![Vite](https://img.shields.io/badge/Bundler-Vite-646cff?style=for-the-badge\&logo=vite)

## 🚀 Live Preview

🔗 [Visit MockGenius](https://mockgenius-194e5.web.app)
📂 [View GitHub Repository](https://github.com/ImKrish-2K04/MockGenius---Mock-Interview-Project)

---

## 📌 Project Overview

**MockGenius** is a full-stack mock interview platform that leverages **Gemini AI (Google GenAI)** to simulate realistic interview scenarios for software developers. It dynamically generates domain-specific questions, evaluates user responses, and delivers AI-powered feedback — mimicking a real interviewer experience, right from your browser.

> Built as a production-grade portfolio project with real-world architecture, AI integration, and advanced developer tooling.

---

## 🎯 Key Features

* 🤖 **AI-Driven Question Generation** via Gemini API
* 📝 **Automated Answer Evaluation** & Feedback System
* 🔐 **Authentication** using Clerk for secure, modern login
* ☁️ **Cloud Firestore** for scalable NoSQL storage
* 📊 **Interview Session Tracking** (question + answer + feedback)
* 🌙 **Dark/Light Mode Toggle** with theme persistence
* 📱 **Mobile-Responsive UI** using TailwindCSS + ShadCN UI
* ⚡ **Instant Routing** using React Router v6
* 🧪 **Edge-Optimized Deployment** on Firebase Hosting

---

## 🛠️ Tech Stack

### Frontend

* React.js (Functional Components + Hooks)
* React Router DOM (Client-side Routing)
* Tailwind CSS (Utility-first styling)
* ShadCN UI (Accessible component library)
* TypeScript (for type-safety & scalability)
* Vite (for blazing-fast development and build)

### Backend & Services

* Firebase (Hosting + Firestore + Rules)
* Firestore (Real-time NoSQL DB)
* Clerk (Authentication + JWT tokens)
* Gemini AI API (LLM-powered responses)

---

## 🧩 Folder Structure

```bash
📦MockGenius
├── public
├── src
│   ├── components       # UI Components (Buttons, Inputs, Feedback Cards)
│   ├── pages            # Route-level components (Home, Interview, Result)
│   ├── services         # Firestore + Gemini AI interaction logic
│   ├── hooks            # Custom hooks for loading state, auth, theme
│   ├── context          # App-wide state management (User, Theme, etc.)
│   ├── routes           # Protected routing + Layouts
│   ├── utils            # Utility functions (formatting, validation, etc.)
│   └── App.tsx          # Root React Component
├── .env                 # Environment variables (Gemini, Firebase, Clerk)
└── vite.config.ts       # Vite Configuration
```

---
## 📸 UI Preview (DESKTOP)

### 🚀 Landing Page  
<img width="100%" alt="Landing Page" src="https://github.com/user-attachments/assets/c86e10f7-65b1-48f6-aa78-8197c76a687c" />

---

### 🧠 Interview Session  
<p align="center">
  <img width="49%" alt="Interview Question" src="https://github.com/user-attachments/assets/991ac947-cb48-4030-b2d8-ecdc463daf8b" />
  <img width="49%" alt="Answer & Feedback" src="https://github.com/user-attachments/assets/a7d64250-5b0f-42dd-87d1-b16d313f08f7" />
</p>

---

### 💬 Feedback Generation  
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/a9bc2211-3c95-449e-8d7b-450649b7dfb3" />

---

### 🔐 Auth Flow  
<p align="center">
  <img width="49%" alt="Dashboard View 1" src="https://github.com/user-attachments/assets/0e947ec1-8d35-42a7-a660-5c09e088d2c5" />
  <img width="49%" alt="Dashboard View 2" src="https://github.com/user-attachments/assets/9a8a7e0b-6cf0-4a65-86d6-94eb4f72bffe" />
</p>


---

### 📊 Dashboard  
<p align="center">
  <img width="49%" alt="Dashboard View 1" src="https://github.com/user-attachments/assets/f81967da-45b6-482c-aa50-80a359f0fb4b" />
  <img width="49%" alt="Dashboard View 2" src="https://github.com/user-attachments/assets/d5c7ca5c-4858-47b5-b439-35e0180695f0" />
</p>





---

## 📈 Advanced Concepts Implemented

* **Gemini Prompt Engineering** for context-aware question & feedback generation
* **Firestore Rules** for secure read/write access scoped to authenticated users
* **Global Loading Skeletons** for async Gemini & Firestore calls
* **Dark Mode with Theme Persistence** via localStorage
* **React Context API** for user session, UI state, and theming
* **Error Boundaries + Toast Notifications** for graceful failures
* **Production Firebase Hosting** + Deployment workflow via CLI

---

## 🧪 Local Development Setup

```bash
# 1. Clone the repo
$ git clone https://github.com/ImKrish-2K04/MockGenius---Mock-Interview-Project.git

# 2. Install dependencies
$ cd MockGenius---Mock-Interview-Project
$ npm install

# 3. Setup Environment Variables (.env file)
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_FIREBASE_CONFIG=your_firebase_config
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

# 4. Start development server
$ npm run dev
```

> **Note**: You must have Firebase and Clerk projects created with the corresponding credentials.

---

## 📚 Learning Goals

This project was built to:

* Deeply understand AI API integration (LLMs in web apps)
* Practice full-stack development with serverless architecture
* Design scalable Firestore schema & secure client-access rules
* Build real-world auth flows using Clerk
* Polish advanced UI/UX with developer-first tools

---

## 🙋‍♂️ Author

Made with ❤️ by **Krishna** — a full-stack dev & AI enthusiast.
🔗 [LinkedIn](https://www.linkedin.com/in/krisxdev/) | [GitHub](https://github.com/ImKrish-2K04)

---

## ⭐ Feedback & Contributions

Have suggestions or want to contribute? Feel free to:

* ⭐ Star the repo to show support
* 🐛 Open an issue if something breaks
* 📬 Drop feedback on LinkedIn or GitHub Discussions

---

## 📌 License

This project is open source under the MIT License. Use, remix, and build upon it freely!
