import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true 
            },
            quantity: {
                type: Number,
                required: true,  
                min: [1, 'Quantity must be at least 1']  
            }
        }
    ]
});

cartSchema.plugin(mongoosePaginate);


const CartModel = mongoose.model("carts", cartSchema);

export default CartModel;
