import * as mongoose from 'mongoose';
export interface Address {
    fullName: string,
    phone: number,
    street: string,
    city:string,
    state:string,
    zipcode: string,
    country: string
}

export interface User {
    _id?:{type: mongoose.Types.ObjectId}
    id?: string,
    firstName: string,
    lastName?:string,
    email:string,// how to use id as email _id: email
    password: string,
    active?: boolean,
    addresses?: Address[]
}