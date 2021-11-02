import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { UserModel } from './schemas/user.schema.js';
import mongoose from 'mongoose';
import { ProductModel } from './schemas/product.schema.js';
import { CategoryModel } from './schemas/category.schema.js';
import { CartModel } from './schemas/cart.schema.js';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { authHandler } from './middleware/auth.middleware.js';
dotenv.config();
const access_secret = process.env.ACCESS_TOKEN_SECRET;
const app = express();
const PORT = process.env.PORT || 3000;
;
const saltRounds = 10;
const __dirname = path.resolve();
const clientPath = path.join(__dirname, '/dist/client');
//mongoose.connect('mongodb://localhost:27017/amazonCloneDB')
mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => {
    console.log('Connected to DB Successfully');
})
    .catch(err => console.log('Failed to Connect to DB', err));
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(clientPath));
// create/add new product
app.post('/api/create-product', function (req, res) {
    const new_product = new ProductModel(req.body);
    console.log("new product: ", new_product);
    new_product
        .save()
        .then(data => {
        console.log("Product created: ", { data });
        res.json({ data });
    })
        .catch(err => res.status(501).json({ error: err }));
});
//get all products using categories as query params
app.post('/api/products', function (req, res) {
    const query = {}; // fetch all products
    if (req.body.categories) {
        query.categories = { $in: [req.body.categories] };
    }
    if (req.body._id) {
        console.log("hi");
        query._id = req.body._id;
    }
    ProductModel
        .find(query)
        .then((data) => res.json({ data }))
        .catch(err => res.status(501).json(err));
});
function productsSort(direction) {
    return ProductModel
        .find()
        .sort({ price: direction });
}
//get all products with price low to high
app.get('/api/productsByPriceDesc', function (req, res) {
    productsSort(-1)
        .then(data => {
        console.log("sort by price: ", data);
        res.json({ data });
    });
});
//get all products with price high to low
app.get('/api/productsByPriceAsc', function (req, res) {
    productsSort(1)
        .then(data => {
        console.log("sort by price: ", data);
        res.json({ data });
    });
});
//get products by price(upto$10,$10-$20,$20 & above)
app.get('/api/productsByPriceChoice/:choice', function (req, res) {
    let choice = Number(req.params.choice);
    let query = {};
    switch (choice) {
        case 1:
            query = { price: { $gte: 1, $lte: 10 } };
            break;
        case 2:
            query = { price: { $gte: 10, $lte: 20 } };
            break;
        case 3:
            query = { price: { $gte: 20 } };
    }
    ProductModel
        .find(query)
        .sort({ price: 1 })
        .then(data => {
        console.log(`Price range from ${query}:  ${data}`);
        res.json({ data });
    })
        .catch(err => { err; });
});
// show particular product by id 
app.post('/api/product/:id', function (req, res) {
    console.log("ProductId: ", req.params.id);
    ProductModel
        .findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => {
        console.log("error in app post", err);
        res.status(501).json(err);
    });
});
//show category collection 
app.get('/api/categories', function (req, res) {
    CategoryModel
        .find()
        .populate({ path: 'parent_category',
        populate: [
            { path: 'parent_category',
                populate: [{ path: 'parent_category' }]
            }
        ] })
        .then(data => {
        res.json({ data });
    })
        .catch(err => res.status(501).json(err));
});
app.get('/api/users', function (req, res) {
    UserModel
        .find({}, '-password')
        .then(data => res.json({ data }))
        .catch(err => {
        res.status(501);
        res.json({ errors: err });
    });
});
// create new user and also assign a new cart to the person
app.post('/api/create-user', function (req, res) {
    const { firstName, lastName, email, password } = req.body;
    // generate salt string
    bcrypt.genSalt(saltRounds, function (err, salt) {
        console.log("Salt value = ", salt);
        // encrypted value using hash along with salt string
        bcrypt.hash(password, salt, function (err, hash) {
            console.log("Ecrypted/ hash password = ", hash);
            const new_user = new UserModel({
                firstName,
                lastName,
                email,
                password: hash
            });
            new_user
                .save()
                .then(data => res.json({ data }))
                .then(() => {
                const cart = new CartModel({
                    user: new_user._id,
                    products: []
                });
                cart
                    .save();
            })
                .catch(err => res.status(501).json({ err }));
        });
    });
});
app.delete('/api/delete-user/:id', function (req, res) {
    const _id = req.params.id;
    UserModel
        .findByIdAndDelete(_id)
        .then((data) => {
        console.log("Deleted user: ", data);
        res.json({ data });
    });
});
app.put('/api/update-user/:id', function (req, res) {
    console.log("Update user");
    UserModel
        .findByIdAndUpdate(req.params.id, {
        $set: { firstName: req.body.firstName, email: req.body.email },
    }, {
        new: true,
    }, function (err, updateUser) {
        if (err) {
            res.send("Error updating user");
        }
        else {
            res.json(updateUser);
        }
    });
});
//login
app.post('/api/login', function (req, res) {
    UserModel
        .findOne({ email: req.body.email })
        .then((user) => {
        // if no user found with given email
        if (!user) {
            console.log('Invalid Email');
            return res.sendStatus(500);
            ;
        }
        bcrypt.compare(req.body.password, `${user?.password}`, function (err, result) {
            // if password matches
            if (result) {
                const access_token = jwt.sign({ user }, access_secret); // generates json web token as a string
                res.cookie('jwt', access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
                res.json({ message: 'login route', user, access_token });
                //res.json({user})
            }
            // if password does NOT matches
            else {
                console.log("Invalid password");
                res.sendStatus(403);
            }
        });
    })
        .catch((err) => {
        return res.sendStatus(404);
    });
});
// check login
app.post('/api/check-login', authHandler, function (req, res) {
    res.json({ message: 'yes' });
});
app.get('/api/logout', function (req, res) {
    res.cookie('jwt', '', { httpOnly: true, maxAge: 0 });
});
// show cart collection(requirement: particular cart for logged in user)
app.get('/api/cart', authHandler, function (req, res) {
    const loggedUser = req.user;
    console.log("logged user:", loggedUser._id);
    const userId = loggedUser._id;
    CartModel
        .findOne({ user: userId }, "count total_amount")
        .populate('user', 'firstName email')
        .populate('products', '-categories')
        .then(data => {
        console.log("Cart: ", data);
        res.json(data);
    })
        .catch(err => res.json(err));
});
//update cart(push product to cart)
//1. get cart from userid, 2. add productid to cart
// productid from frontend, userid from auth.middleware
app.put('/api/update-cart', authHandler, function (req, res) {
    const loggedUser = req.user;
    const productId = req.body._id;
    CartModel
        .findOneAndUpdate({ user: loggedUser._id }, { $push: { products: productId } }, { new: true }, function (err, updateCart) {
        if (err) {
            res.send("Error updating user: ");
        }
        else {
            res.json(updateCart);
        }
    });
});
// delete product from cart
app.put('/api/delete-from-cart/:productId', authHandler, function (req, res) {
    const loggedUser = req.user;
    const productId = req.params.productId;
    CartModel
        .findOneAndUpdate({ user: loggedUser._id }, { $pull: { 'products': productId } }, { new: true })
        .then(data => res.json({ data }))
        .catch(err => res.json(err));
});
app.all("/api/*", function (req, res) {
    res.sendStatus(404);
});
app.get('*', function (req, res) {
    const filePath = path.join(__dirname, '/dist/client/index.html');
    console.log(filePath);
    res.sendFile(filePath);
});
app.listen(PORT, function () {
    console.log(`starting at localhost http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map