import mongoose from "mongoose"
//import productsModel from "./models/products.models.js"
import express from "express";
import { engine } from "express-handlebars";
const app = express();
const PUERTO = 8080;
import "./database.js"


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//handle-bars
app.engine("handlebars", engine());
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//rutas
app.get("/", (req, res) => {
    res.render("index")
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`)
})




