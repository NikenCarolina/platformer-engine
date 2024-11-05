import { CanvasObject } from "./object.interface";
import { Subject } from "./subject.interface";
export interface Observer extends CanvasObject {
  update(subject: Subject): void;
}
