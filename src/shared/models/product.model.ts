import * as mongoose from 'mongoose';
import { Category } from './category.model.js';

export interface Product {
    _id?: mongoose.Types.ObjectId,
    product_name: string,
    price: number,
    quantity: number,
    imgUrl: string,
    categories?: Category[],
    category_name?: string
}