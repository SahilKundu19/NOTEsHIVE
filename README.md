# NOTEsHIVE - Note Taking Web App

A modern, feature-rich note-taking application built with React, TypeScript, and Firebase. This project provides a seamless experience for creating, organizing, and managing personal notes with advanced features like rich text editing, tagging, search, and user authentication.


---------------------------------------------


## Screenshots of Trackify

- Light Mode
  ![NOTEsHIVE Screenshot](https://github.com/SahilKundu19/NOTEsHIVE/blob/3ceecdac3bc1220f7ab7fd1a956327f921f22b5d/NOTEsHIVE-Light-Mode.png)
  
- Dark Mode
  ![NOTEsHIVE Screenshot](https://github.com/SahilKundu19/NOTEsHIVE/blob/3ceecdac3bc1220f7ab7fd1a956327f921f22b5d/NOTEsHIVE-Dark-Mode.png)
  
- Mobile View
  ![NOTEsHIVE Screenshot](https://github.com/SahilKundu19/NOTEsHIVE/blob/3ceecdac3bc1220f7ab7fd1a956327f921f22b5d/NOTEsHIVE-Mobile-View.png) 

---------------------------------------------


## 🌟 Features

### Core Functionality
- **User Authentication**: Secure sign-in/sign-up with email/password 
- **Create & Edit Notes**: Rich text editor with formatting options
- **Note Management**: Create, update, delete, favorite, and archive notes
- **Real-time Sync**: Automatic synchronization across devices using Firebase Firestore


### Organization & Search
- **Tagging System**: Organize notes with custom tags
- **Advanced Search**: Search through note titles, content, and tags
- **Filtering**: Filter by favorites, archived notes, and specific tags
- **Sorting Options**: Sort by creation date, update date, or alphabetically


### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Intuitive UI**: Clean, modern interface with sidebar navigation
- **Real-time Updates**: Instant updates without page refresh


### Additional Features
- **Color Coding**: Assign colors to notes for visual organization
- **Sidebar Navigation**: Easy access to different note views
- **User Profile**: Display user information and sign-out option


---------------------------------------------


## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling

### UI Components
- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful icon library
- **shadcn/ui** - Re-usable UI components built on Radix UI

### Backend & Database
- **Firebase Authentication** - User authentication and authorization
- **Firebase Firestore** - NoSQL database for real-time data synchronization

### Development Tools
- **ESLint** - Code linting and formatting
- **Vite Plugins** - React SWC plugin for faster builds


---------------------------------------------


## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Firebase Account** with a project set up

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd note-taking-web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password and Google providers
   - Enable Firestore Database
   - Copy your Firebase configuration

4. **Configure Firebase**
   - Open `src/lib/firebase.ts`
   - Replace the `firebaseConfig` object with your Firebase project configuration

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000` (or the port shown in your terminal)

## 🔧 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name and follow the setup wizard

### 2. Enable Authentication
1. In your Firebase project, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" and "Google" providers

### 3. Set up Firestore Database
1. Go to "Firestore Database" in your Firebase project
2. Click "Create database"
3. Choose "Start in test mode" for development (you can change this later)
4. Select a location for your database

### 4. Get Firebase Configuration
1. Go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Register your app with a nickname
5. Copy the configuration object and paste it into `src/lib/firebase.ts`


---------------------------------------------


## 📖 Usage

### Getting Started
1. **Sign Up/Sign In**: Create an account or sign in with existing credentials
2. **Create Your First Note**: Click the "New Note" button to start writing
3. **Organize with Tags**: Add tags to categorize your notes
4. **Search & Filter**: Use the search bar and filters to find specific notes

### Key Features
- **Rich Text Editor**: Format your notes with bold, italic, lists, etc.
- **Color Coding**: Assign colors to notes for visual organization
- **Favorites**: Mark important notes as favorites
- **Archive**: Move completed or less important notes to archive
- **Dark Mode**: Toggle between light and dark themes using the sun/moon icon

### Navigation
- **Sidebar**: Access different views (All Notes, Favorites, Archived, Tags)
- **Search Bar**: Quickly find notes by title, content, or tags
- **User Menu**: Access user profile and sign-out option


---------------------------------------------


## 🏗️ Build for Production

To build the application for production:

```bash
npm run build
```

This will create a `dist` folder with optimized, production-ready files that can be deployed to any static hosting service like Vercel, Netlify, or Firebase Hosting.


---------------------------------------------


## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and TypeScript conventions
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed


---------------------------------------------


## 📞 Support

If you have any questions or need help with the project, please:
- Open an issue on GitHub
- Check the existing documentation
- Review the code comments for implementation details

---

**Happy Note Taking! 📝**
