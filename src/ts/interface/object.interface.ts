export interface CanvasObject {
  x: number;
  y: number;
  draw(ctx: CanvasRenderingContext2D): void;
  isHovered?: (mouseX: number, mouseY: number) => boolean;
}
