const {User,blogAdded} = require("../schema/schema")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const registerFunc = async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;
      console.log(firstname, lastname, email, password)
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword, // Store the hashed password
      });
      if (newUser) {
        return res.status(200).json({ success: true, message: "Registered successfully" });
      } else {
        return res.status(400).json({ success: false, message: "Unable to register" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Error", err });
    }
  };

  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
  
      // Find the user in the database
      const loginU = await User.findOne({ email: email });
      if (!loginU) {
        return res.status(400).json({ message: "Unable to login" });
      }
  
      // Compare passwords using bcrypt
      const checkPassword = bcrypt.compareSync(password, loginU.password);
      if (checkPassword) {
        // Generate JWT token
        const token = jwt.sign({ id: loginU._id }, process.env.SECRET_KEY);
  
        // Set JWT token in a cookie
        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
  
        return res.status(200).json({ success: true, message: "Successfully logged in", token: token });
      } else {
        return res.status(400).json({ success: false, message: "Unable to login, please check your password" });
      }
    } catch (err) {
      console.error("Error:", err); // Log the error for debugging purposes
      return res.status(500).json({ message: "Internal Server Error" }); // Provide a generic error message to the client
    }
  };
  

const addBlog = async(req,res)=>{
    try{
        const{title,summary,content}= req.body
        const createBlog = await blogAdded.create({
            blogTitle:title,
            blogSummary:summary,
            blogContent:content
        })
      if(createBlog){
            return res.status(200).json({success:true,messaege:"blog created sucessfully"})
        }else{
            return res.status(400).json({success:false,message:"unable to add a blog, please try again"})
        }

    }catch(err){
        res.status(500).json({message:"err",err})
    }
   
}

const allBlog = async(req,res)=>{
  try {
    const getBlogs =  await blogAdded.find({})
    res.status(200).json({success:true,getBlogs})
  } catch (error) {
    res.status(400).json({sucess:false ,messaege:"err",err})
  }
}

// const userInfo = 

module.exports = {registerFunc,loginUser,addBlog,allBlog}