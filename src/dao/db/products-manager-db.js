import productsModel from "../models/products.models.js"


class ProductManager {


    //add product
    async addProduct({ name, price, img, stock, brand, category, code }) {
        try {
            if (!name || !price || !img || !stock || !brand || !category || !code) {
                throw new Error('All fields are required')
                return;
            }
            const existingProduct = await productsModel.findOne({ code: code });
            if (existingProduct) {
                throw new Error('Product already exists')
                return;
            }
            const newProduct = new productsModel({ name, price, img, stock, brand, category, code, status: true });
            await newProduct.save();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }
    //get
    async getProducts() {
        try {
            const arrayProducts = await productsModel.find();
            return arrayProducts;
        } catch (error) {
            console.error("Error getting products:", error);
        }
    }
    //get by Id
    async getProductsByID(id) {
        try {
            const product = await productsModel.findById(id);
            if (!product) {
                throw new Error(`Product with ID ${id} not found`);
            }
            return product;
        } catch (error) {
            console.error("Error getting product by ID:", error);
        }
    }

    //update
    async updateProduct(id, updatedProduct) {
        try {
            const updated = await productsModel.findByIdAndUpdate(id, updatedProduct);
            if (!updated) {
                throw new Error(`Product with ID ${id} not found`);
            }
            return updated;
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }
    //delete
    async deleteProduct(id) {
        try {
            const deleted = await productsModel.findByIdAndDelete(id);
            if (!deleted) {
                throw new Error(`Product with ID ${id} not found`);
            }
            console.log("Product deleted successfully");
        } catch (error) {

        }
    }
}
export default ProductManager;