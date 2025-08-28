// core modules
const path = require("path");
//external modules
const express = require("express")
const hostRouter = express.Router()

//local module
// Remove unused pathUtil import


hostRouter.get("/add-home", (req, res, next) => {
    res.render('addHome',{pageTitle:'Add Home - AirBNB'})
})
const registerHomes=[];
hostRouter.post("/add-home", (req, res, next) => {
    console.log(req.body.houseName)
    registerHomes.push({'houseName':req.body.houseName})
    res.render('homeadded',{pageTitle:'Success - AirBNB'})
})

exports.hostRouter = hostRouter
exports.registerHomes=registerHomes

