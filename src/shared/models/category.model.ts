import * as mongoose from 'mongoose';

export interface Category {
    category_name: string,
    parent_category?: mongoose.Types.ObjectId
}