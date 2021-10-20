import * as mongoose from 'mongoose';

export interface Category {
    _id: mongoose.Types.ObjectId,
    category_name: string,
    parent_category?: mongoose.Types.ObjectId
}