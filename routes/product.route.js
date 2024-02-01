const { Router } = require("express")
const { displayproduct, Product, Products, dproduct, all, Cart, deletepro, pro_cart, displaycartpage, addqty, payment, deleteallpro } = require("../controller/product.controll");
const Auth = require("../middlewear/isauth");


const prorut = Router()

prorut.get("/create", Auth, displayproduct);

prorut.post("/create", Auth, Product);

prorut.get("/products", Auth, Products);

prorut.get("/", dproduct);
 
prorut.get("/all", all);

prorut.post("/cart/:id", Auth, Cart);

prorut.delete("/delete/:id", Auth, deletepro);

prorut.get("/cartdata", Auth, pro_cart);

prorut.get("/cart", Auth, displaycartpage);

prorut.patch("/cart/update/:id", Auth, addqty);

prorut.post("/payment", Auth, payment);

prorut.delete("/deleteAll/:id", deleteallpro)

module.exports = prorut