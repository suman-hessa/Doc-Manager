import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { Doc } from "../models/document.model.js";
import mongoose from "mongoose";

const createDocument = asyncHandler(async(req, res)=>{
    const {title, description, effectiveDate, expiryDate, documentType} = req.body;

    if([title, description, effectiveDate, expiryDate, documentType].some(field=> field.trim() === '')){
        throw new ApiError(400, "all the fields are required");
    }

    const documentLocalFilePath = req.file.path;

    if(!documentLocalFilePath){
        throw new ApiError(400, 'file is required');
    }

    const uploadedDocument = await uploadOnCloudinary(documentLocalFilePath);

    if(!uploadedDocument?.url){
        throw new ApiError(400, "error while uploading file to cloudinary");
    }

    const createdDocument = await Doc.create({
        title, description, effectiveDate, expiryDate, documentType, file: uploadedDocument?.url
    })

    if(!createDocument){
        throw new ApiError(400, "error while creating a new document");
    }

    return res.status(200)
              .json(new ApiResponse(200, createdDocument, 'document created successfully'))
})

const getDocumentById = asyncHandler(async(req, res)=>{
    const {documentId} = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(documentId);

    if(!isValidId){
        throw new ApiError(400, "documentId is missing or invalid");
    }

    const document = await Doc.findById(documentId);

    if(!document){
        throw new ApiError(400, "document not found");
    }

    return res.status(200)
              .json(new ApiResponse(200, document, "document fetched successfully"));
})

const updateDocument = asyncHandler(async(req, res)=>{
    const {documentId} = req.params;
    const {title, description, effectiveDate, expiryDate, documentType} = req.body;
    const isValidId = mongoose.Types.ObjectId.isValid(documentId);

    if(!isValidId){
        throw new ApiError(400, "documentId is missing or invalid");
    }

    if([title, description, effectiveDate, expiryDate, documentType].some(field=>field.trim() === '')){
        throw new ApiError(400, "all the fields are required, cannot leave any field empty")
    }

    let updatedDocLocalFilePath;
    if(req?.file){
        updatedDocLocalFilePath = req.file.path;
    }

    let updatedFile;
    if(updatedDocLocalFilePath){
        updatedFile = await uploadOnCloudinary(updatedDocLocalFilePath);
    }

    if(updatedFile && !updatedFile?.url){
        throw new ApiError(400, "error while uploading file to cloudinary");
    }

    const updatedDocument = await Doc.findByIdAndUpdate(
        documentId,
          {
            $set: {
                title, description, effectiveDate, expiryDate,documentType,  file: updatedFile && updatedFile.url
            }
        }, 
        {returnDocument: 'after'}
    )

    if(!updatedDocument){
        throw new ApiError(400, "error while updating document");
    }

    return res.status(200)
              .json(new ApiResponse(200, updatedDocument, "document updated successfully"));
})

const deleteDocument = asyncHandler(async(req, res)=>{
    const {documentId} = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(documentId);

    if(!isValidId){
        throw new ApiError(400, "documentId is missing or invalid");
    }

    const document = await Doc.findByIdAndDelete(documentId);

    if(!document){
        throw new ApiError(400, "error while deleting document");
    }
    
    return res.status(200)
              .json(new ApiResponse(200, {}, "document deleted successfully"));
})

const getAllDocuments = asyncHandler(async(req, res)=>{
    // const {documentType} = req.params;
    // console.log(typeof(documentType))

    // if(!documentType){
    //     throw new ApiError(400, "document type is missing");
    // }

    // if(documentType!== 'HIRA' && documentType!== 'SOP'){
    //     throw new ApiError(400, "invalid document type");
    // }

    const documents = await Doc.find()

    if(!documents){
        throw new ApiError(400, "error while fetching documents");
    }

    return res.status(200)
              .json(new ApiResponse(200, documents, "documents fetched successfully"));
})

export {createDocument, getDocumentById, updateDocument, deleteDocument, getAllDocuments};