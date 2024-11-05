import { CanvasObject } from "../interface/object.interface";
import { Observer } from "../interface/observer.interface";
import { Subject } from "../interface/subject.interface";

export class Ground implements Subject, CanvasObject {
  private observers: Observer[] = [];
  public x: number;
  public y: number;
  public x1: number;
  public y1: number;
  public constructor(x: number, y: number, x1: number, y1: number) {
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
  }
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log("Subject: Observer has been attached already");
    }
    this.observers.push(observer);
  }
  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== 1) {
      return console.log("Subject: Nonexistent observer");
    }
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x1, this.y1);
    ctx.stroke();
    this.notify();
  }
}
