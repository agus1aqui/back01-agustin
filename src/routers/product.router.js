import express from "express";
import { Router } from "express";
const router = Router();
import ProductManager from "../dao/db/products-manager-db.js";
const productManager = new ProductManager();

//aux
const readProductsFromFile = async () => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading file:", error);
        return [];
    }
};


const writeProductsToFile = async (products) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    } catch (error) {
        console.error("Error writing file:", error);
    }
};




router.get('/', async (req, res) => {
    const arrayProducts = await productManager.getProducts();
    res.send(arrayProducts);
})
router.get('/:pid', async (req, res) => {
    let id = req.params.pid;
    try {
        const product = await productManager.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
    }
})
router.post("/", async (req, res) => {
    const newProduct = req.body;
    const products = await readProductsFromFile();
    products.push(newProduct);
    await writeProductsToFile(products);
    res.send({ status: "success", message: "New product added" });
});
router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, price } = req.body;
    const products = await readProductsFromFile();
    const indice = products.findIndex((product) => product.id === id);

    if (indice !== -1) {
        products[indice].name = name;
        products[indice].price = price;
        await writeProductsToFile(products);
        res.send({ status: "success", message: "Updated product" });
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});
router.delete("/:pid", async (req, res) => {
    const pid = Number(req.params.pid);
    const products = await readProductsFromFile();
    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        await writeProductsToFile(products);
        res.json({ status: "success", message: "Product removed" });
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

export default router;