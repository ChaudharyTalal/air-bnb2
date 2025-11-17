const express = require('express');
const path = require('path')
const app = express();
// const bodyParser = require('body-parser'); // not needed: using built-in parsers

// local modules
const storeRouter = require('./routes/storeRouter');
const { adminRouter } = require('./routes/adminRouter');
const { notfound } = require('./controllers/404');

// body parsing
app.use(express.urlencoded())
app.use(express.json())

// static files (serve ./public)
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine','ejs')
app.set('views','views')

app.use('/',storeRouter)
app.use('/admin',adminRouter)

app.use(notfound)

// Export the app for serverless platforms (e.g., Vercel)
module.exports = app;

