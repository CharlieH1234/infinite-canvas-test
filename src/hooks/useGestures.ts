import { useRef } from 'react';
import { Gesture, GestureStateChangeEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { useCanvasState, CanvasImage } from './useCanvasState';
import { screenToCanvasCoords } from '../utils/canvasHelpers';

/**
 * Hook for handling gestures on canvas elements
 */
export const useGestures = () => {
  const { 
    images, 
    selectedImageId, 
    setSelectedImageId, 
    updateImage 
  } = useCanvasState();
  
  // Refs to track gesture state
  const startPositionRef = useRef({ x: 0, y: 0 });
  const startImagePositionRef = useRef({ x: 0, y: 0 });
  const startImageSizeRef = useRef({ width: 0, height: 0 });
  
  /**
   * Find the topmost image at the given coordinates
   */
  const findImageAtPosition = (x: number, y: number, canvasOffset: { x: number, y: number }, scale: number) => {
    // Convert screen coordinates to canvas coordinates
    const canvasCoords = screenToCanvasCoords(x, y, canvasOffset.x, canvasOffset.y, scale);
    
    // Find all images that contain this point
    const matchingImages = images.filter(img => 
      canvasCoords.x >= img.x && 
      canvasCoords.x <= img.x + img.width &&
      canvasCoords.y >= img.y && 
      canvasCoords.y <= img.y + img.height
    );
    
    // Return the topmost image (highest z-index)
    if (matchingImages.length > 0) {
      return matchingImages.reduce((highest, current) => 
        current.zIndex > highest.zIndex ? current : highest
      );
    }
    
    return null;
  };
  
  /**
   * Tap gesture for selecting images
   */
  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onStart(({ x, y, absoluteX, absoluteY }) => {
      // Get canvas offset and scale from the canvas ref
      const canvasOffset = { x: 0, y: 0 }; // This should come from the canvas
      const scale = 1; // This should come from the canvas
      
      const image = findImageAtPosition(x, y, canvasOffset, scale);
      
      if (image) {
        setSelectedImageId(image.id);
      } else {
        setSelectedImageId(null);
      }
    });
  
  /**
   * Pan gesture for moving selected images
   */
  const panGesture = Gesture.Pan()
    .onStart(({ x, y }) => {
      if (!selectedImageId) return;
      
      const selectedImage = images.find(img => img.id === selectedImageId);
      if (!selectedImage) return;
      
      // Store the starting position of the gesture and image
      startPositionRef.current = { x, y };
      startImagePositionRef.current = { x: selectedImage.x, y: selectedImage.y };
    })
    .onUpdate(({ translationX, translationY }) => {
      if (!selectedImageId) return;
      
      // Calculate new position
      const newX = startImagePositionRef.current.x + translationX;
      const newY = startImagePositionRef.current.y + translationY;
      
      // Update the image position
      updateImage(selectedImageId, { x: newX, y: newY });
    });
  
  /**
   * Pinch gesture for resizing selected images
   */
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      if (!selectedImageId) return;
      
      const selectedImage = images.find(img => img.id === selectedImageId);
      if (!selectedImage) return;
      
      // Store the starting size of the image
      startImageSizeRef.current = { 
        width: selectedImage.width, 
        height: selectedImage.height 
      };
    })
    .onUpdate(({ scale }) => {
      if (!selectedImageId) return;
      
      // Calculate new dimensions while maintaining aspect ratio
      const newWidth = startImageSizeRef.current.width * scale;
      const newHeight = startImageSizeRef.current.height * scale;
      
      // Update the image size
      updateImage(selectedImageId, { 
        width: newWidth, 
        height: newHeight 
      });
    });
  
  /**
   * Rotation gesture for rotating selected images
   * This would be implemented in Phase 2
   */
  const rotationGesture = Gesture.Rotation()
    .onUpdate(({ rotation }) => {
      if (!selectedImageId) return;
      
      // Update the image rotation
      // This would be implemented in Phase 2
    });
  
  /**
   * Compose all gestures together
   */
  const composedGestures = Gesture.Exclusive(
    tapGesture,
    Gesture.Simultaneous(
      panGesture,
      Gesture.Simultaneous(
        pinchGesture,
        rotationGesture
      )
    )
  );
  
  return {
    composedGestures,
    findImageAtPosition,
  };
};
