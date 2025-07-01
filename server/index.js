const exprss = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/auth.js');
const adminRoutes = require('./routes/admin.js');
const productRoutes = require('./routes/product.js');
const categoryRoutes = require('./routes/category.js');
const cartRoutes = require("./routes/cart.js")


connectDB();
const app = exprss();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));
app.use(exprss.json());
app.use(exprss.urlencoded({ extended: true }));
app.use(exprss.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes)


app.get('/', (req, res) => {
  res.send('server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});