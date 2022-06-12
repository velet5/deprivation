export enum CanvasElementType {
  Rectangle = 'rectangle',
  Ellipse = 'ellipse',
}

export class CanvasRectangle {
  type: 'rectangle' = 'rectangle'
  origX = 0
  origY = 0
  x = 0
  y = 0
  width = 1
  height = 1
}

export class CanvasEllipse {
  type: 'ellipse' = 'ellipse'
  origX = 0
  origY = 0
  cx = 0
  cy = 0
  rx = 1
  ry = 1
}
