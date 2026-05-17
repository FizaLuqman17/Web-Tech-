// ================================================
// server.js — Havenly Express + EJS Application
// ================================================

// ── Express Setup ────────────────────────────────
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;
mongoose.connect("mongodb://sp24bcs038_db_user:Fiza12345@ac-rmzc9nu-shard-00-00.rrc7fpq.mongodb.net:27017,ac-rmzc9nu-shard-00-01.rrc7fpq.mongodb.net:27017,ac-rmzc9nu-shard-00-02.rrc7fpq.mongodb.net:27017/havenlyDB?ssl=true&replicaSet=atlas-uw4sqk-shard-0&authSource=admin&appName=Cluster0")
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((error) => {
    console.log("MongoDB Connection Error:", error);
});

// ── EJS Setup ────────────────────────────────────
// Set EJS as the templating engine
app.set("view engine", "ejs");
// Tell Express where to find the view templates
app.set("views", path.join(__dirname, "views"));

// ── Static Public Folder ─────────────────────────
// Serve static files (CSS, JS, images) from the public directory
app.use(express.static(path.join(__dirname, "public")));

// ── Homepage Route ────────────────────────────────
// Render the index.ejs template when the root URL is visited
app.get("/", (req, res) => {
    res.render("homepage");
});

// ── Products Route (Assignment 3) ─────────────────
// Dynamic product catalog: pagination, search, filter, sort
const productsRoute = require("./routes/products");
app.use("/products", productsRoute);

// ── Server Start ──────────────────────────────────
// Start the server and listen on PORT 3000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
