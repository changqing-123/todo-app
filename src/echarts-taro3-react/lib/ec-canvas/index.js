"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = __importDefault(require("@tarojs/taro"));
const react_1 = __importStar(require("react"));
const components_1 = require("@tarojs/components");
const wx_canvas_1 = __importDefault(require("./wx-canvas"));
const echarts = __importStar(require("./echarts"));
require("./index.css");
function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}
class EcCanvasTaro extends react_1.Component {
  constructor() {
    super(...arguments);
    this.touchStart = (e) => {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch("mousedown", {
          zrX: touch.x,
          zrY: touch.y,
        });
        handler.dispatch("mousemove", {
          zrX: touch.x,
          zrY: touch.y,
        });
        handler.processGesture(wrapTouch(e), "start");
      }
    };
    this.touchMove = (e) => {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch("mousemove", {
          zrX: touch.x,
          zrY: touch.y,
        });
        handler.processGesture(wrapTouch(e), "change");
      }
    };
    this.touchEnd = (e) => {
      if (this.chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        var handler = this.chart.getZr().handler;
        handler.dispatch("mouseup", {
          zrX: touch.x,
          zrY: touch.y,
        });
        handler.dispatch("click", {
          zrX: touch.x,
          zrY: touch.y,
        });
        handler.processGesture(wrapTouch(e), "end");
      }
    };
  }
  componentDidMount() {
    echarts.registerPreprocessor((option) => {
      if (option && option.series) {
        if (option.series.length > 0) {
          option.series.forEach((series) => {
            series.progressive = 0;
          });
        } else if (typeof option.series === "object") {
          option.series.progressive = 0;
        }
      }
    });
    if (!this.props.ec) {
      console.warn(
        '组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' +
          'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>'
      );
      return;
    }
    if (!this.props.ec.lazyLoad) {
      this.init();
    }
  }
  init(callback) {
    setTimeout(() => {
      this.initByNewWay(callback);
    }, 30);
  }
  initByNewWay(callback) {
    const query = taro_1.default.createSelectorQuery();
    const { ec, canvasId } = this.props;
    query
      .select(`.ec-canvas.${canvasId}`)
      .fields({
        node: true,
        size: true,
      })
      .exec((res) => {
        const canvasNode = res[0].node;
        this.canvasNode = canvasNode;
        const canvasDpr = taro_1.default.getSystemInfoSync().pixelRatio;
        const canvasWidth = res[0].width;
        const canvasHeight = res[0].height;
        const ctx = canvasNode.getContext("2d");
        const canvas = new wx_canvas_1.default(ctx, canvasId, true, canvasNode);
        echarts.setCanvasCreator(() => {
          return canvas;
        });
        if (typeof callback === "function") {
          this.chart = callback(canvas, canvasWidth, canvasHeight, canvasDpr);
        } else if (typeof ec.onInit === "function") {
          this.chart = ec.onInit(canvas, canvasWidth, canvasHeight, canvasDpr);
        }
      });
  }
  canvasToTempFilePath(opt) {
    const query = taro_1.default.createSelectorQuery().in(this);
    query
      .select(".ec-canvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvasNode = res[0].node;
        opt.canvas = canvasNode;
        taro_1.default.canvasToTempFilePath(opt);
      });
  }
  render() {
    const { canvasId } = this.props;
    return react_1.default.createElement(components_1.Canvas, {
      type: "2d",
      className: `ec-canvas ${canvasId}`,
      canvasId: canvasId,
      onTouchStart: this.touchStart,
      onTouchMove: this.touchMove,
      onTouchEnd: this.touchEnd,
    });
  }
}
exports.default = EcCanvasTaro;
