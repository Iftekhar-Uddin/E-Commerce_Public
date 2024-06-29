import express from 'express';
import { signUp, signIn } from '../controller/user/signUp_signIn.js';
import { allUser, detailsUser, updateUser, logOut } from '../controller/user/update_details.js';
import verify from "../middleware/verify.js";
const router = express.Router();

// User
router.post('/signup', signUp);
router.post('/signin', signIn);


// User Manipulation
router.get('/alluser', verify, allUser);
router.get('/detailsuser', verify, detailsUser);
router.post('/updateuser', verify, updateUser);
router.get('/logout', logOut);

export default router;