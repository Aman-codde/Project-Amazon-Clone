import mongoose from 'mongoose';
import { Cart } from '../../shared/models/cart.model.js';
import { Product } from '../../shared/models/product.model.js';

const {model,Schema} = mongoose;

const cartSchema = new Schema<Cart>({
    user: {type: mongoose.Types.ObjectId, ref:'User'},
    products: [
        {
            product: {type: mongoose.Types.ObjectId, ref:'Product'},
            selected_quantity: {type: Number, required: true}
        }
    ]
});

cartSchema.virtual('count').get(function (this: Cart) {
    return this.products.length;
});

cartSchema.virtual('total_amount').get(function(this: Cart) {
    return this?.products?.reduce((a: number, c: {product: Product, selected_quantity: number}) => {
        return a + (c.product.price * c.selected_quantity)
    },0)
})

cartSchema.set(`toObject`, { virtuals: true });
cartSchema.set('toJSON', { virtuals: true });

export const CartModel = model<Cart>('Cart', cartSchema)