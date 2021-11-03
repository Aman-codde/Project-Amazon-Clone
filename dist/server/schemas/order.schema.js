import mongoose from 'mongoose';
import '../../shared/models/order.model.js';
import '../../shared/models/product.model.js';
const { Schema, model } = mongoose;
const orderSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId },
    current_date: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
});
// length of array
orderSchema.virtual('itemCount').get(function () {
    return this.products.length;
});
// total price of all products
orderSchema.virtual('subtotal').get(function () {
    this?.products.reduce(function (a, c) {
        return a + c.price;
    }, 0);
});
//# sourceMappingURL=order.schema.js.map