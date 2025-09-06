export default class WxCanvas {
    constructor(ctx: any, canvasId: any, isNew: any, canvasNode: any);
    ctx: any;
    canvasId: any;
    chart: any;
    isNew: any;
    canvasNode: any;
    getContext(contextType: any): any;
    setChart(chart: any): void;
    attachEvent(): void;
    detachEvent(): void;
    _initCanvas(zrender: any, ctx: any): void;
    _initStyle(ctx: any): void;
    _initEvent(): void;
    event: {} | undefined;
    set width(arg: any);
    get width(): any;
    set height(arg: any);
    get height(): any;
}
