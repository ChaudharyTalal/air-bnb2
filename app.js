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
app.set('views', path.join(__dirname, 'views'))

app.use('/',storeRouter)
app.use('/admin',adminRouter)

app.use(notfound)

const port = process.env.PORT || 1001;

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`)
    })
}

module.exports = app;
