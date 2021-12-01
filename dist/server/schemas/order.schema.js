import mongoose from 'mongoose';
import '../../shared/models/order.model.js';
import '../../shared/models/product.model.js';
const { Schema, model } = mongoose;
const orderSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    products: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'Product' },
            selected_quantity: { type: Number },
            _id: 0
        }
    ],
    itemCount: { type: Number },
    amount_paid: { type: Number },
}, {
    timestamps: true
});
export const OrderModel = model('Order', orderSchema);
//# sourceMappingURL=order.schema.js.map