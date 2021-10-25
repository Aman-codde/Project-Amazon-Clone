import mongoose from 'mongoose';
import { Cart } from '../../shared/models/cart.models.js';

const {model,Schema} = mongoose;

const cartSchema = new Schema<Cart>({
    user: {type: mongoose.Types.ObjectId, ref:'User'},
    products: [{type: String}]
    //products: [{type: mongoose.Types.ObjectId, ref:'Product'}]
});

export const CartModel = model<Cart>('Cart', cartSchema)