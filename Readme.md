# 🖼️ MERN Image Search Application with OAuth

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows authenticated users to search for images using the Unsplash API, select multiple images, and maintain a personal search history.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [OAuth Setup Guides](#oauth-setup-guides)

## ✨ Features

### 🔐 Authentication
- **Multi-provider OAuth login** via Google, Facebook, and GitHub using Passport.js
- Only authenticated users can search images and view history
- Secure session management with MongoDB session store

### 🔍 Image Search
- Real-time image search powered by Unsplash API
- Display search results in a responsive 4-column grid
- Multi-select functionality with checkboxes
- Dynamic counter showing number of selected images
- Display total results count for each search

### 📊 Top Searches Banner
- Shows top 5 most searched terms across all users
- Updates dynamically based on all user searches
- Displayed prominently at the top of the application

### 📜 Personal Search History
- Collapsible sidebar showing user's past searches
- Timestamps with human-readable format (e.g., "5m ago", "2h ago")
- Search filter to find specific past searches
- Click on any history item to re-run that search
- Shows total count of searches

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router DOM** - Client-side routing
- **TanStack Query (React Query)** - Server state management and API calls
- **Axios** - HTTP client
- **Tailwind CSS** - Styling and responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (MongoDB Atlas)
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware
  - passport-google-oauth20
  - passport-facebook
  - passport-github2
- **Express Session** - Session management
- **Connect-mongo** - MongoDB session store

### External APIs
- **Unsplash API** - Image search and retrieval

## 📁 Project Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js           # API client configuration
│   │   ├── components/
│   │   │   ├── ImageGrid.jsx       # Image grid with multi-select
│   │   │   ├── Navbar.jsx          # Navigation bar with user info
│   │   │   ├── ProtectedRoute.jsx  # Route protection component
│   │   │   ├── SearchBar.jsx       # Search input component
│   │   │   ├── Sidebar.jsx         # Search history sidebar
│   │   │   └── TopSearchesBanner.jsx # Top searches display
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Main application page
│   │   │   ├── Login.jsx           # OAuth login page
│   │   │   └── AuthCallback.jsx    # OAuth callback handler
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── .env                        # Frontend environment variables
│   └── package.json
│
└── backend/
    ├── config/
    │   └── passport.js             # Passport OAuth configuration
    ├── controllers/
    │   ├── authController.js       # Authentication logic
    │   ├── historyController.js    # History management
    │   └── searchController.js     # Search logic
    ├── middleware/
    │   └── auth.js                 # Authentication middleware
    ├── models/
    │   ├── User.js                 # User schema
    │   └── Search.js               # Search history schema
    ├── routes/
    │   ├── authRoutes.js           # Authentication routes
    │   ├── historyRoutes.js        # History routes
    │   └── searchRoutes.js         # Search routes
    ├── .env                        # Backend environment variables
    ├── index.js                    # Server entry point
    └── package.json
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (or local MongoDB)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd image-search-app
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

**Backend Dependencies:**
```bash
npm install express mongoose passport passport-google-oauth20 passport-facebook passport-github2 express-session connect-mongo cors axios dotenv
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

**Frontend Dependencies:**
```bash
npm install react react-dom react-router-dom @tanstack/react-query axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## ⚙️ Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Image_Search?retryWrites=true&w=majority

# Session
SESSION_SECRET=your-super-secret-session-key-change-this-to-random-string

# Server Configuration
PORT=5000
NODE_ENV=development
SERVER_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-google-client-secret

# Facebook OAuth
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Unsplash API
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Running the Application

### 1. Start the Backend Server

```bash
cd backend
npm start
# or for development with nodemon
npm run dev
```

The backend server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to: `http://localhost:5173`

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/google` | Initiate Google OAuth |
| GET | `/api/auth/google/callback` | Google OAuth callback |
| GET | `/api/auth/facebook` | Initiate Facebook OAuth |
| GET | `/api/auth/facebook/callback` | Facebook OAuth callback |
| GET | `/api/auth/github` | Initiate GitHub OAuth |
| GET | `/api/auth/github/callback` | GitHub OAuth callback |
| GET | `/api/auth/user` | Get current authenticated user |
| POST | `/api/auth/logout` | Logout current user |

### Search Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/search` | Search images via Unsplash | ✅ Yes |
| GET | `/api/top-searches` | Get top 5 searched terms | ✅ Yes |

**POST /api/search - Request Body:**
```json
{
  "term": "nature"
}
```

**POST /api/search - Response:**
```json
{
  "term": "nature",
  "total": 10000,
  "images": [
    {
      "id": "abc123",
      "url": "https://images.unsplash.com/...",
      "thumb": "https://images.unsplash.com/...",
      "alt": "Beautiful nature scene",
      "author": "John Doe",
      "authorUrl": "https://unsplash.com/@johndoe"
    }
  ]
}
```

**GET /api/top-searches - Response:**
```json
[
  {
    "term": "nature",
    "count": 45
  },
  {
    "term": "cars",
    "count": 32
  }
]
```

### History Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/history` | Get user's search history | ✅ Yes |

**GET /api/history - Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "term": "mountains",
    "timestamp": "2024-11-02T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "term": "ocean",
    "timestamp": "2024-11-02T09:15:00.000Z"
  }
]
```

## 📸 Screenshots

### 1. OAuth Login Page
![OAuth Login](./screenshots/Auth.png)

The login page features three OAuth providers:
- **Google** - Sign in with Google account
- **Facebook** - Sign in with Facebook account  
- **GitHub** - Sign in with GitHub account

All buttons are styled with provider-specific branding and colors.

---

### 2. Home Page with Top Searches Banner
![Top Searches Banner](./screenshots/Topsearche.png)

The top searches banner displays:
- Top 5 most searched terms across all users
- Search count for each term
- Gradient purple background with glassmorphism effect
- Updates dynamically as users search

---

### 3. Search Results with Multi-Select
![Search Results](./screenshots/images.png)

Search results page features:
- Search term and total results count displayed
- 4-column responsive grid layout
- Images with hover effects
- Checkbox overlays on each image for selection
- Author attribution below each image

---

### 4. Multi-Select Counter
![Multi-Select Counter](./screenshots/multselect.png)

When images are selected:
- Dynamic counter shows "Selected: X images"
- Purple badge displayed above the grid
- Selected images have visual feedback (checkbox checked, overlay)
- Click any image to toggle selection

---

### 5. Search History Sidebar
![Search History Sidebar](./screenshots/history.png)

The collapsible sidebar includes:
- All past searches with timestamps
- Filter/search functionality
- Human-readable time format ("5m ago", "2h ago", "3d ago")
- Click any item to re-run that search
- Total search count at the bottom
- Smooth slide-in/out animation

## 🔑 OAuth Setup Guides

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **Google+ API**:
   - Navigate to **APIs & Services** → **Library**
   - Search for "Google+ API" and click **Enable**
4. Create OAuth credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **+ CREATE CREDENTIALS** → **OAuth client ID**
   - Select **Web application**
   - Add **Authorized JavaScript origins**:
     - `http://localhost:5173`
     - `http://localhost:5000`
   - Add **Authorized redirect URIs**:
     - `http://localhost:5000/api/auth/google/callback`
   - Click **CREATE**
5. Copy the **Client ID** and **Client Secret** to your `.env` file

### Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Select **Consumer** and click **Next**
4. Fill in app details and create the app
5. Go to **Settings** → **Basic**
   - Add **App Domains**: `localhost`
6. Add **Facebook Login** product:
   - Click **Add Product** → **Facebook Login** → **Set Up**
7. Go to **Facebook Login** → **Settings**
   - Add **Valid OAuth Redirect URIs**:
     - `http://localhost:5000/api/auth/facebook/callback`
8. Copy **App ID** and **App Secret** to your `.env` file
9. Make sure the app is in **Development Mode** for testing

### GitHub OAuth Setup

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the application details:
   - **Application name**: `Image Search App`
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5000/api/auth/github/callback`
4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret**
7. Copy the **Client Secret** (you won't be able to see it again)
8. Add both to your `.env` file

### Unsplash API Setup

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Click **Register as a developer**
3. Create a **New Application**
4. Accept the terms and conditions
5. Fill in application details:
   - **Application name**: `Image Search App`
   - **Description**: `MERN stack image search application`
6. Copy the **Access Key** to your `.env` file

## 🧪 Testing the Application

### Manual Testing Checklist

- [ ] **Authentication**
  - [ ] Google OAuth login works
  - [ ] Facebook OAuth login works
  - [ ] GitHub OAuth login works
  - [ ] User information is displayed correctly
  - [ ] Logout functionality works
  - [ ] Protected routes redirect to login

- [ ] **Search Functionality**
  - [ ] Search bar accepts input
  - [ ] Search results are displayed in grid
  - [ ] Images load correctly
  - [ ] Result count is accurate
  - [ ] Empty search shows appropriate message

- [ ] **Multi-Select**
  - [ ] Checkboxes appear on images
  - [ ] Clicking images toggles selection
  - [ ] Counter updates correctly
  - [ ] Multiple images can be selected

- [ ] **Top Searches**
  - [ ] Banner displays top 5 searches
  - [ ] Search counts are accurate
  - [ ] Updates after new searches

- [ ] **Search History**
  - [ ] Sidebar toggles open/close
  - [ ] Past searches are listed
  - [ ] Timestamps are formatted correctly
  - [ ] Filter functionality works
  - [ ] Clicking history item performs search

### Sample cURL Commands

**Get Current User:**
```bash
curl -X GET http://localhost:5000/api/auth/user \
  --cookie "connect.sid=your-session-cookie"
```

**Search Images:**
```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"term": "nature"}' \
  --cookie "connect.sid=your-session-cookie"
```

**Get Top Searches:**
```bash
curl -X GET http://localhost:5000/api/top-searches \
  --cookie "connect.sid=your-session-cookie"
```

**Get Search History:**
```bash
curl -X GET http://localhost:5000/api/history \
  --cookie "connect.sid=your-session-cookie"
```

## 🐛 Troubleshooting

### Common Issues

**Issue: "OAuth2Strategy requires a clientID option"**
- **Solution**: Make sure your `.env` file is in the correct directory and has no syntax errors (no extra spaces or equals signs)

**Issue: "redirect_uri_mismatch"**
- **Solution**: Ensure the callback URL in your OAuth provider settings exactly matches the one in your code (including http/https, domain, port, and path)

**Issue: "CORS policy error"**
- **Solution**: Check that `CLIENT_URL` in backend `.env` matches your frontend URL exactly

**Issue: "MongoDB connection error"**
- **Solution**: Verify your MongoDB URI is correct and your IP address is whitelisted in MongoDB Atlas

**Issue: "Cannot GET /"**
- **Solution**: Make sure both frontend and backend servers are running

**Issue: "Module not found" errors**
- **Solution**: Run `npm install` in both frontend and backend directories

## 📝 Additional Notes

### Security Considerations
- Never commit `.env` files to version control
- Use strong, unique session secrets in production
- Enable HTTPS in production
- Regularly update dependencies
- Implement rate limiting for API endpoints

### Production Deployment
When deploying to production:
1. Update all URLs in `.env` to production domains
2. Set `NODE_ENV=production`
3. Enable HTTPS
4. Use environment variables in hosting platform (Heroku, Vercel, etc.)
5. Set up proper CORS origins
6. Configure MongoDB Atlas to allow your production IP

### Future Enhancements
- [ ] Add image download functionality
- [ ] Implement pagination for search results
- [ ] Add favorites/bookmarking feature
- [ ] Create collections of images
- [ ] Add image preview modal
- [ ] Implement advanced search filters
- [ ] Add social sharing features
- [ ] User profile management

## 📄 License

This project is created as part of an internship assignment for UD Studios.

## 👨‍💻 Developer

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **Unsplash** for providing the image search API
- **Passport.js** for authentication middleware
- **MongoDB Atlas** for database hosting
- **UD Studios** for the internship opportunity

---

**Developed as part of the MERN Stack Internship Task**  
**UD Studios - Vasanth V K, Founder & CEO**

For any questions or issues, please reach out or create an issue in the repository.