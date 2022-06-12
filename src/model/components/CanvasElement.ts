export enum CanvasElementType {
  Rectangle = 'rectangle',
  Ellipse = 'ellipse',
}

export class CanvasRectangle {
  type: 'rectangle' = 'rectangle'
  origX: number
  origY: number
  x = 0
  y = 0
  width = 1
  height = 1

  constructor(params: { x: number; y: number; width: number; height: number }) {
    this.origX = params.x
    this.origY = params.y
    this.x = params.x
    this.y = params.y
    this.width = params.width
    this.height = params.height
  }

  contains(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height
  }

  translate(dx: number, dy: number): void {
    this.x = this.origX + dx
    this.y = this.origY + dy
  }

  reposition() {
    this.origX = this.x
    this.origY = this.y
  }
}

export class CanvasEllipse {
  type: 'ellipse' = 'ellipse'
  origX: number
  origY: number
  cx: number
  cy: number
  rx: number
  ry: number

  constructor(params: { x: number; y: number; width: number; height: number }) {
    this.origX = params.x
    this.origY = params.y
    this.cx = params.x
    this.cy = params.y
    this.rx = params.width
    this.ry = params.height
  }

  contains(x: number, y: number): boolean {
    const dx = x - this.cx
    const dy = y - this.cy
    return (dx * dx) / (this.rx * this.rx) + (dy * dy) / (this.ry * this.ry) <= 1
  }

  translate(dx: number, dy: number): void {
    this.cx = this.origX + dx
    this.cy = this.origY + dy
  }

  reposition() {
    this.origX = this.cx
    this.origY = this.cy
  }
}
