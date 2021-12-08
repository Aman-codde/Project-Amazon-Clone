
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { UserModel } from './schemas/user.schema.js'
import mongoose from 'mongoose';
import { ProductModel } from './schemas/product.schema.js';
import { CategoryModel } from './schemas/category.schema.js';
import { CartModel } from './schemas/cart.schema.js';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import {authHandler} from './middleware/auth.middleware.js';
import * as OrderProcess from './middleware/order.middleware.js';
import { OrderModel } from './schemas/order.schema.js';


dotenv.config();
const access_secret =  process.env.ACCESS_TOKEN_SECRET as string;

const app = express();
const PORT = process.env.PORT || 3000;;
const saltRounds = 10;
const __dirname = path.resolve();

const clientPath = path.join(__dirname, '/dist/client');

//mongoose.connect('mongodb://localhost:27017/amazonCloneDB')
mongoose.connect(`${process.env.MONGO_URI}`)
.then(() => {
    console.log('Connected to DB Successfully');
})
.catch(err => console.log('Failed to Connect to DB', err))

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.static(clientPath));


// create/add new product
app.post('/api/create-product', function(req,res) {
    const new_product = new ProductModel(req.body);
    //console.log("new product: ", new_product)
    new_product
    .save()
    .then(data => {
        //console.log("Product created: ",{data});
        res.json({data})
    })
    .catch(err => res.status(501).json({error: err}))
})

//get all products using categories as query params
app.post('/api/products', function(req,res) {
    const query: any = {} ; // fetch all products
    if(req.body.categories) {
        query.categories = { $in: [req.body.categories] }
    }
    if(req.body._id) {
        console.log("hi");
        query._id = req.body._id;
    }
    ProductModel
    .find(query)
    .then((data) => res.json({data}))
    .catch( err => res.status(501).json(err))
})

function productsSort(direction: number) {
    return ProductModel
    .find()
    .sort({price: direction});
}

//get all products with price low to high
app.get('/api/productsByPriceDesc', function(req,res) {
    productsSort(-1)
    .then(data => {
        //console.log("sort by price: ",data);
        res.json({data});
    })
})
//get all products with price high to low
app.get('/api/productsByPriceAsc', function(req,res) {
    console.log('reached to server');
    productsSort(1)
    .then(data => {
        console.log("sort by price: ",data);
        res.json({data});
    })
})

//get products by price(upto$10,$10-$20,$20 & above)
app.get('/api/productsByPriceChoice/:choice', function(req,res) {
    let choice = Number(req.params.choice);
    let query = {}
    switch(choice){
        case 1:
            query = {price: {$gte:1, $lte:10} }
            break;
        case 2:
            query = {price: {$gte:10, $lte:20} }
            break;
        case 3:
            query = {price: {$gte: 20}}
    }
    ProductModel
    .find(query)
    .sort({price: 1})
    .then(data => {
        //console.log(`Price range from ${query}:  ${data}`)
        res.json({data})
    })
    .catch(err => {err})
})

// show particular product by id 
app.post('/api/product/:id', function(req,res) {
    //console.log("ProductId: ",req.params.id);
    ProductModel
    .findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => {
        //console.log("error in app post", err)
        res.status(501).json(err)
    })
})

//show category collection 
app.get('/api/categories', function(req,res) {
    CategoryModel
    .find()
    .populate(
             {path: 'parent_category', 
             populate: [
                 {path: 'parent_category',
                 populate: [{path: 'parent_category'}]
                 }
             ]})
    .then( data => {
        res.json({data})
    })
    .catch(err => res.status(501).json(err))
})

// create new category
app.post('/api/create-category', function(req,res) {
    console.log("create new category:", req.body);
    if(req.body.parent_category == '') {
        req.body = {category_name: req.body.category_name}
        console.log("new category without parent:", req.body);
    }
    const new_category = new CategoryModel(req.body)
    new_category
    .save()
    .then(data => {
        console.log('new category created', {data});
        res.json({data})
    })
    .catch(err => {
        console.log(err);
        res.status(501).json(err)
    })
});


app.get('/api/users', function(req,res){
    UserModel
    .find({}, '-password')
    .then(data => res.json({data}))
    .catch(err => {
        res.status(501)
        res.json({errors: err});
    })
});

// create new user and also assign a new cart to the person
app.post('/api/create-user', function(req,res){
    const {firstName, lastName, email, password} = req.body;
    
    // generate salt string
    bcrypt.genSalt(saltRounds,function(err,salt) {
        console.log("Salt value = ", salt);

        // encrypted value using hash along with salt string
        bcrypt.hash(password,salt,function(err, hash) {
            console.log("Ecrypted/ hash password = ", hash);

            const new_user = new UserModel({
                firstName,
                lastName,
                email,
                password: hash
            });
            console.log(new_user);
            new_user
            .save()
            .then(data => res.json({data}))
            .catch(err => {
                console.log(err)
                res.status(501).json({err})})
        })
    })
});

// delete user and his/her cart
app.delete('/api/delete-user/:id', function(req, res) {
    const userId = req.params.id;
        UserModel
        .findById(userId)
        .then(user => {
            user?.remove()
            .then(data => res.json({data}))
            .catch(err => res.sendStatus(501).json(err))
        })        
})

app.put('/api/update-user/:id', authHandler ,function(req: any, res) {
    let updateUserQuery = {};
    if(req.body.firstName) {
        updateUserQuery = { firstName: req.body.firstName, lastName: req.body.lastName }
    }
    if(req.body.email) {
        updateUserQuery = {email: req.body.email}
    }
    UserModel
    .findByIdAndUpdate(
        req.user._id,
        {
            $set: updateUserQuery,
        },
        {
            new: true,
        },
        function(err, updateUser) {
            if(err) {
                res.send("Error updating user");
            }
            else{
                console.log("updated user:",updateUser);
                res.json(updateUser);
            }
        }
    )
})

//login
app.post('/api/login', function(req,res) {
    UserModel
    .findOne({email: req.body.email}).lean()
    .then((user:any) => {
        // if no user found with given email
        if(!user) {
            console.log('Invalid Email');
            return res.sendStatus(500);;
        }
        bcrypt.compare(req.body.password,`${user?.password}`, function(err, result){
            // if password matches
            if(result) {
                const access_token = jwt.sign({user},access_secret);// generates json web token as a string

                res.cookie('jwt',access_token,{ httpOnly: true, maxAge: 60*60*1000});
                
                delete user.password;// to not pass password on frontend
                res.json({data: user})
            }
            // if password does NOT matches
            else {
                console.log("Invalid password");
                res.sendStatus(403);
            }
        }) 
    })
    .catch((err) => {
        return res.sendStatus(404);
    })
})
//res.json({message: 'login route', user, access_token})

// check login
app.get('/api/check-login', authHandler, function(req: any,res) {
    res.json(req.user);
})

app.get('/api/logout', function(req,res) {
    console.log("logout called in server");
    res.cookie('jwt','',{httpOnly: true, maxAge:0});
    res.json({message: "Successfully Logged out"});
})

// show cart collection(requirement: particular cart for logged in user)
app.get('/api/cart',authHandler ,function(req: any,res) {
    const loggedUser = req.user;
    console.log("logged user:",loggedUser._id);
    const userId = loggedUser._id;
    CartModel
    .findOne({user:userId}, "count total_amount")   
    .populate('user','firstName email')
    .populate(
        {
            path: 'products', 
            populate: {
                path: 'product'
            }
        })
    .then(data => {
        console.log("Cart: ",data);
        res.json(data);
    })
    .catch( err => res.json(err));
})

//update cart(push product to cart)
//1. get cart from userid, 2. add productid to cart
// productid from frontend, userid from auth.middleware
app.put('/api/update-cart', authHandler ,function(req:any,res){
    const loggedUser = req.user;
    const productId = req.body.product._id;
    const selected_qty = req.body.selected_qty;
    CartModel
    .findOne(
        {user: loggedUser._id},
        "count total_amount"
    )
    .populate('user')
    .populate('products.product products.selected_quantity') 
    .then(cart => {
        console.log("....cart: ", cart);
        if(cart) {
            const product = cart.products.find(p => p.product._id == productId);
            if(product) {
                product.selected_quantity = selected_qty
            }
            else {
                cart.products.push({product: productId, selected_quantity: selected_qty})
            }
            cart.save()
            .then(updatedCart => {
                console.log("updated cart: ->  ",updatedCart);
                res.json(updatedCart)
            })
        }
    })
})

// delete product from cart
app.put('/api/delete-from-cart/:productId', authHandler,function(req:any,res) {
    const loggedUser = req.user;    
    const productId = req.params.productId;
    CartModel
    .findOneAndUpdate(
        {user: loggedUser._id},
        {$pull: {'products': {product: productId} } },
        {new: true}
    )
    .populate('user')
    .populate('products.product')
    .then(data => {
        console.log("delete from cart: ",data);
        res.json({data})
    })
    .catch(err => res.json(err))
})

//(function(){})() IIFE(Immediately Invoked Function Expression)
//OrderProcess.createOrder()

app.post('/api/order', 
    OrderProcess.createOrderAndDecreaseQuantity,
    OrderProcess.emptyCart
);

// show all orders of logged user (using "$in")
app.get('/api/orders', authHandler,function(req: any,res) {
    OrderModel
    .find({user: { $in: [req.user._id] }}).sort({createdAt: -1})
    .populate('products.product')
    .then(data => {
        res.json(data)
    })
    .catch(err => res.json(err))
})

// show all orders of logged user for choosen date/year 
app.get('/api/orders-by-date', function(req: any,res) {
    console.log("hi @orders by date");
    var d = new Date();
    d.setMonth(d.getMonth() - 3); //last 3 months
    d.setMonth(d.getMonth() - 1);// 1 month ago
    d.setFullYear(2021)// for one year
    let choice = Number(req.params.choice);
    let query = {}
    switch(choice){
        case 1:
            query = {$eq: d}
            break;
        case 2:
            query = {$gte: d}
            break;
    }
    OrderModel
    .find({
        //user: { $in: [req.user._id] } 
        createdAt: query
    })
    //.populate('products')
    .then(data => {
        console.log("orders by date",data)
        res.json(data)
    })
    .catch(err => res.json(err))
})

app.all("/api/*", function(req,res) {
    res.sendStatus(404);
})

app.get('*', function(req, res) {
    const filePath = path.join(__dirname,'/dist/client/index.html');
    console.log(filePath);
    res.sendFile(filePath);
 });

app.listen(PORT, function(){
    console.log( `starting at localhost http://localhost:${PORT}`);
})
