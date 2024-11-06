import { CanvasObject } from "../interface/object.interface";
import { Observer } from "../interface/observer.interface";
import { Subject } from "../interface/subject.interface";
import { Cursor } from "./cursor.class";
import { Ground } from "./ground.class";

export class Player implements Observer, CanvasObject {
  private ctxfillStyle: string;

  public x: number;
  public y: number;
  private width: number;
  private height: number;

  public xVelocity = 0;
  public yVelocity = 0;
  public gravity = 0.98;
  public yAcceleration: number = this.gravity;
  public jumpVelocity = -15;
  public moveVelocity = 2;

  public constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctxfillStyle = "red";
  }
  public update(subject: Subject): void {
    if (subject instanceof Cursor) {
      if (this.isHovered(subject.x, subject.y)) this.ctxfillStyle = "green";
      if (!this.isHovered(subject.x, subject.y)) this.ctxfillStyle = "red";
    }
    if (subject instanceof Ground) {
      if (
        this.y + this.height >= subject.y &&
        this.x + this.width >= subject.x &&
        this.x <= subject.x1
      ) {
        if (this.yVelocity > 0 && this.y - subject.y <= subject.threshold) {
          this.yVelocity = 0;
          this.y = subject.y - this.height;
        }
      } else {
        this.yAcceleration = this.gravity;
      }
    }
  }
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.ctxfillStyle;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.x = this.x + this.xVelocity;
    this.y = this.y + this.yVelocity;
    this.yVelocity = this.yVelocity + this.yAcceleration;
  }
  public isHovered(mouseX: number, mouseY: number): boolean {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }
  public jump() {
    if (this.yVelocity != 0) return;
    this.yVelocity = this.jumpVelocity;
  }
  public moveLeft() {
    this.xVelocity = -this.moveVelocity;
  }
  public moveRight() {
    this.xVelocity = this.moveVelocity;
  }
  public stopX() {
    this.xVelocity = 0;
  }
}
