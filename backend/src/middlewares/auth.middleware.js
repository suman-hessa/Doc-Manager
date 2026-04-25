import jwt from 'jsonwebtoken'
import { User } from '../models/users.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import dotenv from 'dotenv'
import { ApiResponse } from '../utils/ApiResponse.js';
dotenv.config()

export const verifyJWT = asyncHandler(async(req, res, next) =>{
        const token = req?.cookies?.accessToken || req?.header("Authorization")?.replace("Bearer", "")

        if(!token){
            res.status(200).json(new ApiResponse(200, null, "Unauthorized request", false))
        }
    try{
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select("-password -refreshToken")

    if(!user){
        return res.status(200).json(new ApiResponse(200, null, "Inavlid access token", false))
    }

    req.user = user;
    next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
}) 