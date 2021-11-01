import * as mongoose from 'mongoose';
import { Product } from './product.model.js';
import { User } from './user.model.js';

export interface Cart {
    user?: User,
    products: Product[];// list of product ids
    count: number;
    total_amount: number;
}