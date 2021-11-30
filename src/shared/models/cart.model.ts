import { Product } from './product.model.js';
import { User } from './user.model.js';

export interface Cart {
    user?: User,
    products: [
        {
        product: Product,
        selected_quantity: number
        }
    ];// list of product ids and selected quantity
    count: number;
    total_amount: number;
}