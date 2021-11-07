import "express";
import { CartModel } from "../schemas/cart.schema.js";
import { OrderModel } from "../schemas/order.schema.js";
import { ProductModel } from "../schemas/product.schema.js";
export function createOrder(req, res, next) {
    console.log("order req: ", req.body);
    const new_order = new OrderModel({
        user: req.body.user,
        products: req.body.products,
        amount_paid: req.body.total_amount,
        itemCount: req.body.count
    });
    new_order
        .save()
        .then(data => {
        next();
        console.log("new_order created: ", data);
    })
        .catch(err => {
        console.log("Error creating new Order", err);
        res.json(err);
    });
}
export function decreaseQuantity(req, res, next) {
    ProductModel
        .updateMany(// use update many query to change quantity of products
    { _id: { $in: req.body.products } }, {
        $inc: { quantity: -1 },
    }, {
        new: true
    }, function (err, updateProduct) {
        if (err) {
            console.log("error decreasing quantity", err);
            res.send("Error updating product");
        }
        else {
            console.log("quantity decresed");
            next();
        }
    });
}
export function emptyCart(req, res, next) {
    CartModel
        .findOneAndUpdate({ user: req.body.user }, {
        $set: { products: [] }
    }, {
        new: true
    }, function (err, emptyCart) {
        if (err) {
            console.log("Error emptying cart", err);
            res.send("Error updating cart");
        }
        else {
            console.log("cart empty");
            res.json(emptyCart);
        }
    });
}
//# sourceMappingURL=order.middleware.js.map