import { Router } from "express";
import { createDocument, updateDocument, deleteDocument, getAllDocuments, getDocumentById } from "../controllers/document.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);
router.route("/create").post(upload.single('file'), createDocument)
router.route("/read/:documentId").get(getDocumentById);
router.route("/update/:documentId").post(upload.single('file'), updateDocument);
router.route("/delete/:documentId").post(deleteDocument);
router.route("/").get(getAllDocuments);

export default router;