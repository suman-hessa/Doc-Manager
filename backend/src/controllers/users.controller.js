import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/users.model.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateAccessAndRefreshTokens = async(userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;``
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(400, "error while creating access and refersh token")
    }
    
}

const login = asyncHandler(async(req, res)=>{
    const {username, password} = req.body;

    if(!username || !password){
        throw new ApiError(400, "all the fields are required!");
    }

    const user = await User.findOne({
      $and: [{username}, {password}]  
    })

    if(!user){
        throw new ApiError(400, "user does not exist")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user?._id)

    const options = {
        httpOnly: true,
        secure: true, 
        sameSite: 'none'
    }
    const loggedInUser = await User.findById(user._id).select("-password");

    return res.status(200)
              .cookie("refreshToken", refreshToken, options)
              .cookie("accessToken", accessToken, options)
              .json(new ApiResponse(200, loggedInUser, "user logged in successfully"))
})

const getCurrentUser = asyncHandler(async(req, res)=>{
    console.log(req.user)
    const user = req?.user;
    if(!user){
        throw new ApiError(400, "user not found or invalid accessToken")
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    if(!loggedInUser){
        throw new ApiError(400, "user does not exists")
    }

    return res.status(200)
              .json(new ApiResponse(200, loggedInUser, "user data fetched successfully"))
})

const refreshAccessToken = asyncHandler(async(req, res)=>{
    const token = req.cookies?.refreshToken;

    if(!token){
        throw new ApiError(400, "refresh token is missing or expired")
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    if(!decoded){
        throw new ApiError(400, "refresh token has expired or invalid")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(decoded?._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
              .cookie("accessToken", accessToken, options)
              .cookie("refreshToken", refreshToken, options)
              .json(new ApiResponse(200, {accessToken, refreshToken}, "access token refreshed"))
})

export {login, getCurrentUser, refreshAccessToken};