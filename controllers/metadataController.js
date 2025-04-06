"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIDByAddress = exports.getOneStreamerMetadata = exports.getStreamersMetadata = exports.addMetadata = exports.checkAddressLinked = void 0;
const metadataModel_1 = __importDefault(require("../models/metadataModel"));
const checkAddressLinked = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { public_address } = req.body;
    console.log("checkAddressLinked", req.body);
    if (!public_address) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        // Check if the user already exists
        const existingUser = yield metadataModel_1.default.findOne({ public_address });
        if (existingUser) {
            console.error("User already exists:", existingUser);
            res.status(200).json({ exist: true });
            return;
        }
        else {
            res.status(200).json({ exist: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.checkAddressLinked = checkAddressLinked;
const addMetadata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, public_address, name, subscribers, image, viewers, description } = req.body;
    console.log("addMetadata", req.body);
    if (!id ||
        !public_address ||
        !name ||
        !subscribers ||
        !image ||
        !viewers ||
        !description) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        // Check if the user already exists
        const existingUser = yield metadataModel_1.default.findOne({ public_address });
        if (existingUser) {
            console.error("User already exists:", existingUser);
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Create a new user
        const user = yield metadataModel_1.default.create({
            _id: id,
            public_address,
            name,
            subscribers,
            image,
            viewers,
            description,
        });
        res.status(200).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addMetadata = addMetadata;
const getStreamersMetadata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, searchQuery } = req.body;
    console.log("getStreamers", req.body);
    if (!amount) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const streamers = yield metadataModel_1.default
            .find({
            name: { $regex: searchQuery, $options: "i" },
        })
            .limit(amount);
        res.status(200).json({
            message: "Streamers fetched successfully",
            streamers,
        });
    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getStreamersMetadata = getStreamersMetadata;
const getOneStreamerMetadata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log("getOneStreamer", req.body);
    if (!id) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const streamer = yield metadataModel_1.default.findOne({
            _id: id,
        });
        res.status(200).json({
            message: "Streamer fetched successfully",
            streamer,
        });
    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getOneStreamerMetadata = getOneStreamerMetadata;
const getIDByAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { public_address } = req.body;
    console.log("getIDByAddress", req.body);
    if (!public_address) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const streamer = yield metadataModel_1.default.findOne({
            public_address,
        });
        res.status(200).json({
            message: "Streamer fetched successfully",
            id: streamer === null || streamer === void 0 ? void 0 : streamer._id,
        });
    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getIDByAddress = getIDByAddress;
