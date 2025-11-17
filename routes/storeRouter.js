const express = require('express')
const UserRouter = express.Router()

// import registerHomes array from hostRouter so we can render it in home.ejs
const { getHomes, getBookings, getFavList, getReserve, getIndex, getHomesDetails } = require('../controllers/storeController')

// GET /users/
UserRouter.get('/', getIndex)
UserRouter.get('/home-list', getHomes)
UserRouter.get('/bookings', getBookings)
UserRouter.get('/fav-list', getFavList)
UserRouter.get('/reserve', getReserve)
UserRouter.get('/homes/:homeId',getHomesDetails);
module.exports = UserRouter 