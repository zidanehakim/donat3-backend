"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const streamerController_1 = require("../controllers/streamerController");
const router = express_1.default.Router();
router.post("/link", streamerController_1.linkStreamerPlatform);
router.post("/", streamerController_1.addWalletDisplayName);
router.post("/milestone", streamerController_1.addMilestoneAddress);
exports.default = router;
