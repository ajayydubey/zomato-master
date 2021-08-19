//Libraries 
import express from "express";
import passport from "passport";

//Databse model 
import {UserModel} from "../../database/allModels";

const Router = express.Router();


/* 
Route       /:_id
Des         Get user data 
Prams       _id
BODY        none 
Access      Public
Method      Get
*/
Router.post("/:_id", async(req,res) => {
    try {
     
        const {_id} = req.params;
        const getUser = await UserModel.findById({_id});
        return res.json( {user: getUser});
    } 
    catch (error) {
        return res.status(500).json( {error:error.message});
    }
});



/* 
Route       /update/:_id
Des         Update user id
Prams       _id
BODY        user data
Access      Public
Method      Put
*/
Router.post("/update/:userID", async(req,res) => {
    try {
     
        const  {userID} = req.params;
        const {userData} = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate (userID,{
            $set: userData,
        },
        {new:true}
        );
        return res.json( {user: updateUserData });
    } 
    catch (error) {
        return res.status(500).json( {error:error.message});
    }
});

export default Router;