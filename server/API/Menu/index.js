//Libraries 
import express from "express";
import passport from "passport";

//Databse model 
import { MenuModel, ImageModel} from "../../database/allModels";

const Router = express.Router();


/* 
Route       /list
Des         Get all menu  based on id 
Prams       id
Access      Public
Method      get
*/
Router.get("/list/:_id", async(req,res) => {
    try {
        const {_id} = req.params;
        const menus = await MenuModel.findOne(_id);

        return res.json( {menus});


    } catch (error) {
        return res.status(500).json( {error:error.message});
    }
});

/* 
Route       /images
Des         Get all menu images  based on id 
Prams       id
Access      Public
Method      get
*/
Router.get("/image/:_id", async(req,res) => {
    try {
        const {_id} = req.params;
        const menus = await ImageModel.findOne(_id);

        return res.json( {menus});


    } catch (error) {
        return res.status(500).json( {error:error.message});
    }
});


export default Router;