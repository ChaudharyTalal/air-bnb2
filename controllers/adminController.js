
const Home = require('../models/home')

exports.getAddhomes = (req, res, next) => {
    res.render('admin/add-home', { pageTitle: 'Add Home', 'currpage': 'add-home' })
}

exports.getPostHomes = (req, res, next) => {
    const { houseName, location, price, url, rating } = req.body
    const home = new Home(houseName, location, price, url, rating)
    home.save()
    res.render('admin/home-added', { pageTitle: 'Home added', 'currpage': 'add-home' })
}

exports.getAdminHomes = (req, res, next) => {


    Home.fetchAll(registerHomes => {
        // For now render all homes as favourites placeholder. In future this should
        // render only user's saved favourites.
          res.render('admin/admin-homes-list', {registerHomes:registerHomes,  pageTitle: 'Admin Homes', 'currpage': 'admin-homes' })
    })
}
