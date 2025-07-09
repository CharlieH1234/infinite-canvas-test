/**
 * Helper functions for canvas operations
 */

/**
 * Generate a unique ID for canvas elements
 */
export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Calculate the distance between two points
 */
export const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

/**
 * Check if a point is inside a rectangle
 */
export const isPointInRect = (
  pointX: number,
  pointY: number,
  rectX: number,
  rectY: number,
  rectWidth: number,
  rectHeight: number
): boolean => {
  return (
    pointX >= rectX &&
    pointX <= rectX + rectWidth &&
    pointY >= rectY &&
    pointY <= rectY + rectHeight
  );
};

/**
 * Calculate the bounding box for a group of elements
 */
export const calculateBoundingBox = (
  elements: Array<{ x: number; y: number; width: number; height: number }>
) => {
  if (elements.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  elements.forEach((element) => {
    minX = Math.min(minX, element.x);
    minY = Math.min(minY, element.y);
    maxX = Math.max(maxX, element.x + element.width);
    maxY = Math.max(maxY, element.y + element.height);
  });

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

/**
 * Convert canvas coordinates to screen coordinates
 */
export const canvasToScreenCoords = (
  canvasX: number,
  canvasY: number,
  offsetX: number,
  offsetY: number,
  scale: number
) => {
  return {
    x: canvasX * scale + offsetX,
    y: canvasY * scale + offsetY,
  };
};

/**
 * Convert screen coordinates to canvas coordinates
 */
export const screenToCanvasCoords = (
  screenX: number,
  screenY: number,
  offsetX: number,
  offsetY: number,
  scale: number
) => {
  return {
    x: (screenX - offsetX) / scale,
    y: (screenY - offsetY) / scale,
  };
};
