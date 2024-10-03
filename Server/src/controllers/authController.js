import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import constant from "../config/constant.js";
import { generateOTP } from "../utils/generateOtp.js";

// store otp detail
let storeOtp = {};

// register
export const register = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    // All fields are required
    if (!name || !email || !role || !password) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    // check valid email address
    const emailRegX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegX.test(email)) {
      return res.status(400).json({
        message: "invalid email!",
        success: false,
      });
    }

    //is email already registered
    const verifyEmail = await userModel.findOne({ email: email });

    if (verifyEmail) {
      return res.status(400).json({
        message: "Email already registered!",
        success: false,
      });
    }

    // password length >= 3
    if (password.length < 3) {
      return res.status(400).json({
        message: "password must be at least 3 characters!",
        success: false,
      });
    }

    // create new user
    const encryptPass = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      role,
      password: encryptPass,
    };

    const createUser = await userModel.create(newUser);

    return res.status(201).json({
      message: "User Register successfully.",
      user: { ...createUser._doc, password: "" },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! register user!",
      success: false,
    });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, role, password } = req.body;
    // All fields are required
    if (!email || !role || !password) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    // email not registered
    const verifyUser = await userModel.findOne({ email: email });

    if (!verifyUser) {
      return res.status(400).json({
        message: "Email not registered!",
        success: false,
      });
    }

    // valid password
    const verifyPass = await bcrypt.compare(password, verifyUser.password);

    if (!verifyPass) {
      return res.status(400).json({
        message: "Invalid credentials!",
        success: false,
      });
    }

    // valid role
    if (verifyUser.role !== role) {
      return res.status(400).json({
        message: "Account doesn't exists with current role!",
        success: false,
      });
    }

    // valid user
    // generate token
    const token = await generateToken(verifyUser.id);

    return res.status(200).json({
      message: "Login successfully",
      token: token,
      user: { ...verifyUser._doc, password: "" },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! Login!",
      success: false,
    });
  }
};

// change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const verifyPassword = await bcrypt.compare(
      currentPassword,
      req.user.password
    );

    if (!verifyPassword) {
      return res.status(400).json({
        message: "current password is incorrect!",
        success: false,
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "current password and new password are same!",
        success: false,
      });
    }

    // change password

    const encryptPassword = await bcrypt.hash(newPassword, 10);

    await userModel.findByIdAndUpdate(req.user.id, {
      password: encryptPassword,
    });

    return res.status(200).json({
      message: "Password changed successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error! changePassword!",
      success: false,
    });
  }
};

// forgot password
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // require
    if (!email) {
      return res.status(400).json({
        message: "email required.",
        success: false,
      });
    }

    // check valid email address
    const emailRegX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegX.test(email)) {
      return res.status(400).json({
        message: "invalid email!",
        success: false,
      });
    }

    const verifyEmail = await userModel.findOne({ email: email });

    if (!verifyEmail) {
      return res.status(400).json({
        message: "This email not registered! enter registered email",
        success: false,
      });
    }

    // send otp
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: constant.MY_EMAIL,
        pass: constant.SMTP_PASSWORD,
      },
    });

    const otp = generateOTP();
    // send mail
    const info = await transporter.sendMail({
      from: "Task management app",
      to: `${email}`,
      subject: "Reset password for Task management app",
      html: `<h1>Your OTP is ${otp}</h1>`,
    });

    // store otp
    storeOtp["otp"] = otp;
    storeOtp["email"] = email;

    return res.status(200).json({
      message: "OTP sent to registered email!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error! reset Password!",
      success: false,
    });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    if (!otp) {
      return res.status(200).json({
        message: "OTP is required!.",
        success: true,
      });
    }

    if (!newPassword) {
      return res.status(200).json({
        message: "New Password is required!.",
        success: true,
      });
    }

    if (otp != storeOtp["otp"]) {
      return res.status(200).json({
        message: "invalid OTP!.",
        success: true,
      });
    }

    const user = await userModel.findOne({ email: storeOtp["email"] });

    const encryptPassword = await bcrypt.hash(newPassword, 10);

    await userModel.findByIdAndUpdate(user.id, {
      password: encryptPassword,
    });

    return res.status(200).json({
      message: "Password reset successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error! changePassword!",
      success: false,
    });
  }
};
