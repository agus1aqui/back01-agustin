import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                require: true
            },
            quantity: Number,
            require: true
        }
    ]
})

const CartModel = mongoose.model("carts", cartSchema)

export default CartModel;