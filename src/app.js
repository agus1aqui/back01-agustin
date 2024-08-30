import mongoose from "mongoose"
//import productsModel from "./models/products.models.js"
import express from "express";
import { engine } from "express-handlebars";
const app = express();
const PUERTO = 8080;
import "./database.js"
// import cartRouter from "./routers/cart.router.js"
import productRouter from "./routers/product.router.js"
import viewsRouter from "./routers/views.router.js"




//managers
import ProductManager from "./dao/db/products-manager-db.js";
const manager = new ProductManager();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//handle-bars
import exphbs from "express-handlebars"
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//rutas
app.use("/", viewsRouter)
app.use('/api', productRouter)


//listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`)
})

//socket
import http from 'http';
import { Server } from 'socket.io';
const io = new Server(http.createServer(app));

io.on('connection', (socket) => {
    console.log('Usuario conectado');


    socket.on('newProduct', async (product) => {
        await manager.addProduct(product);
        const updatedProducts = await manager.getProducts();
        io.emit('updateProducts', updatedProducts);
    });


    socket.on('deleteProduct', async (productId) => {
        await manager.deleteProduct(productId);
        const updatedProducts = await manager.getProducts();
        io.emit('updateProducts', updatedProducts);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});





