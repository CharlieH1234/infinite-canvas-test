import React from 'react';
import { StyleSheet } from 'react-native';
import FreeCanvas from '../../../lib/src';
import { useCanvasState } from '../../hooks/useCanvasState';

/**
 * InfiniteCanvas component that extends the base FreeCanvas with additional functionality
 * for image management and other enhanced features.
 */
const InfiniteCanvas: React.FC = () => {
  const { canvasRef } = useCanvasState();

  return (
    <FreeCanvas
      ref={canvasRef}
      style={styles.canvas}
      strokeColor="#000000"
      strokeWidth={2}
      backgroundColor="#FFFFFF"
      zoomable={true}
      zoomRange={[0.25, 5]}
    />
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
});

export default InfiniteCanvas;
