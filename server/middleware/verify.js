import  jwt from 'jsonwebtoken';

const verify = (req, res, next) => {
    try {
        const token = req?.cookies?.token
        if(!token){
            return res.status(200).json({message: "Please login first"})
        }
        
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err){
                console.log(err)
            }
            req.userId = decoded?._id;
            next();
        })

    } catch (error) {
        res.status(400).json({message: error.message})
    }

};

export default verify;