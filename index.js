const express = require('express');
const cors= require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

require('dotenv').config({path:'variables.env'});
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
app.use(cors());
app.use(express.json({extended: true}))

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=> {
    console.log(`Aplicacion corriendo en el puerto ${PORT}`)
})


