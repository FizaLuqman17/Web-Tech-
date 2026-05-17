// ================================================
// server.js — Havenly Express + EJS Application
// ================================================

// ── Express Setup ────────────────────────────────
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

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

// ── Server Start ──────────────────────────────────
// Start the server and listen on PORT 3000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
