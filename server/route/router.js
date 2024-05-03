const express = require("express")
const router = express.Router()
const {registerFunc,loginUser, addBlog,allBlog} = require("../controller/controller")

router.route("/register").post(registerFunc)
router.route("/login").post(loginUser)
router.route("/add-blog").post(addBlog)
router.route("/all-blog").get(allBlog)

module.exports = router