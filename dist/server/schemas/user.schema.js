import mongoose from 'mongoose';
import '../../shared/models/user.model.js';
import { CartModel } from './cart.schema.js';
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
userSchema.post('save', function (next) {
    console.log(this._id);
    const cart = new CartModel({
        user: this._id,
        products: []
    });
    console.log(cart);
    cart
        .save()
        .then(next);
});
userSchema.post('remove', function (user, next) {
    console.log('remove', next);
    CartModel
        .findOneAndDelete({ user: this._id }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            next();
        }
    });
});
export const UserModel = model('User', userSchema);
//# sourceMappingURL=user.schema.js.map