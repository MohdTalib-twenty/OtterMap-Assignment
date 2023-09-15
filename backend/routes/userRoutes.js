const express = require("express")
const userAuth = require("../middlewares/authMiddleware");
const { getUserController, updateUserController, deleteUserController } = require("../controllers/userController");

const router = express.Router();



router.get('/getUser',userAuth,getUserController);
router.put('/updateUser',userAuth,updateUserController)
router.delete("/deleteUser",userAuth,deleteUserController)



module.exports=router