import mongoose from 'mongoose';
import '../../shared/models/cart.model.js';
const { model, Schema } = mongoose;
const cartSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }]
});
export const CartModel = model('Cart', cartSchema);
//# sourceMappingURL=cart.schema.js.map