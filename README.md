# MERN Blog Platform

A full-stack blogging application built with the MERN stack (MongoDB, Express, React, Node.js). Features user authentication, blog creation, editing, deletion, and a recycle bin for deleted blogs.

## 📋 Overview

**MERN Blog Platform** is a modern blogging application that allows users to:
- Create and publish blog posts with images and categories
- Edit and delete their own blogs
- Browse blogs from all users with search and filtering capabilities
- Manage deleted blogs via a recycle bin feature
- Permanently delete blogs when needed
- Secure authentication with JWT tokens

## 🏗️ Architecture

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs password hashing
- **API**: RESTful API with protected routes
- **Server**: Node.js with CORS support

### Frontend
- **Framework**: React 19 with React Router for navigation
- **UI Library**: Material-UI (MUI) for responsive components
- **HTTP Client**: Axios for API calls
- **Icons**: Material-UI Icons
- **Styling**: Emotion (MUI built-in styling)

## 🚀 Features

### User Features
- **Authentication**: User registration and login with JWT tokens
- **Blog Management**: Create, read, update, and delete blog posts
- **Categorization**: Organize blogs by categories
- **Rich Content**: Support for blog titles, content, images, and categories
- **Search & Filter**: Search blogs by title, filter by category or author
- **Sorting**: Sort blogs by newest or oldest first
- **Recycle Bin**: Soft delete blogs with recovery option
- **Permanent Delete**: Permanently remove blogs from the system
- **My Blogs**: View and manage only your published blogs

### Security Features
- **Password Hashing**: Bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Authorization**: Route protection ensures users can only edit their own blogs
- **CORS Configuration**: Enabled for frontend URLs only

## 📁 Project Structure

```
MERN-project/
├── server/
│   ├── config/
│   │   └── db.js                    # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js        # User registration & login
│   │   └── blogController.js        # Blog CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT verification middleware
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   └── Blog.js                  # Blog schema with soft delete
│   ├── routes/
│   │   ├── authRoutes.js            # Authentication routes
│   │   └── blogRoutes.js            # Blog routes
│   ├── server.js                    # Express app initialization
│   └── package.json                 # Node.js dependencies
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── blog/                # Blog-related components
│   │   │   └── layout/              # Layout components (header, footer)
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Home/landing page
│   │   │   ├── Login.jsx            # User login page
│   │   │   ├── Signup.jsx           # User registration page
│   │   │   ├── CreateBlog.jsx       # Create new blog
│   │   │   ├── EditBlog.jsx         # Edit existing blog
│   │   │   ├── BlogDetails.jsx      # View single blog
│   │   │   ├── MyBlogs.jsx          # User's personal blogs
│   │   │   └── RecycleBin.jsx       # Deleted blogs recovery
│   │   ├── services/
│   │   │   └── api.js               # Axios instance & API calls
│   │   ├── assets/                  # Images and static files
│   │   ├── routes/                  # Routing configuration
│   │   ├── shared-theme/            # Theme configuration
│   │   ├── App.js                   # Main App component
│   │   ├── index.js                 # React entry point
│   │   ├── index.css                # Global styles
│   │   └── App.css                  # App-specific styles
│   ├── public/                      # Static files
│   └── package.json                 # React dependencies
└── README.md
```

## 📦 Tech Stack

### Backend Dependencies (Key)
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables

### Frontend Dependencies (Key)
- `react` - UI library
- `react-router-dom` - Client-side routing
- `@mui/material` - Material Design components
- `@mui/icons-material` - Icon library
- `axios` - HTTP client
- `@emotion/react` & `@emotion/styled` - CSS-in-JS styling

## 🔧 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud like MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (optional, for API base URL):
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

## 🎯 Usage

### 1. User Registration
- Navigate to the Signup page
- Enter name, email, and password
- Password is securely hashed using bcryptjs
- JWT token is generated upon successful signup

### 2. User Login
- Navigate to the Login page
- Enter email and password
- Receive JWT token stored in localStorage
- Token is used for authenticated requests

### 3. Create a Blog
- Click "Create Blog" button
- Fill in blog details:
  - Title (required)
  - Content (required)
  - Image URL (optional)
  - Category (defaults to "General")
- Blog is associated with the logged-in user

### 4. View Blogs
- Home page displays all published blogs
- Search blogs by title
- Filter by category or author
- Sort by newest or oldest first

### 5. Edit Blog
- Navigate to "My Blogs"
- Click Edit on your blog
- Update details and save
- Only blog author can edit

### 6. Delete Blog
- Soft delete: Blog moved to Recycle Bin
- Can be recovered from Recycle Bin
- Permanent delete: Blog removed from database permanently

## 🔌 API Endpoints

### Authentication Routes
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user

### Blog Routes
- **POST** `/api/blogs/` - Create blog (protected)
- **GET** `/api/blogs/` - Get all blogs (with search, category, author, sort filters)
- **GET** `/api/blogs/:id` - Get single blog
- **PUT** `/api/blogs/:id` - Update blog (protected, author only)
- **DELETE** `/api/blogs/:id` - Soft delete blog (protected, author only)
- **GET** `/api/blogs/deleted` - Get deleted blogs (protected)
- **PUT** `/api/blogs/restore/:id` - Restore deleted blog (protected)
- **DELETE** `/api/blogs/permanent/:id` - Permanently delete blog (protected)

## 📊 Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### Blog Schema
```javascript
{
  title: String (required),
  content: String (required),
  image: String (optional),
  category: String (default: "General"),
  author: ObjectId (reference to User),
  isDeleted: Boolean (default: false),
  timestamps: true
}
```

## 🔐 Authentication Flow

1. **Registration**: User data → Mongoose validation → Password hashed with bcryptjs → Stored in MongoDB → JWT token generated
2. **Login**: Email/password → Checked against hashed password → JWT token generated and sent to client
3. **Protected Routes**: JWT token from headers → Verified with middleware → `req.user` contains user ID → Request proceeds or rejected

## 🛡️ Authorization

Blog operations (create, update, delete) require:
- Valid JWT token in Authorization header
- User ID must match blog author ID
- Middleware validates before controller action

## 🎨 UI/UX Features

### Material-UI Components Used
- **Container**: Responsive layout wrapper
- **Grid**: Responsive grid system
- **Card**: Blog cards with images and content
- **Button**: Action buttons
- **TextField**: Form inputs
- **Chip**: Category badges
- **Typography**: Text hierarchy
- **Box**: Flexible layout component
- **IconButton**: Icon-based buttons

### Responsive Design
- Mobile-first approach
- Breakpoints: xs, sm, md, lg, xl
- Adaptive spacing and typography
- Touch-friendly interactive elements

## 🚀 Deployment

### Backend Deployment Options
- Heroku
- Railway.app
- Render
- AWS EC2
- DigitalOcean

### Frontend Deployment Options
- Vercel (optimized for React)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Example CORS Configuration for Production
Update `server.js`:
```javascript
origin: [
  "https://yourdomain.com",
  "https://www.yourdomain.com"
]
```

## 📝 Key Features Explained

### Soft Delete (Recycle Bin)
- Blogs not immediately removed from database
- `isDeleted` flag set to true
- Users can recover deleted blogs
- Permanent delete removes from database completely

### Search & Filter
- Full-text search on blog titles
- Filter by category and author
- Sort by creation date (ascending/descending)
- Performed on backend for security

### Authorization
- Author can only edit/delete their own blogs
- Blog author ID compared with JWT user ID
- 401 Unauthorized response if not author

## 🐛 Common Issues & Solutions

### Issue: "Cannot GET /api/blogs"
**Solution**: Ensure server is running and routes are properly imported in `server.js`

### Issue: "JWT token is invalid"
**Solution**: Check that token is properly stored in localStorage and passed in Authorization header

### Issue: "CORS error"
**Solution**: Verify frontend URL is in CORS whitelist in `server.js`

### Issue: "MongoDB connection error"
**Solution**: Check MONGODB_URI in .env file and ensure MongoDB service is running

## 📚 Technologies Used

### Core MERN Stack
- **M**ongoDB - NoSQL database
- **E**xpress.js - Backend framework
- **R**eact - Frontend library
- **N**ode.js - JavaScript runtime

### Additional Libraries
- JWT for authentication
- bcryptjs for password security
- Material-UI for modern UI components
- Axios for HTTP requests
- React Router for navigation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📧 Contact

For questions or inquiries:
- **Author**: Sri-Sathwika
- **Email**: sathwika0112@gmail.com
- **Repository**: https://github.com/Sri-Sathwika/MERN-project

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [React](https://react.dev/) - UI library
- [Material-UI](https://mui.com/) - Component library
- [JWT.io](https://jwt.io/) - Authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password hashing

## 🎓 Learning Resources

- [MERN Stack Guide](https://www.mongodb.com/languages/mern-stack)
- [Express.js Documentation](https://expressjs.com/en/api.html)
- [React Documentation](https://react.dev/)
- [Material-UI Docs](https://mui.com/material-ui/getting-started/)
- [JWT Tutorial](https://jwt.io/introduction)
- [MongoDB Docs](https://docs.mongodb.com/)
