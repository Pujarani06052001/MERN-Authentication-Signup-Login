const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const UserModel = require("../Modals/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, you can login',
                success: false
            });
        }

        const userModel = new UserModel({ name, email, password });

        // Hash the password before saving
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.status(201).json({
            message: "SIGNUP SUCCESSFULLY",
            success: true
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


const login = async (req, res) => {
    try {
        const {email, password } = req.body;

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        const errorMsg="Auth failed email or password is wrong";
        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }


       const isPasswordEqual=await bcrypt.compare(password,user.password);
        if(!isPasswordEqual){
            return res.status(403)
            .json({message:errorMsg,success:false})
        }
        const jwtToken=jwt.sign(
            {email:user.email, _id: user.id},
            process.env.JWT_SRCRET,
            {expiresIn:'24h'}
        )


        res.status(200).json({
            message: "LOGIN SUCCESSFULLY",
            success: true,
            jwtToken,
            email,
            name:user.name

        });
    } catch (err) {
        console.error(err); 
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
