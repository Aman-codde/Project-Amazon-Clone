import mongoose from 'mongoose';
import { Product } from '../../shared/models/product.model.js';

const {Schema,model} = mongoose;

const productSchema = new Schema<Product>({
    _id: {type: mongoose.Types.ObjectId},
    product_name: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    imgUrl: {type: String},
    categories:[{type: mongoose.Types.ObjectId, ref: 'Category'}]
})

export const ProductModel = model<Product>('Product',productSchema)
