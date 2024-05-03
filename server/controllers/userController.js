const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const bcrypt = require('bcrypt')

const KEY = process.env.SECRET_KEY

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        
        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.status(404).json({ message: "Wrong Credentials" })
        const validPassword = await bcrypt.compare(password, existingUser.password)
        if (!validPassword) return res.status(404).json({ message: "Wrong Credentials" })

        const userData = { 
            email: existingUser.email,
            _id: existingUser._id,
            name: existingUser.name,
            role: existingUser.role
        }

        const token = jwt.sign(userData , KEY)

        return res.status(200).json({message: "login succesfull", token , userData})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
} 