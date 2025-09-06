import { Component } from "react";
import "./index.css";
export interface EcCanvasState {}
export interface ECObj {
  onInit?(canvas: any, width: any, height: any, dpr: any): void;
  lazyLoad?: boolean;
}
export interface EcCanvasProps {
  canvasId: string;
  ec: ECObj;
}
interface EcCanvasTaro {
  canvasNode: any;
  chart: any;
}
declare class EcCanvasTaro extends Component<EcCanvasProps, EcCanvasState> {
  componentDidMount(): void;
  init(callback?: any): void;
  initByNewWay(callback?: any): void;
  canvasToTempFilePath(opt: any): void;
  touchStart: (e: any) => void;
  touchMove: (e: any) => void;
  touchEnd: (e: any) => void;
  render(): JSX.Element;
}
export default EcCanvasTaro;
