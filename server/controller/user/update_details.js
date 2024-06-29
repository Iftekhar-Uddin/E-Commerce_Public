import usermodel from "../../models/userModel.js"


export const allUser = async (req, res) => {
    try {
        const Alluser = await usermodel.find();
        res.json({data: Alluser})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

export const detailsUser = async (req, res) => {
    try {

        const user = await usermodel.findById(req.userId)
        res.status(200).json({data : user})

    } catch (error) {
        res.status(400).json({message: error.message});
    }
};


export const updateUser = async (req, res) => {
    try {

        const { userId , email, name, role} = req.body
        const userData = {
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }

        const updateData = await usermodel.findByIdAndUpdate(userId, userData)
        res.json({data : updateData, message: "Logout successfully"})

    } catch (error) {
        res.status(400).json({message: error.message});
    }
};


export const logOut = async (req, res) =>{
    try {
        res.clearCookie("token", {sameSite: 'None', secure: true});
        res.json({data: [], message: "Logout successfully"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};


// res.cookie('token', 'none', {
//     expires: new Date(Date.now() + 1.5 * 1000),
//     sameSite: 'None',
//     secure:  true,
// });