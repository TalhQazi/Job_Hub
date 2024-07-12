import app from "./app.js";
import googleStrategy from "./config/googleStrategy.js"
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: "dq9dxllgk", 
  api_key: "572598231179845", 
  api_secret: "dTrQ28PzKv9_srHBET07rZNVnlo" 
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`);
})