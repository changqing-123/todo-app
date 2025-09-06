"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
// import { View, Input } from "@tarojs/components";
const echarts = __importStar(require("../ec-canvas/echarts"));
const ec_canvas_1 = __importDefault(require("../ec-canvas"));
class BaseChart extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            ec: {
                lazyLoad: true,
            },
        };
        this.refresh = (data) => {
            this.Chart.init((canvas, width, height, canvasDpr) => {
                const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: canvasDpr,
                });
                canvas.setChart(chart);
                chart.setOption(data);
                chart.on("click", (params) => {
                    if (typeof this.props.onClick === "function") {
                        this.props.onClick(params);
                    }
                });
                chart.on("dblclick", (params) => {
                    if (typeof this.props.onDblclick === "function") {
                        this.props.onDblclick(params);
                    }
                });
                chart.on("mousewheel", (params) => {
                    if (typeof this.props.onMousewheel === "function") {
                        this.props.onMousewheel(params);
                    }
                });
                chart.on("mouseout", (params) => {
                    if (typeof this.props.onMouseout === "function") {
                        this.props.onMouseout(params);
                    }
                });
                chart.on("mouseup", (params) => {
                    if (typeof this.props.onMouseup === "function") {
                        this.props.onMouseup(params);
                    }
                });
                chart.on("mousedown", (params) => {
                    if (typeof this.props.onMousedown === "function") {
                        this.props.onMousedown(params);
                    }
                });
                chart.on("mousemove", (params) => {
                    if (typeof this.props.onMousemove === "function") {
                        this.props.onMousemove(params);
                    }
                });
                return chart;
            });
        };
        this.refChart = (node) => (this.Chart = node);
    }
    render() {
        const { canvasId } = this.props;
        return (react_1.default.createElement(ec_canvas_1.default, { ref: this.refChart, canvasId: canvasId, ec: this.state.ec }));
    }
}
exports.default = BaseChart;
