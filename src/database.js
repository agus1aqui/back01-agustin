import mongoose from "mongoose";
import productsModel from "./dao/models/products.models.js";
import CartModel from "./dao/models/cart.models.js";

const main = async () => {

    mongoose.connect("mongodb+srv://aquinoagustin463:han-solo@cluster0.ye1az.mongodb.net/e-commerce-01?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("Conectado a MongoDB"))
        .catch((error) => console.error("Error conectando a MongoDB", error));

    try {
        const ordens = await productsModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalProducts: { $sum: 1 }
                }
            },
            {
                $merge: {
                    into: "reports"
                }
            }
        ]);
        console.log(ordens);
    } catch (error) {
        console.error("Error in aggregation:", error);
    }

    try {
        const resultado = await CartModel.paginate({}, { limit: 4, page: 2 });
        console.log(resultado);
    } catch (error) {
        console.error("Error in pagination:", error);
    }
};


main();
