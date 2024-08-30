import express from "express";
import { Router } from "express";
const router = Router();
import ProductsModel from "../dao/models/products.models.js";
const model = new ProductsModel();



router.get("/", async (req, res) => {
    const arrayProducts = await model.getProducts();
    res.send(arrayProducts);
})



router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const product = await model.getProductById(id);

        if (!product) {
            res.send('not found')
        } else {
            res.send(product);
        }
    } catch (error) {
        res.send(error);
    }
})



router.post("/", async (req, res) => {
    const newProduct = req.body;
    try {
        await model.addProduct(newProduct);
        res.status(201).send("new product");

    } catch (error) {
        res.status(500).send(error);
    }
})



export default router; 