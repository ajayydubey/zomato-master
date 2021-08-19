//Importing Env Variables
require("dotenv").config();

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//Configs
import googleAuthConfig from "./config/google.config"


//microservices routes 
import Auth from "./API/Auth/";
import Restaurant from "./API/Restaurant"
import Food from "./API/Food";
import Image from "./API/Image";
import Order from "./API/Orders";
import Reviews from "./API/Reviews"


//Database Connection 
import ConnectDB from "./database/connection"
import { RestaurantModel } from "./database/restaurant";

const zomato = express();

//Application middlewares 
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());


//Passport configuration
googleAuthConfig(passport);


//Application Routes 
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food",Food);
zomato.use("/image",Image);
zomato.use("/order",Order);
zomato.use("/reviews",Reviews);




zomato.get("/", (req, res) => res.json({ message: "setup success" }));
zomato.listen(4000, () =>
    ConnectDB().then(() => console.log("Server is running")).catch(
        () => console.log("Server is running,but database failed...")
    )
);




