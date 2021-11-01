import mongoose from 'mongoose';
import '../../shared/models/cart.model.js';
import '../../shared/models/product.model.js';
const { model, Schema } = mongoose;
const cartSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }]
});
cartSchema.virtual('count').get(function () {
    return this.products.length;
});
cartSchema.virtual('total_amount').get(function () {
    return this?.products.reduce((a, c) => {
        return a + c.price;
    }, 0);
});
cartSchema.set(`toObject`, { virtuals: true });
cartSchema.set('toJSON', { virtuals: true });
export const CartModel = model('Cart', cartSchema);
//# sourceMappingURL=cart.schema.js.map