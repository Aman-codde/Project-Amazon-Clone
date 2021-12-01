import mongoose from 'mongoose';
import '../../shared/models/cart.model.js';
const { model, Schema } = mongoose;
const cartSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    products: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'Product' },
            selected_quantity: { type: Number, required: true },
            _id: false
        }
    ]
});
cartSchema.virtual('count').get(function () {
    let items_count = 0;
    this.products.map(i => {
        items_count += i.selected_quantity;
    });
    return items_count;
});
cartSchema.virtual('total_amount').get(function () {
    let amount = 0;
    this.products.map(i => {
        amount += (i.product.price * i.selected_quantity);
    });
    return amount;
});
cartSchema.set(`toObject`, { virtuals: true });
cartSchema.set('toJSON', { virtuals: true });
export const CartModel = model('Cart', cartSchema);
//# sourceMappingURL=cart.schema.js.map