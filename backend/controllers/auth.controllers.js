import { User } from '../models/user.model.js';
import bcrypt from "bcrypt";


export async function signup(req, res){
   
    try {
        const {email, password, username} = req.body;
        if(!email || !password || !username) {
            return res.status(400).json({success:false,message:"All fileds are required"})
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message:"Please enter a valid email id"})
        }

        if(password.length < 8){
            return res.status(400).json({success:false, message:"Password must be minimun 8 characters"})
        }

        const existingUserByEmail = await User.findOne({email:email})
        if(existingUserByEmail){
            return res.status(400).json({success:false, message:"Email already exists"})
        }
        const existingUserByUsername = await User.findOne({username:username})
        if(existingUserByUsername){
            return res.status(400).json({success:false, message:"Username already exists"})
        }
        
       let pass = password.toString();

        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(pass, salt);
        

        const PROFILE_PICS = ['/images/userAvatars/blue.png', "/images/userAvatars/green.png", "/images/userAvatars/red.png"];

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email, 
            password: hash, 
            username, 
            image
        });
        

        await newUser.save()
        
        res.status(201).json({success: true, 
            user: {
            ...newUser._doc, 
            password: "",

        },
     });
    } catch (error) {
        console.log("Error in singup controller", error.message)
        res.status(500).json({success: false, message:"Internal server error"});
    }
}
export async function login(req, res){
    res.send("Login route");
}
export async function logout(req, res){
    res.send("Logout route");
}
