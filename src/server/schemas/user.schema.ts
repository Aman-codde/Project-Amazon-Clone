import mongoose from 'mongoose';
import { User } from '../../shared/models/user.model.js';
import { CartModel } from './cart.schema.js';

const {Schema, model} = mongoose;

const userSchema = new Schema<User>({
    id: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String},
    email: {type: String, required: true},
    password: {type: String, required:true},
    active: {type:Boolean, default: true},
    addresses: [
        {
            fullName: {type: String, required: true},
            phone: {type: Number, required: true},
            street: {type: String, required: true},
            city: {type: String, required: true},
            state: {type: String, required: true},
            zipcode: {type: String, required: true},
            country: {type: String, required: true},
            _id: 0
        }
    ]
    
})

userSchema.pre('save', function(next) { 
    //this.id = this.email;
    this.id = `${this.email ? this.email : ''}`;
    next();
});

userSchema.post('save', function(next) {
    console.log(this._id);
    const cart = new CartModel({
        user: this._id,
        products: []
    });
    console.log(cart);
    cart
    .save()
    .then(next)
})

userSchema.post('remove', function(user,next){
    console.log('remove',next);
    CartModel
    .findOneAndDelete({user: this._id}, function(err: any,data: any) {
        if (err){
            console.log(err)
        }
        else {
            next();
        }
    })
})

userSchema.path('email').validate(async (email: string) => {
    const emailCount = await mongoose.models.User?.countDocuments({ email })
    return !emailCount
},'Email already exists');



export const UserModel = model<User>('User', userSchema);
    
