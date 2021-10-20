import * as mongoose from 'mongoose';

export interface Product {
    _id?: mongoose.Types.ObjectId,
    product_name: string,
    price: number,
    quantity: number,
    imgUrl: string,
    categories?: [mongoose.Types.ObjectId]
}