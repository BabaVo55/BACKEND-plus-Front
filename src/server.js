// const express = require('express');
import express from 'express';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';


const app = express();

const PORT = process.env.PORT || 8080;

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = dirname(__filename)

//Middleware:
app.use(express.json());

// Serves the HTML file from public not src.
// Also will tell EXPRESS to serve all file from the public folder as static assets / 
    // files. Any requests for the CSS files will be resolve ito the public directory.
app.use(express.static(path.join(__dirname, '../public')))

// Serving up the HTML from file 
app.get('/', (req, res) => {

    // If we only use the CODE bellow all CSS is out the window.
    // res.sendFile(path.join(__dirname, '../public', 'index.html'))

    res.sendFile(path.join(__dirname, '/public', 'index.html'))
})

// Routers
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

console.log('hello world')
app.listen(PORT, () => console.log(`${PORT} plugged in`))