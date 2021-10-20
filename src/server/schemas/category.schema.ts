import mongoose from 'mongoose';
import { Category } from '../../shared/models/category.model.js';

const {model,Schema} = mongoose;

const categorySchema = new Schema<Category>({
    _id: {type: mongoose.Types.ObjectId},
    category_name: {type:String, required: true},
    parent_category: {type: mongoose.Types.ObjectId, ref: 'Category'}
});

export const CategoryModel = model<Category>('Category', categorySchema);