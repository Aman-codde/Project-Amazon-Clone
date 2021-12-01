import mongoose from 'mongoose';
import { Order } from '../../shared/models/order.model.js';
import { Product } from '../../shared/models/product.model.js';

const {Schema, model} = mongoose;

const orderSchema = new Schema<Order>({
    user: { type: mongoose.Types.ObjectId, ref: 'User'},
    products: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'Product'},
            selected_quantity: {type: Number},
            _id: 0
        }
    ],
    itemCount: {type:Number},
    amount_paid: {type: Number},
},
{
    timestamps: true
}
);

export const OrderModel = model<Order>('Order', orderSchema);

