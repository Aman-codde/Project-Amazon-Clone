import * as mongoose from 'mongoose';
export interface Address {
    street: string,
    city:string,
    state:string,
    zipcode: string
}

export interface User {
    _id?:{type: mongoose.Types.ObjectId}
    id?: string,
    firstName: string,
    lastName?:string,
    email:string,// how to use id as email _id: email
    password: string,
    billingAddress?: Address,
    shippingAddress?: Address
}