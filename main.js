const express = require('express');
const path = require('node:path');
const app = express();

// Middleware
app.use(express.static('public'));

// Routes
app.get('/website', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/website.html'));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public/login.html"));
});
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public/About us.html"));
});
app.get("/services", (req, res) => {
    res.sendFile(path.join(__dirname, "public/services.html"));
});
app.get("/pricing", (req, res) => {
    res.sendFile(path.join(__dirname, "public/Pricing.html")); 
  });
  app.get("/How-it-works", (req, res) => {
    res.sendFile(path.join(__dirname, "public/How it works.html")); 
  });


// Server configuration
const port = 3000;
const hostname = 'localhost';

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/website`);
});