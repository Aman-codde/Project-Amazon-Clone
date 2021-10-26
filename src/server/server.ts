
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { UserModel } from './schemas/user.schema.js'
import mongoose from 'mongoose';
import { ProductModel } from './schemas/product.schema.js';
import { CategoryModel } from './schemas/category.schema.js';
import { CartModel } from './schemas/cart.schema.js';

const app = express();
const PORT = 3501;
const saltRounds = 10;

mongoose.connect('mongodb://localhost:27017/amazonCloneDB')
.then(() => {
    console.log('Connected to DB Successfully');
})
.catch(err => console.log('Failed to Connect to DB', err))


app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
   res.json({message:'test'});
});

// create/add new product
app.post('/create-product', function(req,res) {
    const new_product = new ProductModel(req.body);
    console.log("new product: ", new_product)
    new_product
    .save()
    .then(data => {
        console.log({data});
        res.json({data})
    })
    .catch(err => res.status(501).json({error: err}))
})

//get all products using categories as query params
app.post('/products', function(req,res) {
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
app.get('/productsByPriceDesc', function(req,res) {
    productsSort(-1)
    .then(data => {
        console.log("sort by price: ",data);
        res.json({data});
    })
})
//get all products with price high to low
app.get('/productsByPriceAsc', function(req,res) {
    productsSort(1)
    .then(data => {
        console.log("sort by price: ",data);
        res.json({data});
    })
})

//get products by price(upto$10,$10-$20,$20 & above)
app.get('/productsByPriceChoice/:choice', function(req,res) {
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
        console.log(`Price range from ${query}:  ${data}`)
        res.json({data})
    })
    .catch(err => {err})
})

// show particular product by id 
app.post('/product/:id', function(req,res) {
    console.log("ProductId: ",req.params.id);
    ProductModel
    .findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => {
        console.log("error in app post", err)
        res.status(501).json(err)
    })
})

//show category collection 
app.get('/categories', function(req,res) {
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


app.get('/users', function(req,res){
    UserModel
    .find()
    .then(data => res.json({data}))
    .catch(err => {
        res.status(501)
        res.json({errors: err});
    })
});

app.post('/create-user', function(req,res){
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
                hashedPassword: hash
            });
            new_user
            .save()
            .then(data => res.json({data}))
            .catch(err => res.status(501).json({err}))
        })
    })
});

app.delete('/delete-user/:id', function(req, res) {
    const _id = req.params.id;
    UserModel
    .findByIdAndDelete(_id)
    .then((data) => {
        console.log(data);
        res.json({data});
    });
})

app.put('/update-user/:id', function(req, res) {
    console.log("Update user");
    UserModel
    .findByIdAndUpdate(
        req.params.id,
        {
            $set: { firstName: req.body.firstName, email: req.body.email },
        },
        {
            new: true,
        },
        function(err, updateUser) {
            if(err) {
                res.send("Error updating user");
            }
            else{
                res.json(updateUser);
            }
        }
    )
})

//create cart
// create cart when add to cart or user login
app.post('/create-cart', function(req,res) {
    const userId = "615ee77596fadd70d45456a2";
    //const productId = "615f210d43300769147787a5";
    const cart = new CartModel({
        user: userId,
        products: []
        //products: {$push: [{productId}]}
    });
    cart
    .save()
    .then(data => {
        console.log(data);
        res.json(data);
    })
    .catch( err=> res.json({err}));
})

// show cart collection(requirement: particular cart for logged in user)
app.get('/cart', function(req,res) {
    CartModel
    .find()
    .populate('user')
    .then( data => res.json(data))
    .catch( err => res.json(err));
})

//update cart(push product to cart)
//1. get cart from userid, 2. add productid to cart
//(userid,productid) from frontend
app.put('/update-cart/:userId', function(req,res){
    const _id = req.params.userId;
    console.log("Add userId: ",_id);
    console.log(req.body);
    const productId = req.body._id;
    console.log("Add productId: ",productId)
    CartModel
    .findOneAndUpdate(
        {user: _id},
        {$push: {products: productId}},
        {$new: true}
    )
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

// delete product from cart
app.put('/deletefrom-cart/:cartId',function(req,res) {
    const cartId = req.params.cartId;
    const productId = '615f210d43300769147787a5'
    CartModel
    .findOneAndUpdate(
        {_id: cartId},
        {$pull: {'products': productId} },
        {new: true}
    )
    .then(data => res.json(data))
    .catch(err => res.json(err))
})


app.listen(PORT, function(){
    console.log( `starting at localhost http://localhost:${PORT}`);
})
