//Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

//Models
import { UserModel, userModel } from "../../database/user";


const Router = express.Router();

/* 
Route       /signup 
Des         Register new user 
Prams       none 
Access      Public
Method      Post 
*/
Router.post("/signup", async (req, res) => {
    try {
        await UserModel.findByEmailAndPhone(req.body.credentials);
        const newUser = await UserModel.create(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({ token, status: "Success" });
    }

    catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

/* 
Route       /signin 
Des         Signin with email and password
Prams       none 
Access      Public
Method      Post 
*/
Router.post("/signin", async (req, res) => {
    try {
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        const token = user.generateJwtToken();
        return res.status(200).json({ token, status: "Success" });
    }

    catch (error) {
        return res.status(500).json({ error: error.message });
    }

});


/* 
Route       /google
Des         google signin  
Prams       none 
Access      Public
Method      get
*/
Router.get("/google", passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ],
})
);



/* 
Route       /google/callback
Des         google signin   callback
Prams       none 
Access      Public
Method      get
*/
Router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        return res.json({ token: req.session.passport.user.token });
    }
);



export default Router;