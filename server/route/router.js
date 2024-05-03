const express = require("express");
const router = express.Router();
const { registerFunc, loginUser, addBlog, allBlog, userInfo, editBlog, delBlog } = require("../controller/controller");

router.route("/register").post(registerFunc);
router.route("/login").post(loginUser);
router.route("/add-blog").post(addBlog);
router.route("/all-blog").get(allBlog);
router.route("/user-info").get(userInfo);
router.route("/edit-blog/:blogId").patch(editBlog); // Note: I added ":blogId" as a route parameter
router.route("/del-blog/:blogId").delete(delBlog)

module.exports = router;