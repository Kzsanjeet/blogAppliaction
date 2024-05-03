const mongoose = require("mongoose")

function connecDb(){
    try{
        if(!process.env.CONNECT_URI){
            console.log("Please provide a connection string");
                process.exit(1);
        }
        console.log("Attempting to connect to MongoDB Atlas...");
        mongoose.connect(process.env.CONNECT_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
            .then(() => console.log("Connected to database"))
            .catch((error) => {
                console.log("Error occurred while connecting to database: " + error);
                process.exit(1);
            });
    }catch(err){
        console.log("errro occured while connecting to the databse",err)
    }
   
}

module.exports = connecDb