const User=require('../models/User')
const mongoose=require('mongoose')
const getAllUsers = async(req,res)=>{
    try{
        const users=await User.find({});
        res.status(200).json(users);
    }
    catch(err)
    {
        res.status(400).json({message:err});
        console.log(err);
    }
}

const createUser=async(userData,res)=>{
    try {
        const newUser=new User({
         ...userData
        })
        await newUser.save().then((newUserdata) => {
          res.status(200).json({message:"Success", newUserdata})
        }).catch((error) => {
          res.status(400).json({error})
        })
    } catch (error) {
         console.log(error)
         res.status(500).json({message: 'Unable to Register'})
    }
}


const getUsersById=async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    {
        return res.status(404).json({message:`No Users Availabe with id ${req.params.id}`});
    }
    try {
        await User.findOne({_id:req.params.id}).then((Userdata) => {
          res.status(200).json({message:"Success", Userdata})
        }).catch((error) => {
          res.status(400).json({error})
        })
    } catch (error) {
         console.log(error)
         res.status(500).json({message: 'Unable to Fetch Data'})
    }
}

const deleteUsersById=async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    {
        return res.status(404).json({message:`No Users Availabe with id ${req.params.id}`});
    }
    try {
        await User.deleteOne({_id:req.params.id}).then((Userdata) => {
          res.status(200).json({message:"Success", Userdata})
        }).catch((error) => {
          res.status(400).json({error})
        })
    } catch (error) {
         console.log(error)
         res.status(500).json({message: 'Unable to Fetch Data'})
    }
}

const updateUsersById=async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    {
        return res.status(404).json({message:`No Users Availabe with id ${req.params.id}`});
    }
    try {
           await User.findByIdAndUpdate(req.params.id,{$set: req.body }).then((update) => {
             res.status(200).json({message:"Success", update})
           }).catch((error) => {
             res.status(400).json({error})
           })
    } catch (error) {
         console.log(error)
         res.status(500).json({message: 'Unable to Fetch Data'})
    }
}


module.exports={
    getAllUsers,
    createUser,
    getUsersById,
    deleteUsersById,
    updateUsersById
}