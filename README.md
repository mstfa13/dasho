# Dasho - Life Tracking App

A fullstack life tracking application built with Next.js, TypeScript, and Tailwind CSS. The app helps users track their daily activities and provides dashboard insights across different areas of life.

## 🚀 Features

- **Daily Activity Logging**: Track daily activities like gym, shower, medication, training, coding, etc.
- **Dashboard Pages**: Dedicated dashboards for different life areas:
  - Boxing Dashboard
  - Gym Dashboard
  - Career Dashboard
  - Relationships Dashboard
  - Analytics Dashboard
- **Local Data Storage**: All data is stored locally in browser localStorage (no backend required)
- **User Authentication**: Simple local authentication system
- **Responsive Design**: Works on both web and mobile devices
- **Interactive Charts**: Beautiful charts powered by Chart.js
- **Progress Tracking**: Visual progress indicators and completion percentages

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React icons, Heroicons
- **UI Components**: Headless UI
- **Notifications**: react-hot-toast
- **Data Storage**: Browser localStorage (no backend)
- **File Processing**: xlsx, papaparse (for future CSV/Excel import)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd dasho
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📱 Usage

1. **Sign Up/Sign In**: Create an account or sign in (data stored locally)
2. **Daily Log**: Navigate to the daily log page to track your activities
3. **Dashboards**: View insights and charts in different dashboard areas
4. **Analytics**: Get comprehensive analytics across all life areas

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── analytics/         # Analytics dashboard
│   ├── daily-log/         # Daily activity logging
│   ├── dashboard/         # Life area dashboards
│   │   ├── boxing/
│   │   ├── career/
│   │   ├── gym/
│   │   └── relationships/
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── AuthForm.tsx       # Authentication form
│   └── Navigation.tsx     # Navigation component
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication context
└── types/                 # TypeScript type definitions
    └── index.ts
```

## 🔧 Data Storage

This app uses browser localStorage for all data persistence:

- **User Data**: Stored in `dasho-users` (all registered users)
- **Current User**: Stored in `dasho-user` (currently logged-in user)
- **Activity Data**: Stored in `dasho-activities-{userId}-{date}` format

## 📊 Key Components

### Daily Activity Logging
- Track multiple activities per day
- Mark activities as completed
- Progress visualization
- Data persistence across sessions

### Dashboard Analytics
- Interactive charts and graphs
- Progress tracking over time
- Category-specific insights
- Performance metrics

### User Authentication
- Local authentication system
- User registration and login
- Session persistence
- Secure data separation per user

## 🚧 Future Enhancements

- CSV/Excel data import functionality
- Goal setting and tracking
- Advanced analytics and insights
- PWA (Progressive Web App) features
- Data export capabilities
- Team/social features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with Next.js and TypeScript
- UI inspired by modern dashboard designs
- Charts powered by Chart.js
- Icons from Lucide React and Heroicons
