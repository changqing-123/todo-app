import { Component } from "react";
import { ECObj } from "../ec-canvas";
interface BaseChartState {
    ec: ECObj;
}
interface BaseChartProps {
    canvasId: string;
    onClick?: (params: unknown) => void;
    onDblclick?: (params: unknown) => void;
    onMousewheel?: (params: unknown) => void;
    onMouseout?: (params: unknown) => void;
    onMouseup?: (params: unknown) => void;
    onMousemove?: (params: unknown) => void;
    onMousedown?: (params: unknown) => void;
}
declare class BaseChart extends Component<BaseChartProps, BaseChartState> {
    state: {
        ec: {
            lazyLoad: boolean;
        };
    };
    Chart: any;
    refresh: (data: any) => void;
    refChart: (node: any) => any;
    render(): JSX.Element;
}
export default BaseChart;
