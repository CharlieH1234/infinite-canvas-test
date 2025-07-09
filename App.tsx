import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InfiniteCanvas from './src/components/Canvas/InfiniteCanvas';
import CanvasControls from './src/components/Canvas/CanvasControls';
import Toolbar from './src/components/Toolbar/Toolbar';
import LayerPanel from './src/components/LayerPanel/LayerPanel';
import { useCanvasState } from './src/hooks/useCanvasState';

/**
 * Main App component for the Infinite Canvas application
 */
const App: React.FC = () => {
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
    <GestureHandlerRootView style={styles.container}>
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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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

export default App;
