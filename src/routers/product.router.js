import express from "express";
import { Router } from "express";
const router = Router();
import ProductsModel from "../dao/models/products.models.js";
import CartModel from "../dao/models/cart.models.js";


router.get("/", async (req, res) => {
    let page = 2; 
    let limit = 4;

    try {
        const productList = await ProductsModel.paginate({}, { limit, page });
        const result = productList.docs.map(product => {  
            const { _id, ...rest } = product.toObject();  
            return { id: _id, ...rest }; 
        });

        res.render("products", {
            products: result,
            hasNextPage: productList.hasNextPage,
            hasPrevPage: productList.hasPrevPage,
            nextPage: productList.nextPage,
            prevPage: productList.prevPage,
            currentPage: productList.page,
            totalPages: productList.totalPages
        });
    } catch (error) {
        res.status(500).send("Error getting products");
    }
});

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const product = await ProductsModel.findById(id); 
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.send(product);
    } catch (error) {
        res.status(500).send("Error getting product");
    }
});

router.post("/", async (req, res) => {
    const newProduct = req.body;
    try {
        await ProductsModel.create(newProduct);
        res.status(201).send("New product added");
    } catch (error) {
        res.status(500).send("Error adding product");
    }
});

export default router;
