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
exports.addMilestoneAddress = exports.addWalletDisplayName = exports.linkStreamerPlatform = void 0;
const metadataModel_1 = __importDefault(require("../models/metadataModel"));
const streamerModel_1 = __importDefault(require("../models/streamerModel"));
const linkStreamerPlatform = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, public_address, platform, name, streamername, url, subscribers, image, } = req.body;
    console.log("linkStreamerPlatform", id, public_address, platform, name, streamername, url, subscribers, image);
    if (!id ||
        !public_address ||
        !platform ||
        !name ||
        !streamername ||
        !url ||
        !subscribers ||
        !image) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        // Check if the metadata of platform already exists
        const existingMetadata = yield metadataModel_1.default.findOne({ _id: id, platform });
        if (existingMetadata) {
            console.error("Metadata already exists:", existingMetadata);
            res.status(400).json({ message: "Metadata already exists" });
            return;
        }
        // Create a new metadata entry
        const metadata = yield metadataModel_1.default.create({
            _id: id,
            public_address,
            platform,
            name,
            streamername,
            url,
            subscribers,
            image,
        });
        // Check if a streamer record exists for this public_address
        let streamer = yield streamerModel_1.default.findOne({ public_address });
        // If no streamer record exists, create one
        if (!streamer) {
            streamer = yield streamerModel_1.default.create({
                display_name: streamername, // Use streamername as the display name
                public_address,
            });
            console.log("Created new streamer record:", streamer);
        }
        res.status(200).json({
            message: "Metadata created and linked to streamer successfully",
            metadata,
            streamer,
        });
    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.linkStreamerPlatform = linkStreamerPlatform;
const addWalletDisplayName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { public_address, display_name } = req.body;
    console.log("addWalletDisplayName", public_address, display_name);
    if (!public_address || !display_name) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        // Check if the streamer already exists
        const existingstreamer = yield streamerModel_1.default.findOne({ public_address });
        if (existingstreamer) {
            console.error("streamer already exists:", existingstreamer);
            res.status(400).json({ message: "Public address already exists" });
            return;
        }
        // Create a new streamer
        const streamer = yield streamerModel_1.default.create({
            display_name,
            public_address,
        });
        res.status(200).json({
            message: "streamer created successfully",
            streamer,
        });
    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addWalletDisplayName = addWalletDisplayName;
const addMilestoneAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { public_address, milestone_address } = req.body;
    console.log("addMilestoneAddress", public_address, milestone_address);
    if (!public_address || !milestone_address) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        // Check if the streamer already exists
        const existingstreamer = yield streamerModel_1.default.findOne({ public_address });
        if (!existingstreamer) {
            console.error("streamer does not exist:", existingstreamer);
            res.status(400).json({ message: "Public address does not exist" });
            return;
        }
        // Update the streamer with the milestone address
        const updatedStreamer = yield streamerModel_1.default.findOneAndUpdate({ public_address }, { milestone_address }, { new: true });
        res.status(200).json({
            message: "Milestone address added successfully",
            updatedStreamer,
        });
    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addMilestoneAddress = addMilestoneAddress;
