//Libraries 
import express from "express";
import passport from "passport";

//Databse model 
import { FoodModel } from "../../database/allModels";

const Router = express.Router();


/* 
Route       /r/id
Des         Get all foods  based on particualr restaurant 
Prams       id
Access      Public
Method      get
*/
Router.get("/r/:_id", async(req,res) => {
    try {
        
        const {_id } = req.params;
        const foods = await FoodModel.find( {restaurant:_id});

        return res.json({foods});
    } catch (error) {
        return res.status(500).json({error:error.message});
        
    }

});

/* 
Route       /c/id
Des         Get all foods  based on particualr category 
Prams       id
Access      Public
Method      get
*/
Router.get("/c/:category", async(req,res) => {
    try {
        
        const {category } = req.params;
        const foods = await FoodModel.find({
            category :{ $regex:category,$options: "i"},
        });

        return res.json({foods});
    } catch (error) {
        return res.status(500).json({error:error.message});
        
    }

});


export default Router;