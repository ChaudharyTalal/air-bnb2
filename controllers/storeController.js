const Home = require("../models/home");

exports.getIndex = (req, res) => {
    const registerHomes=Home.fetchAll(registerHomes=>{
        res.render('store/index', { registerHomes: registerHomes, pageTitle: 'Home', 'currpage': 'index' })
    })
}
exports.getHomes = (req, res) => {
    const registerHomes=Home.fetchAll(registerHomes=>{
        res.render('store/home-list', { registerHomes: registerHomes, pageTitle: 'Home List', 'currpage': 'home' })
    })
}

exports.getHomesDetails =  (req, res) => {
    const homeId=req.params.homeId
    res.render('store/home-details', { 
        pageTitle: 'Home', 
        currpage: 'homeDetails',
        homeId:homeId
        });
}

exports.getBookings = (req, res) => {
    const registerHomes=Home.fetchAll(registerHomes=>{

        res.render('store/bookings', { registerHomes: registerHomes, pageTitle: 'Bookings', 'currpage': 'bookings' })
    })
    
}

exports.getReserve = (req, res) => {
    const registerHomes=Home.fetchAll(registerHomes=>{

        res.render('store/reserve', { registerHomes: registerHomes, pageTitle: 'Bookings', 'currpage': 'reserve' })
    })
    
}

exports.getFavList = (req, res) => {
    Home.fetchAll(registerHomes => {
        // For now render all homes as favourites placeholder. In future this should
        // render only user's saved favourites.
        res.render('store/Fav-list', { registerHomes: registerHomes, pageTitle: 'Favourites', currpage: 'fav-list' })
    })
} 