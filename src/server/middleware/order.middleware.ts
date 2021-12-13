import { NextFunction, Request, Response } from "express";
import { CartModel } from "../schemas/cart.schema.js";
import { OrderModel } from "../schemas/order.schema.js";
import { ProductModel } from "../schemas/product.schema.js";

export function createOrderAndDecreaseQuantity(req: Request,res: Response, next: NextFunction){
    console.log("order req: ",req.body);
    const new_order = new OrderModel({
        user: req.body.user,
        products: req.body.products,
        amount_paid: req.body.total_amount,
        itemCount: req.body.count
    });
    new_order
    .save()
    .then(data => {
        console.log("new_order created: ",data);
        // Step-2: Decrease quantity (which is bought/ ordered) from product model
        //fetch each product and selected quantity and update quantity in product model
        data.products.forEach(p => {
            ProductModel
            .findByIdAndUpdate(
                {
                    _id: p.product._id
                },
                {
                    $inc: {quantity: -p.selected_quantity}
                },
                {
                    new: true
                },
                function(err, updateProduct) {
                    if(err) {
                        console.log("error decreasing quantity", err);
                        res.send("Error updating product");
                        return;
                    }
                    else{
                        console.log("quantity decresed");
                        next();
                    }
                }
            )
        })  
    })
    .catch(err => {
        console.log("Error creating new Order", err);
        res.json(err);
        return;
    })
}
        
export function emptyCart(req: Request,res: Response, next: NextFunction){
    CartModel
    .findOneAndUpdate(
        {user: req.body.user},
        {
            $set: {products: []}
        },
        {
            new: true
        },
        function(err, emptyCart) {
            if(err) {
                console.log("Error emptying cart", err)
                res.send("Error updating cart");
            }
            else{
                console.log("cart empty");
                res.json(emptyCart);
            }
        }
    )
}


