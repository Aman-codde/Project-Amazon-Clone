import * as mongoose from 'mongoose';

export interface Cart {
    user?: mongoose.Types.ObjectId,
    products: [mongoose.Types.ObjectId];// list of product ids
}