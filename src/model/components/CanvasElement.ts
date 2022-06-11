export enum CanvasElementType {
  Rectangle = 'rectangle',
  Ellipse = 'ellipse',
}

export class CanvasRectangle {
  type: 'rectangle' = 'rectangle'
  x = 0
  y = 0
  width = 10
  height = 10
}

export class CanvasEllipse {
  type: 'ellipse' = 'ellipse'
  cx = 0
  cy = 0
  rx = 10
  ry = 10
}
