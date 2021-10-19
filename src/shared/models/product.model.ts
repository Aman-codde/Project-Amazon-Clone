import * as mongoose from 'mongoose';

export interface Product {
    product_name: string,
    price: number,
    quantity: number,
    imgUrl: string,
    categories?: [mongoose.Types.ObjectId]
}