# 🍽️ Hunger-Hub

A full-stack food delivery web application built with React.js, Node.js, Express.js, and MongoDB. Hunger-Hub provides a seamless platform for users to browse food items, manage their cart, place orders, and for administrators to manage the food inventory and orders.

## 🌟 Features

### User Features

- **User Authentication**: Secure login and registration system
- **Browse Food Items**: Explore various food categories with detailed information
- **Shopping Cart**: Add/remove items, update quantities
- **Order Placement**: Seamless order placement with payment integration
- **Order History**: View past orders and track status
- **Responsive Design**: Mobile-friendly interface.

### Admin Features

- **Admin Dashboard**: Comprehensive admin panel
- **Food Management**: Add, edit, and delete food items
- **Order Management**: View and manage customer orders
- **Inventory Tracking**: Keep track of available food items

## 🛠️ Tech Stack

### Frontend

- **React.js** - Frontend framework
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animation library
- **React Hot Toast** - Notifications
- **Lucide React & React Icons** - Icon libraries
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Stripe & Razorpay** - Payment gateways

### Development Tools

- **ESLint** - Code linting
- **Nodemon** - Development server auto-restart
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
Hunger-Hub/
├── backend/                 # Backend server
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── uploads/            # Uploaded images
│   └── server.js           # Server entry point
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context providers
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd Hunger-Hub
   ```
2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```
3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   ```
4. **Environment Variables**

   Create a `.env` file in the backend directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```
5. **Start the Development Servers**

   Backend:

   ```bash
   cd backend
   npm run server
   ```

   Frontend:

   ```bash
   cd frontend
   npm start
   ```
6. **Access the Application**

   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`

## 📖 API Documentation

### Authentication Endpoints

- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### Food Endpoints

- `GET /api/food/list` - Get all food items
- `POST /api/food/add` - Add new food item (Admin)
- `DELETE /api/food/:id` - Delete food item (Admin)

### Cart Endpoints

- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `GET /api/cart/get` - Get user cart
- `POST /api/cart/update` - Update cart item quantity

### Order Endpoints

- `POST /api/orders/place` - Place new order
- `GET /api/orders/userorders` - Get user orders
- `GET /api/orders/list` - Get all orders (Admin)
- `POST /api/orders/status` - Update order status (Admin)

## 🔐 Authentication & Authorization

- **JWT-based Authentication**: Secure token-based authentication
- **Role-based Access Control**: Separate user and admin roles
- **Protected Routes**: Admin routes require authentication
- **Password Security**: Bcrypt hashing for password storage

## 💳 Payment Integration

The application supports multiple payment gateways:

- **Stripe**: International payments
- **Razorpay**: Indian payment gateway

## 🎨 UI/UX Features

- **Modern Design**: Clean and intuitive interface
- **Responsive Layout**: Works on all device sizes
- **Smooth Animations**: Enhanced user experience with Framer Motion
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers
- Tablets
- Mobile phones

## 🔧 Configuration

### Frontend Configuration

- Vite configuration in `vite.config.js`
- Tailwind CSS configuration
- ESLint configuration for code quality

### Backend Configuration

- CORS configuration for cross-origin requests
- Static file serving for uploaded images
- Environment-based configuration

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables
2. Deploy using Git or Docker
3. Configure MongoDB Atlas connection

## 🧪 Testing

Run linting for code quality:

```bash
cd frontend
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Author

**Your Name**

- GitHub: [@atulmali18](https://github.com/atulmali18)
- LinkedIn: [Atul Mali](https://linkedin.com/in/atulmali)

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Tailwind CSS for the amazing utility-first framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- All the open-source contributors who made this project possible

## 📞 Support

For support, email atulmali102@gmail.com or open an issue in the GitHub repository.

---

**⭐ Star this repository if you find it helpful...!**
