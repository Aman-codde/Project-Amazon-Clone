
import express from 'express';
import cors from 'cors';
import { UserModel } from './schemas/user.schema.js'
import mongoose from 'mongoose';
import { ProductModel } from './schemas/product.schema.js';
import { CategoryModel } from './schemas/category.schema.js';

const app = express();
const PORT = 3501;

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
    const {name, email, username} = req.body;
    const user = new UserModel({
        name,
        username,
        email,
    });
    user
    .save()
    .then((data) => {
        res.json({data});
    })
    .catch(err => {
        res.status(501).json({errors: err});
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
            $set: { name: req.body.name, email: req.body.email },
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

app.listen(PORT, function(){
    console.log( `starting at localhost http://localhost:${PORT}`);
})
