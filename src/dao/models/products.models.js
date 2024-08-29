import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    price: {
        type: Number,
        required: true, 
    },
    img: {
        type: String,
        unique: true, 
    },
    stock: {
        type: Number,
        default: 0, 
    },
    brand: {
        type: String,
    },
    category: {
        type: String,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
});


const productsModel = mongoose.model("products", productsSchema);

export default productsModel;
