import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.js"
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateJWTToken } from "../utils/jwtToken.js";
import {v2 as cloudinary} from "cloudinary"

// signUp
export const signup = catchAsyncError(
  async (req, res, next) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete details"
      })
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      })
    }


    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be 8 charecter long"
      })
    }

    const isEmailAlreadyUsed = await User.findOne({ email });
    if (isEmailAlreadyUsed) {
      return res.status(400).json({
        success: false,
        message: "Email is Already register"
      })
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      avatar: {
        public_id: "",
        url: "",
      }
    })

    generateJWTToken(user, "User reginter successfully", 201, res);

  }
)




// signIn
export const signin = catchAsyncError(
  async (req, res, next) => {
    const {email,password} = req.body
    if(!email || !password){
      return res.status(400).json({
        success: false,
        message: "Please provide complete details"
      })
    }

    // verify email formate
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      })
    }


    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        success:false,
        message:"Invalid Credentials"
      })
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)
    if(!isPasswordMatch){
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      })
    }

    generateJWTToken(user,"User Logged in Successfullf",200,res);


  }
)



// Signout
export const signout = catchAsyncError(
  async (req, res, next) => {
    res.status(200).cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"?true:false,
  }).json({
    success:true,
    message:"User Logged Out Successfully"
  })
  }
)


// get User
export const getUser = catchAsyncError(
  async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success:true,
      user,
    })
  }
)



// Update Profile
export const updateProfile = catchAsyncError(
  async (req, res, next) => {
    const { fullName, email } = req.body;

    if (fullName?.trim().length === 0 || email?.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Fullname and Email can't be empty.",
      });
    }

    const avatar = req?.files?.avatar;
    let cloudinaryResponse = {};

    if (avatar) {
      try {
        const oldAvatarPublicId = req?.user?.avatar?.public_id;
        if (oldAvatarPublicId) {
          await cloudinary.uploader.destroy(oldAvatarPublicId);
        }

        cloudinaryResponse = await cloudinary.uploader.upload(
          avatar.tempFilePath,
          {
            folder: "CHAT_APP_USERS_AVATAR",
            transformation: [
              { width: 300, height: 300, crop: "limit" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          }
        );
      } catch (error) {
        console.error("Cloudinary Upload error: ", error);
        return res.status(500).json({
          success: false,
          message: "Failed to Upload avatar. Please Try again later.",
        });
      }
    }

    let data = {
      fullName,
      email,
    };

    if (
      avatar &&
      cloudinaryResponse?.public_id &&
      cloudinaryResponse?.secure_url
    ) {
      data.avatar = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    try {
      const user = await User.findByIdAndUpdate(req.user._id, data, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        user,
      });
    } catch (err) {
      console.error("DB update error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update profile. Please try again.",
      });
    }
  }
);
