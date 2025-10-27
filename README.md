# AyurLife - Ayurveda Wellness Web Application

A comprehensive web application for personalized Ayurveda wellness management, helping users discover their unique constitution (Prakriti) and receive personalized health recommendations.

## Features

### 🎯 Core Features
- **User Authentication**: Secure registration and login system
- **User Profile**: Manage personal health information
- **Prakriti Analysis**: AI-driven questionnaire to determine Vata, Pitta, or Kapha constitution
- **Personalized Diet Plan**: Customized nutrition recommendations based on Prakriti
- **Daily Routine**: Personalized schedule suggestions for optimal wellness
- **Progress Tracking**: Monitor wellness metrics and improvements
- **Yoga & Wellness**: Guided yoga practices and meditation
- **Reports & Analytics**: Comprehensive wellness reports

### 🎨 UI/UX Features
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Intuitive Navigation**: Easy-to-use sidebar menu
- **User-Friendly Dashboard**: Quick access to all features

### 👨‍💼 Admin Features
- **Student Data Management**: View and manage user information
- **Follow-ups**: Track user progress and send reminders
- **Analytics**: View overall wellness statistics

## Tech Stack

### Frontend
- **React.js**: UI library
- **Next.js**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development

### State Management
- **React Context API**: Global state management for authentication and theme

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **RESTful API**: Standard API architecture

### Database
- **Local Storage**: Client-side data persistence (for demo)
- *Can be extended with MongoDB, PostgreSQL, etc.*

## Project Structure

\`\`\`
ayurlife/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── globals.css             # Global styles
│   ├── page.tsx                # Home/redirect page
│   ├── register/               # Registration page
│   ├── login/                  # Login page
│   └── dashboard/              # Dashboard and features
│       ├── layout.tsx          # Dashboard layout
│       ├── page.tsx            # Dashboard home
│       ├── profile/            # User profile
│       ├── prakriti-analysis/  # Prakriti assessment
│       ├── diet-plan/          # Diet recommendations
│       ├── daily-routine/      # Daily schedule
│       ├── progress/           # Progress tracking
│       ├── yoga-wellness/      # Yoga & meditation
│       ├── reports/            # Reports & analytics
│       └── settings/           # User settings
├── components/
│   ├── sidebar.tsx             # Navigation sidebar
│   ├── navbar.tsx              # Top navigation bar
│   └── ui/                     # UI components
├── context/
│   ├── auth-context.tsx        # Authentication context
│   └── theme-context.tsx       # Theme management
└── README.md                   # This file
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ayurlife
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   - Navigate to `http://localhost:3000`

## User Flow

### 1. Registration
- User enters full name, email, and password
- Account is created and stored
- Redirects to login page

### 2. Login
- User enters email and password
- Authentication verified
- Redirects to dashboard

### 3. Dashboard
- Welcome message with user's name
- Quick stats: Prakriti status, profile completion, wellness score
- Quick action buttons

### 4. Prakriti Assessment
- 8-question questionnaire
- Each question has 3 options (Vata, Pitta, Kapha)
- Results calculated based on answers
- Prakriti type displayed with characteristics

### 5. Personalized Recommendations
- **Diet Plan**: Foods to include/avoid based on Prakriti
- **Daily Routine**: Suggested schedule for morning, afternoon, evening
- **Yoga & Wellness**: Yoga poses and meditation practices

### 6. Progress Tracking
- Weekly progress metrics
- Overall wellness score
- Recommendations for improvement

## Color Theme

The application uses a teal/green color scheme inspired by Ayurveda:
- **Primary Color**: Teal (#16A085)
- **Background**: Light mint/cream
- **Dark Mode**: Dark slate with teal accents

## Features in Detail

### Prakriti Analysis
The questionnaire assesses 8 key aspects:
1. Body frame
2. Skin type
3. Appetite
4. Digestion
5. Sleep pattern
6. Memory
7. Speech
8. Emotional nature

Results determine if user is predominantly Vata, Pitta, or Kapha.

### Personalized Diet Plans
Each Prakriti type receives:
- **Recommended foods** to balance constitution
- **Foods to avoid** that aggravate the dosha
- **Sample daily meals** with timing

### Daily Routine
Customized schedule including:
- **Morning routine**: Wake time, oil massage, yoga, breakfast
- **Afternoon routine**: Lunch, work, rest periods
- **Evening routine**: Meditation, dinner, sleep time

## Future Enhancements

- [ ] Backend API integration with database
- [ ] User authentication with JWT tokens
- [ ] Admin panel for managing users
- [ ] Email notifications and reminders
- [ ] Video tutorials for yoga poses
- [ ] Integration with wearable devices
- [ ] AI-powered health recommendations
- [ ] Community features and forums
- [ ] Appointment booking with Ayurveda practitioners
- [ ] Mobile app version

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact: support@ayurlife.com

## Acknowledgments

- Ayurveda principles and practices
- Modern web development best practices
- Community feedback and suggestions

---

**AyurLife** - Your personalized path to Ayurvedic wellness 🍃
