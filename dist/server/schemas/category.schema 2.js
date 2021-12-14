import mongoose from 'mongoose';
import '../../shared/models/category.model.js';
const { model, Schema } = mongoose;
const categorySchema = new Schema({
    category_name: { type: String, required: true },
    parent_category: { type: mongoose.Types.ObjectId, ref: 'Category' }
});
export const CategoryModel = model('Category', categorySchema);
//# sourceMappingURL=category.schema.js.map