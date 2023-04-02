const express = require("express")
const router = express.Router()
const passport = require("passport")

const exportFile = require("../controllers/export")
// to download the csv file
router.use("", passport.checkAuthentication, exportFile.downloadCSV)

module.exports = router
