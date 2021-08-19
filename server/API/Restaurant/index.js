//Libraries 
import express from "express";
import passport from "passport";

//Databse model 
import { RestaurantModel } from "../../database/allModels";

const Router = express.Router();


/* 
Route       /
Des         Get all restaurant details based on city  
Prams       none 
Access      Public
Method      get
*/
Router.get("/", async (req, res) => {
    try {
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });

        return res.json({restaurants});
    }
    catch (error) {
        return res.status(500).json({error:error.message});
    }
});

/* 
Route       /:id
Des         Get individual restaurant details based on id
Prams       none 
Access      Public
Method      Get
*/

Router.get("/:_id", async (req, res) => {
    try {
         const {_id} = req.params;
         const restaurant = await RestaurantModel.findOne(_id);

        if(!restaurant)
             return res.status(404).json({error:"Restaurant Not found"});

        return res.json({restaurant});
    }
    catch (error) {
        return res.status(500).json({error:"Restaurant Not found"});
    }
});


/* 
Route       /search
Des         Get individual restaurant details based on search string
Prams       none 
Body        searchString
Access      Public
Method      Get
*/
Router.get("/search", async (req, res) => {
    try {
        const { searchString } = req.body;

        const restaurants = await RestaurantModel.find({
             name : { $regex:searchString ,$options:"i" },
             });

             if(!restaurants)
             return res.status(404).json({error:`No Restaurant Matched with  ${searchString}`});

        return res.json({restaurants});
    }
    catch (error) {
        return res.status(500).json({error:"Restaurant Not found"});
    }
});



export default Router;
