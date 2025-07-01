const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer.js");

const register = async(req, res) => {
    const {firstName, lastName, email,contact, password} = req.body;

    if (!firstName || !lastName || !email || !contact || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({$or: [{email},{contact}]});
        if (existingUser) {
            return res.status(400).json({ message: "User or contact already exists" });
        }

        const newUser = new User({
            firstName,
            lastName,
            contact,
            email,
            password: await bcrypt.hash(password, 10)
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        const mailOptions = {
            from: "jameslarbie30@gmail.com",
            to: newUser.email,
            subject: "Welcome to Our Service",
            text: `Hello ${newUser.firstName},\n\nThank you for registering!`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(201).json({
            success: true,
            message: "Registration successful",
        });


    } catch (error) {
        console.error("Error during registration:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const login = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // check if admin


    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                contact: user.contact,
                isVerified: user.isVerified,
                isAdmin: user.isAdmin
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const logout = async(req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 0 // Clear the cookie immediately
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const isAuthenticated = async(req, res) => {
    try {
        return res.json({success: true, message: "User is authenticated"});
    } catch (error) {
        console.error("Error during authentication check:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const sendVerificationOTP = async(req,res) => {
    const {userId} = req.body;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const user = await User.findById(userId);
        if (user.isVerified) {
            return res.status(404).json({ message: "Account already verified!" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        user.verificationToken = otp;
        user.verificationExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        const mailOptions = {
            from: "jameslarbie30@gmail.com",
            to: user.email,
            subject: "Verification OTP",
            text: `Your verification OTP is: ${otp}\n\nThis OTP is valid for 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "Verification OTP sent successfully",
        });
        
    } catch (error) {
        console.error("Error sending verification OTP:", error);
        return res.status(500).json({success: false, message: "Internal server error" });
    }
}

const verifyOTP = async(req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
        return res.status(400).json({ message: "User ID and OTP are required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Account already verified!" });
        }

        if(user.verificationToken === "" || user.verificationToken !== otp){
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (Date.now() > user.verificationExpires) {
            return res.status(400).json({ message: "OTP expired" });
        }

        user.isVerified = true;
        user.verificationToken = "";
        user.verificationExpires = 0;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Account verified successfully",
        });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({success: false, message: "Internal server error" });
    }
}

const sendResetPasswordOTP = async(req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        const mailOptions = {
            from: "jameslarbie30@gmail.com",
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your password reset OTP is: ${resetToken}\n\nThis OTP is valid for 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent successfully",
        });
    } catch (error) {
        console.error("Error sending password reset OTP:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const verifyResetOTP = async(req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.resetPasswordToken === "" || user.resetPasswordToken !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (Date.now() > user.resetPasswordExpires) {
            return res.status(400).json({ message: "OTP expired" });
        }

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });
    } catch (error) {
        console.error("Error verifying reset OTP:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


const updatePassword = async(req, res) => {
    const { newPassword, userId, otp } = req.body;
    if (!newPassword || !userId || !otp) {
        return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = "";
        user.resetPasswordExpires = 0;
        await user.save();

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
            maxAge: 0 // Clear the cookie immediately
        });

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });

        
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
        
    }
}
module.exports = {
    register,
    login,
    logout,
    isAuthenticated,
    sendVerificationOTP,
    verifyOTP,
    sendResetPasswordOTP,
    verifyResetOTP,
    updatePassword
};