# 🌿 AyurLife - Ayurveda Wellness Web Application

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-18-green.svg)](https://nodejs.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan.svg)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

A comprehensive web application for **personalized Ayurveda wellness management**, helping users discover their unique constitution (**Prakriti**) and receive customized health recommendations for optimal balance and lifestyle.

---

## 🚀 Features

### 🎯 Core Features
- 🔐 **User Authentication** — Secure registration and login system  
- 👤 **User Profile** — Manage personal and health information  
- 🧘‍♂️ **Prakriti Analysis** — AI-driven questionnaire to determine Vata, Pitta, or Kapha constitution  
- 🥗 **Personalized Diet Plan** — Nutrition suggestions based on Prakriti  
- 🕒 **Daily Routine** — Personalized schedule recommendations  
- 📈 **Progress Tracking** — Monitor wellness metrics and improvements  
- 🧘‍♀️ **Yoga & Wellness** — Guided yoga and meditation modules  
- 📊 **Reports & Analytics** — Comprehensive wellness insights

### 🎨 UI/UX Features
- 🌓 **Theme Toggle** — Light and dark modes  
- 💻 **Responsive Design** — Fully optimized for desktop and mobile  
- 🧭 **Intuitive Navigation** — Sidebar and dashboard for quick access  
- 📋 **User-Friendly Dashboard** — Personalized overview at a glance

### 👨‍💼 Admin Features
- 👥 **User Management** — View and manage user information  
- 🔔 **Follow-ups** — Track progress and send reminders  
- 📉 **Analytics** — View wellness statistics and trends

---

## 🧩 Tech Stack

### 🖥️ Frontend
- **React.js** — UI library  
- **Next.js (App Router)** — Framework for server-side rendering and routing  
- **Tailwind CSS** — Utility-first CSS styling  
- **TypeScript** — Type-safe development

### ⚙️ State Management
- **React Context API** — Global state for authentication and theme handling

### 🔧 Backend
- **Node.js** — JavaScript runtime environment  
- **Express.js** — Web framework  
- **RESTful API** — Structured API architecture

### 🗄️ Database
- **Local Storage** (for demo)
- *(Easily extendable to MongoDB, PostgreSQL, etc.)*

---

## 🏗️ Project Structure

```bash
ayurlife/
├── app/
│ ├── layout.tsx # Root layout with providers
│ ├── globals.css # Global styles
│ ├── page.tsx # Home/redirect page
│ ├── register/ # Registration page
│ ├── login/ # Login page
│ └── dashboard/ # Dashboard and features
│ ├── layout.tsx # Dashboard layout
│ ├── page.tsx # Dashboard home
│ ├── profile/ # User profile
│ ├── prakriti-analysis/ # Prakriti assessment
│ ├── diet-plan/ # Diet recommendations
│ ├── daily-routine/ # Daily schedule
│ ├── progress/ # Progress tracking
│ ├── yoga-wellness/ # Yoga & meditation
│ ├── reports/ # Reports & analytics
│ └── settings/ # User settings
├── components/
│ ├── sidebar.tsx # Navigation sidebar
│ ├── navbar.tsx # Top navigation bar
│ └── ui/ # UI components
├── context/
│ ├── auth-context.tsx # Authentication context
│ └── theme-context.tsx # Theme management
└── README.md # This file
```


---

## ⚙️ Getting Started

### 📋 Prerequisites
- Node.js **v18+**
- npm or yarn

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ayurlife
   ```
   
2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**

- Visit http://localhost:3000
  
---

## 🧭 User Flow

### 🪔 1. Registration

- Enter full name, email, and password
- Account is created and stored
- Redirects to login page

### 🔑 2. Login

- User logs in with email and password
- Redirects to personalized dashboard

### 🏠 3. Dashboard

- Welcome message and quick stats
- Prakriti status, profile completion, and wellness score

### 🧘‍♂️ 4. Prakriti Assessment

- 8-question quiz with Vata, Pitta, Kapha options
- Generates a constitution profile with traits

### 🥗 5. Personalized Recommendations

- Diet plans, daily routines, and yoga guidance
- Based on the user’s unique Prakriti

### 📈 6. Progress Tracking

- Weekly progress summaries
- Wellness score updates and suggestions

---

## 🎨 Color Theme

### Inspired by Ayurveda’s calming tones:

- **Primary** : Teal ```#16A085```
- **Background** : Light mint/cream
- **Dark Mode** : Dark slate with teal accents

---

## 🔍 Features in Detail

### 🧘‍♂️ Prakriti Analysis

Assesses 8 key aspects:

1. Body frame
2. Skin type
3. Appetite
4. Digestion
5. Sleep pattern
6. Memory
7. Speech
8. Emotional nature

Determines whether the user is predominantly Vata, Pitta, or Kapha.

### 🥗 Personalized Diet Plans

- Recommended foods for balance
- Foods to avoid
- Sample daily meals and timing

### 🕒 Daily Routine

Custom schedules for:

- Morning: Yoga, oil massage, breakfast
- Afternoon: Work, rest, lunch
- Evening: Meditation, dinner, sleep time

### 🔮 Future Enhancements

 - Backend integration with database
 - JWT authentication
 - Admin management panel
 - Email reminders and notifications
 - Yoga video tutorials
 - Wearable device integration
 - AI-powered wellness suggestions
 - Community & discussion forums
 - Appointment scheduling
 - Mobile app (React Native)

---


## 🙏 Acknowledgments

- Ayurveda principles and ancient wellness practices
- Modern web development best practices
- Valuable feedback from the community

---

Made with ❤️ for AyurLife — Your personalized path to Ayurvedic wellness 🍃

