const express = require('express')
const adminRouter = express.Router()
const bodyParser = require('body-parser');
const { getAddhomes, getPostHomes, getAdminHomes } = require('../controllers/adminController');

adminRouter.get("/add-home", getAddhomes)
adminRouter.post("/add-home", getPostHomes)
adminRouter.get("/admin-homes", getAdminHomes)


exports.adminRouter = adminRouter;
    