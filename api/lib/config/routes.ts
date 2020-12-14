// lib/config/routes.ts
import { Request, Response, Router } from "express";

import user from "../controllers/User";

import blob from '../controllers/Blob'

import bucket from "../controllers/Bucket"

import register from '../controllers/Register'

import checkJwt from "./checkJwt";

const router = Router();

router.use('/bucket',checkJwt(),bucket)
router.use('/blob',checkJwt(),blob)
router.use('/users',checkJwt(),user)
router.use('/auth',register)

export default router
