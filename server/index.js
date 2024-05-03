require("dotenv").config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const connectDB = require('./models/DBconnection');
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB(process.env.MONGODB_URI);

// Middlewares
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(morgan('dev'))

// onShape API
const onShape = require('./routes/OnShapeRoutes')
app.use('/api/onShape', onShape);

// 
const Products = require('./routes/productsRoutes')
const User = require('./routes/userRoutes')
app.use('/products', Products)
app.use('/user', User)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
