const mongoose = require("mongoose")

const userRegistration = mongoose.Schema({
    "firstname":{type:String,required:true},
    "lastname":{type:String, required:true},
    "email":{type:String, required:true},
    "password":{type:String, required:true},
    "role":{type:String,default:"user"}
})

const User = mongoose.model("Users",userRegistration)

const addBlog = mongoose.Schema({
    "blogTitle":{type:String,required:true},
    "blogSummary":{type:String,required:true},
    "blogContent":{type:String, required:true}
})

const blogAdded = mongoose.model("Blog",addBlog)

module.exports = {User,blogAdded}