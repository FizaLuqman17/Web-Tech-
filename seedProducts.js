// ================================================
// seedProducts.js — Seed MongoDB with sample products
// ------------------------------------------------
// Run with:  node seedProducts.js
// ================================================

const mongoose = require("mongoose");
const Product = require("./models/Product");

// Same MongoDB Atlas connection string as server.js
const MONGO_URI = "mongodb://sp24bcs038_db_user:Fiza12345@ac-rmzc9nu-shard-00-00.rrc7fpq.mongodb.net:27017,ac-rmzc9nu-shard-00-01.rrc7fpq.mongodb.net:27017,ac-rmzc9nu-shard-00-02.rrc7fpq.mongodb.net:27017/havenlyDB?ssl=true&replicaSet=atlas-uw4sqk-shard-0&authSource=admin&appName=Cluster0";

// Sample products (using images that already exist in /public/images)
const sampleProducts = [
    // ── Sofas ─────────────────────────────────────
    { name: "Alfred Velvet Sofa",      price: 320000, category: "Sofas",    rating: 4.8, stock: 12, image: "/images/sofa-alfred.jpg" },
    { name: "Al Fresco Linen Sofa",    price: 380000, category: "Sofas",    rating: 4.7, stock: 8,  image: "/images/sofa-alfresco.jfif" },
    { name: "Classic Leather Sofa",    price: 295000, category: "Sofas",    rating: 4.5, stock: 15, image: "/images/sofa.jpg" },
    { name: "Modern Lounge Sofa",      price: 250000, category: "Sofas",    rating: 4.3, stock: 20, image: "/images/sofa.jpg" },
    { name: "Premium Sectional Sofa",  price: 450000, category: "Sofas",    rating: 4.9, stock: 5,  image: "/images/sofa-alfred.jpg" },

    // ── Chairs ────────────────────────────────────
    { name: "Wooden Accent Chair",     price: 110000, category: "Chairs",   rating: 4.6, stock: 25, image: "/images/wooden accent chair.jfif" },
    { name: "Industrial Accent Chair", price: 125000, category: "Chairs",   rating: 4.4, stock: 18, image: "/images/industrial accent chair.jfif" },
    { name: "Calgary Accent Chair",    price: 145000, category: "Chairs",   rating: 4.7, stock: 14, image: "/images/calgary-accent-chair.jfif" },
    { name: "Elegant Dining Chair",    price: 45000,  category: "Chairs",   rating: 4.2, stock: 40, image: "/images/chair.jpg" },
    { name: "Luxury Armchair",         price: 165000, category: "Chairs",   rating: 4.8, stock: 10, image: "/images/chair.jpg" },

    // ── Tables ────────────────────────────────────
    { name: "Marble Coffee Table",     price: 95000,  category: "Tables",   rating: 4.6, stock: 22, image: "/images/coffee-table.jpg" },
    { name: "Oak Dining Table",        price: 185000, category: "Tables",   rating: 4.7, stock: 9,  image: "/images/coffee-table.jpg" },
    { name: "Rustic Side Table",       price: 38000,  category: "Tables",   rating: 4.1, stock: 35, image: "/images/coffee-table.jpg" },
    { name: "Glass Top Coffee Table",  price: 72000,  category: "Tables",   rating: 4.3, stock: 17, image: "/images/coffee-table.jpg" },

    // ── Beds ──────────────────────────────────────
    { name: "King Size Wooden Bed",    price: 275000, category: "Beds",     rating: 4.8, stock: 7,  image: "/images/bed.jpg" },
    { name: "Queen Upholstered Bed",   price: 220000, category: "Beds",     rating: 4.6, stock: 11, image: "/images/bed.jpg" },
    { name: "Minimalist Platform Bed", price: 185000, category: "Beds",     rating: 4.4, stock: 13, image: "/images/bed.jpg" },
    { name: "Royal Canopy Bed",        price: 420000, category: "Beds",     rating: 4.9, stock: 4,  image: "/images/bed.jpg" },

    // ── Consoles ──────────────────────────────────
    { name: "Hover Sideboard",         price: 345000, category: "Consoles", rating: 4.8, stock: 6,  image: "/images/sideboard-hovered.jfif" },
    { name: "Classic Wooden Console",  price: 155000, category: "Consoles", rating: 4.5, stock: 16, image: "/images/console.jpg" },
    { name: "Modern Entryway Console", price: 125000, category: "Consoles", rating: 4.3, stock: 19, image: "/images/console.jpg" },
    { name: "Vintage TV Console",      price: 195000, category: "Consoles", rating: 4.6, stock: 8,  image: "/images/console.jpg" },

    // ── Storage ───────────────────────────────────
    { name: "Tall Wooden Bookshelf",   price: 88000,  category: "Storage",  rating: 4.4, stock: 21, image: "/images/console.jpg" },
    { name: "6-Drawer Dresser",        price: 175000, category: "Storage",  rating: 4.7, stock: 9,  image: "/images/sideboard-hovered.jfif" },
    { name: "Bedroom Wardrobe",        price: 235000, category: "Storage",  rating: 4.5, stock: 7,  image: "/images/console.jpg" },
    { name: "Compact Storage Cabinet", price: 65000,  category: "Storage",  rating: 4.2, stock: 28, image: "/images/console.jpg" }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected for Seeding");

        // Remove all existing products
        await Product.deleteMany({});
        console.log("Existing products removed");

        // Insert the sample products
        const inserted = await Product.insertMany(sampleProducts);
        console.log(`Inserted ${inserted.length} sample products`);

    } catch (error) {
        console.log("Seeding Error:", error);
    } finally {
        // Close the connection so the script can exit cleanly
        await mongoose.connection.close();
        console.log("Database connection closed");
    }
}

seedDatabase();
