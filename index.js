const express = require('express');
const path = require('path');
require('dotenv').config();

// DB config
require('./database/config').dbConnection();

// App de express
const app = express();

// Lectura y parseo del Body
app.use(express.json());

// Node server
const server = require('http').createServer(app);

// Path public
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// ---------- Mis Rutas --------------

// Rudas de usuarios
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
//Rutas de productos
app.use('/api/products', require('./routes/products'));

// Server
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en el puerto:`, process.env.PORT);
});
