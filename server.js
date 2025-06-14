const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Custom error handling class & middleware
const ApiError = require('./utils/apiError');
const errorGlobal = require('./middleware/errorMiddleware');

// Database connection
const dbConnect = require('./config/dbcon');
dbConnect();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.options('*', cors()); // Enable pre-flight for all routes
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// Logging in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Running in ${process.env.NODE_ENV} mode`);
}

// Routes
app.use('/api/brand', require('./routers/brandRouter'));
app.use('/api/product', require('./routers/productRouter'));
app.use('/api/user', require('./routers/userRouter'));
app.use('/api/auth', require('./routers/authUser'));
app.use('/api/review', require('./routers/reviewRouter'));
app.use('/api/wishlist', require('./routers/wishlistRouter'));
app.use('/api/address', require('./routers/addressRouter'));
app.use('/api/coupon', require('./routers/couponRouter'));
app.use('/api/cart', require('./routers/cartRouter'));
app.use('/api/order', require('./routers/orderRouter'));
app.use('/api/category', require('./routers/categoryRouter'));
app.use('/api/subcategory', require('./routers/subCategoryRouter'));

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handler
app.use(errorGlobal);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
