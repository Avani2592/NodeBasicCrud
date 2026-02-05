require('dotenv').config();
const express = require('express');
const app=express();
app.use(express.json());
app.use('/api/auth',require('./src/routes/auth.routes'));
app.use('/api/item',require('./src/routes/item.routes'));

module.exports=app;