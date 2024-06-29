import bcrypt from 'bcryptjs';
import usermodel from "../../models/userModel.js"
import jwt from 'jsonwebtoken';


export const signUp = async (req, res)=>{
    try {
        const { email, password, name} = req.body
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        const user = await usermodel.findOne({email})
        if(user){
            throw new Error("Already user exits.")
        }
        if(!email){
           throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }

        const data = {...req.body, role : "GENERAL", password : hashPassword};
        const userData = new usermodel(data);
        const saveUser = await userData.save();

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })

    } catch (err) {
        res.json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
};


export const signIn = async (req, res)=>{
    try {
        const { email , password} = req.body
        const user = await usermodel.findOne({email})

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!user){
            throw new Error("User not found")
        }

       const checkPassword = await bcrypt.compare(password, user.password);
       if(checkPassword){
        const tokenData = {
            _id : user._id,
            email : user.email,
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1h" });
        const tokenrequirement = {sameSite: 'None',secure:  true }

        res.cookie("token", token, tokenrequirement).status(200).json({
            message : "Login successfully",
            data : token,
            success : true,
            error : false
        })

        }else{
            throw new Error("Please check Password")
        }
    } catch (err) {
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
};

// httpOnly : true,
// sameSite: 'None'
// secure:  false ,