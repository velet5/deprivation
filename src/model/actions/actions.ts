export enum Drawing {
  Rectangle = 'rectanlge',
  Ellipse = 'ellipse',
}

export enum ActionType {
  Move = 'move',
}

export type Point = {
  x: number
  y: number
}

export type Moving = {
  origin: Point
  current: Point
}
