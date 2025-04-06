"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const metadataController_1 = require("../controllers/metadataController");
const router = express_1.default.Router();
router.post("/check", metadataController_1.checkAddressLinked);
router.post("/add", metadataController_1.addMetadata);
router.post("/get", metadataController_1.getStreamersMetadata);
router.post("/get_one", metadataController_1.getOneStreamerMetadata);
router.post("/get_id_by_address", metadataController_1.getIDByAddress);
exports.default = router;
