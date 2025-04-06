"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const streamerRoutes_1 = __importDefault(require("./routes/streamerRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const metadataRoutes_1 = __importDefault(require("./routes/metadataRoutes"));
const db_1 = require("./config/db");
const cors_1 = __importDefault(require("cors"));
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
// import xss from "xss-clean";
// import rateLimit from "express-rate-limit";
// import hpp from "hpp";
// import path from "path";
// import expressSanitizer from "express-sanitizer";
// Connect to DB
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
// Middleware
app.use(express_1.default.json());
// Connect to DB
// connectDB();
// User Routes
app.use("/user", userRoutes_1.default);
// Streamer Routes
app.use("/streamer", streamerRoutes_1.default);
// Metadata Routes
app.use("/metadata", metadataRoutes_1.default);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
