// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import mongoose from 'mongoose';
// import session from 'express-session';
// import passport from 'passport';
// import cors from 'cors';
// import MongoStore from 'connect-mongo';

// import authRoutes from './routes/authRoutes.js';
// import searchRoutes from './routes/historyRoutes.js';
// import historyRoutes from './routes/searchRoutes.js';

// import './config/passport.js';

// const app = express();


// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/image-search-app')
// .then(() => console.log('✅ MongoDB connected'))
// .catch(err => {
//   console.error('❌ MongoDB connection error:', err);
//   process.exit(1);
// });


// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:5173',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.use(session({
//   secret: process.env.SESSION_SECRET || 'fallback-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/image-search-app'
//   }),
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     secure: false, 
//     sameSite: 'lax'
//   }
// }));


// app.use(passport.initialize());
// app.use(passport.session());


// app.use('/api/auth', authRoutes);
// app.use('/api', searchRoutes);
// app.use('/api', historyRoutes);


// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'ok',
//     timestamp: new Date().toISOString()
//   });
// });


// app.use((err, req, res, next) => {
//   console.error('Server Error:', err);
//   res.status(500).json({ 
//     error: 'Internal server error',
//     message: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
// });



import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import serverless from 'serverless-http';

import authRoutes from '../routes/authRoutes.js';
import searchRoutes from '../routes/searchRoutes.js';
import historyRoutes from '../routes/historyRoutes.js';
import '../config/passport.js';

const app = express();


let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = !!conn.connections[0].readyState;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}
connectDB();


app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', authRoutes);
app.use('/api', searchRoutes);
app.use('/api', historyRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
// });

// Export handler for Vercel
export const handler = serverless(app);
