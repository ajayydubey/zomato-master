//Libraries 
import express from "express";
import passport from "passport";

//Databse model 
import { MenuModel, ImageModel, OrderModel} from "../../database/allModels";

const Router = express.Router();


/* 
Route       /
Des         Get all orders based on id 
Prams       _id
Access      Public
Method      get
*/
Router.get("/", async(req,res) => {
    try {
        const {_id} = req.params;
        const getOrders = await OrderModel.findOne({ user:_id});

        if(!getOrders)
        {
        return res.status(400).json( {error:"User not found"});
        } 
        
        return res.status(200).json( {orders : getOrders});
    } catch (error) {
        return res.status(500).json( {error:error.message});
    }
});



/* 
Route       /new
Des         Add new order 
Prams       _id
Access      Public
Method      Post 
*/

Router.psot("/new/_id", async(req,res) => {
    try {
        const {_id} = req.params;
        const {orderDetails} = req.body;

        const addNewOrder = await OrderModel.findOneAndUpdate(
        {
            user : _id,
        },

        {
         $push : { orderDetails  },
        },

        {new:true}
        );
 
        
        return res.json( {order : addNewOrder});
    } 
    
    catch (error) {
        return res.status(500).json( {error:error.message});
    }
});



export default Router;