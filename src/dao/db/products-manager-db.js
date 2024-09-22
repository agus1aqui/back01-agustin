import ProductsModel from "../models/products.models.js";

class ProductManager {

    // add product
    async addProduct({ name, price, img, stock, brand, category, code }) {
        try {
            if (!name || !price || !img || !stock || !brand || !category || !code) {
                throw new Error('All fields are required');
            }
            const existingProduct = await ProductsModel.findOne({ code });
            if (existingProduct) {
                throw new Error('Product already exists');
            }
            const newProduct = new ProductsModel({ name, price, img, stock, brand, category, code, status: true });
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    }

    // get all
    async getProducts() {
        try {
            const arrayProducts = await ProductsModel.find();
            return arrayProducts;
        } catch (error) {
            console.error("Error getting products:", error);
            throw error;
        }
    }

    // getbyID
    async getProductsByID(id) {
        try {
            const product = await ProductsModel.findById(id);
            if (!product) {
                throw new Error(`Product with ID ${id} not found`);
            }
            return product;
        } catch (error) {
            console.error("Error getting product by ID:", error);
            throw error;
        }
    }

    // update product
    async updateProduct(id, updatedProduct) {
        try {
            if (!updatedProduct || Object.keys(updatedProduct).length === 0) {
                throw new Error('No fields to update');
            }
            const updated = await ProductsModel.findByIdAndUpdate(id, updatedProduct, { new: true });
            if (!updated) {
                throw new Error(`Product with ID ${id} not found`);
            }
            return updated;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    }

    // delete product
    async deleteProduct(id) {
        try {
            const deleted = await ProductsModel.findByIdAndDelete(id);
            if (!deleted) {
                throw new Error(`Product with ID ${id} not found`);
            }
            console.log("Product deleted successfully");
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }
}

export default ProductManager;
