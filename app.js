// core modules
const path = require("path");
//external modules
const express = require("express");
//local Router
const userRouter = require("./routes/userRouter");
const {hostRouter} = require("./routes/hostRouter");
const portfolioRouter = require("./routes/portfolioRouter");
// Get the project root directory directly from app.js
const rootDir = __dirname;

const app = express();
app.set('view engine','ejs')
app.set('views', path.join(rootDir, 'views'))

// app.use((req, res, next) => {
//     console.log(req.url, req.method);
//     next();
// });




app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);
app.use(portfolioRouter);

// use public folder files
app.use(express.static(path.join(rootDir,'public')))

app.use((req, res, next) => {
    res.status(404).render('404',{pageTitle:"404 Page not found"})
});

// Start server if not in production (Vercel)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Visit http://localhost:${PORT}/portfolio to view your 3D portfolio`);
    });
}

// Export the app for serverless platforms (e.g., Vercel)
module.exports = app;
