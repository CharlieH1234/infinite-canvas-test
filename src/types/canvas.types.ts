/**
 * Type definitions for the Infinite Canvas App
 */

// Canvas Image Props
export interface CanvasImageProps {
  uri: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  opacity?: number;
  selected?: boolean;
  zIndex?: number;
  id: string;
}

// Canvas Element Types
export enum CanvasElementType {
  IMAGE = 'image',
  DRAWING = 'drawing',
  CONNECTOR = 'connector',
  GROUP = 'group',
}

// Canvas Element Base Interface
export interface CanvasElementBase {
  id: string;
  type: CanvasElementType;
  x: number;
  y: number;
  zIndex: number;
  selected?: boolean;
}

// Canvas Image Element
export interface CanvasImageElement extends CanvasElementBase {
  type: CanvasElementType.IMAGE;
  uri: string;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}

// Canvas Drawing Element
export interface CanvasDrawingElement extends CanvasElementBase {
  type: CanvasElementType.DRAWING;
  paths: any[]; // Using the DrawnPath type from FreeCanvas
  strokeColor: string;
  strokeWidth: number;
}

// Canvas Connector Element
export interface CanvasConnectorElement extends CanvasElementBase {
  type: CanvasElementType.CONNECTOR;
  sourceId: string;
  targetId: string;
  controlPoints: { x: number; y: number }[];
  strokeColor: string;
  strokeWidth: number;
  strokeDash?: number[];
}

// Canvas Group Element
export interface CanvasGroupElement extends CanvasElementBase {
  type: CanvasElementType.GROUP;
  elementIds: string[];
  width: number;
  height: number;
}

// Union type for all canvas elements
export type CanvasElement = 
  | CanvasImageElement 
  | CanvasDrawingElement 
  | CanvasConnectorElement 
  | CanvasGroupElement;

// Canvas State
export interface CanvasState {
  elements: CanvasElement[];
  selectedElementIds: string[];
  canvasOffset: { x: number; y: number };
  scale: number;
}

// Canvas Action Types
export enum CanvasActionType {
  ADD_ELEMENT = 'ADD_ELEMENT',
  UPDATE_ELEMENT = 'UPDATE_ELEMENT',
  DELETE_ELEMENT = 'DELETE_ELEMENT',
  SELECT_ELEMENT = 'SELECT_ELEMENT',
  DESELECT_ALL = 'DESELECT_ALL',
  MOVE_ELEMENT = 'MOVE_ELEMENT',
  RESIZE_ELEMENT = 'RESIZE_ELEMENT',
  GROUP_ELEMENTS = 'GROUP_ELEMENTS',
  UNGROUP_ELEMENTS = 'UNGROUP_ELEMENTS',
  BRING_TO_FRONT = 'BRING_TO_FRONT',
  SEND_TO_BACK = 'SEND_TO_BACK',
  SET_CANVAS_OFFSET = 'SET_CANVAS_OFFSET',
  SET_CANVAS_SCALE = 'SET_CANVAS_SCALE',
}
