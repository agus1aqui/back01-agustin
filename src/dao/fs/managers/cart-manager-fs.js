import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.lastID = o;
        this.loadCarts();
    }

    //load
    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);

            if (this.carts.legth > 0) {
                this.lastID = Math.max(...this.carts.map(cart => cart.id));
            }
        } catch (error) {
            console.error("Error loading carts:", error);
            await this.loadCarts();
        }
    }
    //save
    async saveCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }
    //create
    async createCart() {
        const newCart = {
            id: ++this.lastID,
            products: []
        };
        this.carts.push(newCart);
        await this.saveCarts();
        return newCart;
    }
    //return id
    async getCartById(id) {
        try {
            const cart = this.carts.find(cart => cart.id === id);
            if (!cart) {
                throw new Error(`Cart with ID ${id} not found`);
            }
            return cart
        } catch (error) {
            console.error("Error getting cart by ID:", error);
        }
    }
    //add product to cart
    async addProductToCart(cartId, productId, quantity = 1) {
        const cart = await this.getCartById(cartId);
        const existingProduct = cart.products.find(p => p.id === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ id: productId, quantity });
        }
        await this.saveCarts();
        return cart;
    }
}

export default CartManager;