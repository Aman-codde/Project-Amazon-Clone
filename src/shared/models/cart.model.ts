import { Product } from './product.model.js';
import { User } from './user.model.js';

export interface Cart {
    user?: User;
    products: [
        {
            product: Product;
            selected_quantity: number;
        }
    ];
    count: number;
    total_amount: number;
}