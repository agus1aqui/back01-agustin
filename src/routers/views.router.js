import express from "express";
import { Router } from "express";
const router = Router();
import ProductManager from "../dao/db/products-manager-db.js";
const productManager = new ProductManager();


router.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
})

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', { products });
})

export default router;
