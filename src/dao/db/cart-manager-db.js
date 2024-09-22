import CartModel from "../models/cart.models.js";

class CartManager {
 
    async createCart() {
        try {
            const newCart = new CartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error("Error creating cart:", error);
            throw error; 
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId);

            if (!cart) {
                throw new Error(`Cart with ID ${cartId} not found`); 
            }
            return cart;
        } catch (error) {
            console.error("Error getting cart by ID:", error);
            throw error; 
        }
    }

  
    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId);
            const existingProduct = cart.products.find(item => item.product.toString() === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            await cart.save(); 
            return cart;
        } catch (error) {
            console.error("Error adding product to cart:", error);
            throw error; 
        }
    }
}

export default CartManager;
