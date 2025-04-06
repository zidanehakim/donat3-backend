import express from "express";
import streamerRoutes from "./routes/streamerRoutes";
import userRoutes from "./routes/userRoutes";
import metadataRoutes from "./routes/metadataRoutes";
import { connectDB } from "./config/db";

import cors from "cors";

// Connect to DB
connectDB();

const app = express();

app.use(
  cors({
    origin: "https://donat3-frontend-7i8p.vercel.app", // or '*' to allow all
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Middleware
app.use(express.json());

// Connect to DB
// connectDB();

// User Routes
app.use("/user", userRoutes);
// Streamer Routes
app.use("/streamer", streamerRoutes);
// Metadata Routes
app.use("/metadata", metadataRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
