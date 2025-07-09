import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useCanvasState } from '../../hooks/useCanvasState';

/**
 * CanvasControls component for providing control buttons for the canvas
 * such as undo, reset, zoom controls, etc.
 */
const CanvasControls: React.FC = () => {
  const { canvasRef } = useCanvasState();

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleReset = () => {
    canvasRef.current?.reset();
  };

  const handleResetZoom = () => {
    canvasRef.current?.resetZoom(300); // 300ms animation
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleUndo}>
        <Text style={styles.buttonText}>Undo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleResetZoom}>
        <Text style={styles.buttonText}>Reset Zoom</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CanvasControls;
