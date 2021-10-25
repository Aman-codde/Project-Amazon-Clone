import mongoose from "mongoose";

export interface Cart {
    user?: mongoose.Types.ObjectId; // user id
    products: [string];
    //products: [mongoose.Types.ObjectId];// list of product ids
}