"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcCanvas = exports.EChart = void 0;
var echart_1 = require("./echart");
Object.defineProperty(exports, "EChart", { enumerable: true, get: function () { return __importDefault(echart_1).default; } });
var ec_canvas_1 = require("./ec-canvas");
Object.defineProperty(exports, "EcCanvas", { enumerable: true, get: function () { return __importDefault(ec_canvas_1).default; } });
