import { CanvasObject } from "./object.interface";
import { Observer } from "./observer.interface";
export interface Subject extends CanvasObject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}
