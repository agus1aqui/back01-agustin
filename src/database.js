import mongoose from "mongoose";
import productsModel from "./dao/models/products.models.js";


const main = async () => {
    mongoose.connect("mongodb+srv://aquinoagustin463:han-solo@cluster0.ye1az.mongodb.net/e-commerce-01?retryWrites=true&w=majority&appName=Cluster0");
    const resultado = await productsModel.find();
    console.log(resultado)
}
main()