import { Router } from "express";
import { createDocument,getDocuments } from "../controllers/documents.controller";
import {verifyToken} from "../middlewares/authJwt";
const router = Router();

router.post('/',verifyToken,createDocument)
router.get('/',verifyToken,getDocuments)

export default router