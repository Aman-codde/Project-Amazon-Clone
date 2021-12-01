import * as mongoose from 'mongoose';
import { Address, User } from '../models/user.model.js'
import { Product } from './product.model.js';

export interface Order {
    _id?: mongoose.Types.ObjectId;
    user?: User;
    products: [
        {
            product: Product;
            selected_quantity: number;
        }
    ];
    itemCount?: number;  
    amount_paid?: number;
    shippingAddress?: Address
}

// items: Item[];
// interface Item {
//     product: Product;
//     product_name: string;
//     price: number;
// }