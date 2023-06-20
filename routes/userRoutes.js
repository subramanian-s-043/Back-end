const express=require('express');
const router=express.Router();
const {getAllUsers, createUser,getUsersById,deleteUsersById,updateUsersById}=require('../controllers/userController');
router.get('/users', async (req,res)=>{
    await getAllUsers(req,res);
})
router.get('/users/:id', async (req,res)=>{
    await  getUsersById(req,res);
})
router.delete('/users/:id', async (req,res)=>{
    await  deleteUsersById(req,res);
})
router.put('/users/:id', async (req,res)=>{
    await  updateUsersById(req,res);
})
router.post('/create',async (req,res)=>{
    await createUser(req.body,res);
})
module.exports=router;