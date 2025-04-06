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
exports.addWalletDisplayName = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const addWalletDisplayName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { public_address, display_name } = req.body;
    console.log("addWalletDisplayName", public_address, display_name);
    if (!public_address || !display_name) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        // Check if the user already exists
        const existingUser = yield userModel_1.default.findOne({ public_address });
        if (existingUser) {
            console.error("User already exists:", existingUser);
            res.status(400).json({ message: "Public address already exists" });
            return;
        }
        // Create a new user
        const user = yield userModel_1.default.create({
            display_name,
            public_address,
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
exports.addWalletDisplayName = addWalletDisplayName;
