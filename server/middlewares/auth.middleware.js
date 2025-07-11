import jwt from "jsonwebtoken"
import { catchAsyncError } from "./catchAsyncError.middleware.js"
import { User } from "../models/user.model.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated. Please sign in"
    })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decoded) {
    return res.status(500).json({
      success: false,
      message: "Token verification failed. Please sign in again"
    })
  }

  const user = await User.findById(decoded.id)
  req.user = user;
  next();

})