const express = require("express")
const router = express.Router()
const {registerFunc,loginUser, addBlog,allBlog, userInfo} = require("../controller/controller")

router.route("/register").post(registerFunc)
router.route("/login").post(loginUser)
router.route("/add-blog").post(addBlog)
router.route("/all-blog").get(allBlog)
router.route("/user-info").get(userInfo)

module.exports = router