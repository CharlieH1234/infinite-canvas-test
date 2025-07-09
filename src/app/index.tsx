import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import InfiniteCanvas from '../components/Canvas/InfiniteCanvas';
import CanvasControls from '../components/Canvas/CanvasControls';
import Toolbar from '../components/Toolbar/Toolbar';
import LayerPanel from '../components/LayerPanel/LayerPanel';
import { useCanvasState } from '../hooks/useCanvasState';
import { Platform } from 'react-native';

/**
 * Main screen for the Infinite Canvas application
 */
export default function HomeScreen() {
  const { canvasRef } = useCanvasState();

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleReset = () => {
    canvasRef.current?.reset();
  };

  const handleExport = async () => {
    try {
      const base64Image = await canvasRef.current?.toBase64();
      if (base64Image) {
        // For web, we can create a download link
        if (Platform.OS === 'web') {
          const link = document.createElement('a');
          link.href = base64Image;
          link.download = `infinite-canvas-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          // For mobile, we would use Expo MediaLibrary to save the image
          // This will be implemented in Phase 1
          console.log('Export functionality for mobile will be implemented in Phase 1');
        }
      }
    } catch (error) {
      console.error('Error exporting canvas:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Toolbar 
        onUndo={handleUndo}
        onReset={handleReset}
        onExport={handleExport}
      />
      <View style={styles.contentContainer}>
        <View style={styles.canvasContainer}>
          <InfiniteCanvas />
          <CanvasControls />
        </View>
        {Platform.OS === 'web' && (
          <LayerPanel />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  canvasContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
