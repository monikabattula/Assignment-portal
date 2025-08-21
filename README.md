# 📚 Assignment Submission Portal

A modern, full-stack web application for managing assignment submissions between students and instructors. Built with Next.js, featuring a beautiful UI and comprehensive functionality for educational institutions.

![Assignment Portal](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.24.11-black?style=for-the-badge)

## ✨ Features

### 🎓 For Students
- **User Registration & Authentication** - Secure login with role-based access
- **Assignment Browsing** - View all available assignments with deadlines
- **Assignment Submission** - Submit work via URL links (GitHub, Google Drive, etc.)
- **Submission Tracking** - Monitor submission status and instructor feedback
- **Real-time Updates** - Get instant notifications on submission status changes
- **Modern Dashboard** - Clean interface with submission statistics

### 👨‍🏫 For Instructors
- **Assignment Creation** - Create detailed assignments with descriptions and deadlines
- **Submission Management** - Review and evaluate student submissions
- **Status Updates** - Accept, reject, or provide feedback on submissions
- **Analytics Dashboard** - Visual charts showing submission statistics
- **Bulk Operations** - Efficiently manage multiple submissions

### 🎨 User Experience
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI/UX** - Beautiful gradient designs with smooth animations
- **Intuitive Navigation** - Easy-to-use interface for all user types
- **Loading States** - Professional loading indicators and feedback
- **Error Handling** - Comprehensive error messages and validation

## 🚀 Tech Stack

### Frontend
- **Next.js 15.4.5** - React framework with App Router
- **React 19.1.0** - Modern React with latest features
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Chart.js** - Interactive charts and analytics
- **NextAuth.js** - Authentication and session management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Database** - Flexible database integration
- **File Upload** - Support for various file hosting services

### Development
- **ESLint** - Code linting and quality assurance
- **Turbopack** - Fast development server
- **TypeScript Ready** - Full TypeScript support available

## 📦 Installation

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/SRR23/Assignment-Portal-Frontend.git
   cd Assignment-Portal-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL = API endpoint URL
   NEXTAUTH_SECRET = secret-key
   NEXTAUTH_URL = Base URL for authentication
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 🎯 Usage

### Student Workflow
1. **Register/Login** - Create an Student account or sign in
2. **Browse Assignments** - View available assignments on the dashboard
3. **Submit Work** - Click "Submit Assignment" and provide your work URL
4. **Track Progress** - Monitor submission status and feedback
5. **View Feedback** - Access instructor comments and grades

### Instructor Workflow
1. **Register/Login** - Create an instructor account
2. **Create Assignments** - Set up new assignments with descriptions and deadlines
3. **Review Submissions** - Access student submissions for each assignment
4. **Provide Feedback** - Give comments and update submission status
5. **Monitor Analytics** - View submission statistics and trends

## 🏗️ Project Structure

```
assignment-portal/
├── app/
│   ├── api/                    # API routes
│   │   └── auth/              # Authentication endpoints
│   ├── components/            # Reusable UI components
│   │   └── Navbar.js          # Navigation component
│   ├── dashboard/             # Dashboard page
│   ├── instructor/            # Instructor-specific pages
│   │   ├── create-assignment/ # Assignment creation
│   │   └── submissions/       # Submission management
│   ├── login/                 # Authentication pages
│   ├── register/              # User registration
│   ├── student/               # Student-specific pages
│   │   ├── submissions/       # Submission history
│   │   └── submit/            # Assignment submission
│   ├── hooks/                 # Custom React hooks
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   └── page.js                # Home page
├── public/                    # Static assets
├── middleware.js              # Next.js middleware
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```