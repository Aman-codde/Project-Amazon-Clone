import mongoose from 'mongoose';
import '../../shared/models/user.model.js';
const { Schema, model } = mongoose;
const userSchema = new Schema({
    id: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
userSchema.pre('save', function (next) {
    //this.id = this.email;
    this.id = `${this.email ? this.email : ''}`;
    next();
});
export const UserModel = model('User', userSchema);
//# sourceMappingURL=user.schema.js.map