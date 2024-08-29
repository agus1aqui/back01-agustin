import fs from 'fs';

class ProductManager {
    static lastID = 0

    constructor(path) {
        this.path = path
        this.products = []
    }

    //add product
    async addProduct({ name, price, img, stock, brand, category, code }) {
        if (!name || !price || !img || !stock || !brand || !category || !code) {
            throw new Error('All fields are required')
            return;
        }
        if (this.products.some(item => item.code === code)) {
            throw new Error('Product already exists')
            return;
        }
        const newProduct = { id: ++ProductManager.lastID, name, price, img, stock, brand, category, code }
        this.products.push(newProduct);
        await this.saveProductsToFile(this.products);
    }
    //get
    async getProducts() {
        try {
            const arrayProducts = await this.readProductsFromFile(this.path);
            return arrayProducts;
        } catch (error) {
            console.error("Error getting products:", error);
        }
    }
    //get by Id
    async getProductsByID(id) {
        try {
            const arrayProducts = await this.readProductsFromFile();
            const wantedProduct = arrayProducts.find(item => item.id == id);
            if (!wantedProduct) {
                console.log("Product not found");
            }
        } catch (error) {
            console.error("Error getting product by ID:", error);
        }
    }
    //read file
    async readProductsFromFile() {
        const answer = await fs.promises.readFile(this.path, 'utf-8');
        const arrayProducts = JSON.parse(answer) || [];
        return arrayProducts;
    }
    //save products
    async saveProductsToFile(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }
    //update

    async updateProduct(id, updatedProduct) {
        try {
            const arrayProducts = await this.readProductsFromFile();
            const index = arrayProducts.findIndex(item => item.id == id);
            if (index === -1) {
                arrayProducts[index] = { ...arrayProducts[index], ...updatedProduct };
                await this.saveProductsToFile(arrayProducts);
                console.log("Product updated successfully");
            } else {
                console.log("Product not found");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }
    //delete
    async deleteProduct(id) {
        try {
            const arrayProducts = await this.readProductsFromFile();
            const index = arrayProducts.findIndex(item => item.id == id);

            if (index !== -1) {
                arrayProducts.splice(index, 1);
                await this.saveProductsToFile(arrayProducts);
                console.log("Product deleted successfully");
            } else {
                console.log("Product not found");
            }
        } catch (error) {

        }
    }
}
export default ProductManager;