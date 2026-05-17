// ================================================
// routes/products.js — Dynamic Product Catalog Route
// ================================================

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /products
// Supports: search, category, minPrice, maxPrice, sort, page
router.get("/", async (req, res) => {
    try {
        // ── Read query params ───────────────────
        const search   = req.query.search   || "";
        const category = req.query.category || "";
        const minPrice = req.query.minPrice || "";
        const maxPrice = req.query.maxPrice || "";
        const sort     = req.query.sort     || "";

        // ── Build the Mongoose query object ─────
        const query = {};

        // Search by name (case-insensitive)
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // ── Sorting ─────────────────────────────
        let sortOption = {};
        if (sort === "priceAsc")    sortOption.price  = 1;
        if (sort === "priceDesc")   sortOption.price  = -1;
        if (sort === "ratingDesc")  sortOption.rating = -1;

        // ── Pagination ──────────────────────────
        const limit = 8;
        const page  = parseInt(req.query.page) || 1;
        const skip  = (page - 1) * limit;

        // Count total matching documents (for total pages)
        const totalProducts = await Product.countDocuments(query);
        const totalPages    = Math.ceil(totalProducts / limit);

        // Fetch the products for the current page
        const products = await Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        // ── Render the EJS view ─────────────────
        res.render("products", {
            products,
            currentPage: page,
            totalPages,
            totalProducts,
            search,
            category,
            minPrice,
            maxPrice,
            sort
        });
    } catch (error) {
        console.log("Products Route Error:", error);
        res.status(500).send("Server Error while loading products");
    }
});

module.exports = router;
