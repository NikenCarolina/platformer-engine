import { Observer } from "../interface/observer.interface";
import { Subject } from "../interface/subject.interface";

export class Cursor implements Subject {
  private observers: Observer[] = [];
  public x: number;
  public y: number;
  public constructor() {
    this.x = 0;
    this.y = 0;
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
  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.notify();
  }
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x - 5, this.y - 5, 10, 10);
  }
}
