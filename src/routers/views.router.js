import express from "express";
import { Router } from "express";
const router = Router();
import ProductsModel from "../dao/models/products.models.js";

router.get('/', (req, res) => {
    res.render('index');
});


router.get('/products', async (req, res) => {
    try {
        const products = await ProductsModel.find();  
        res.render('index', { products });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await ProductsModel.find();  
        res.render('realtimeproducts', { products });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
