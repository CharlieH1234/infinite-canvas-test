import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCanvasState, CanvasImage } from '../../hooks/useCanvasState';

/**
 * LayerPanel component for managing the z-index ordering of canvas elements
 */
const LayerPanel: React.FC = () => {
  const { 
    images, 
    selectedImageId, 
    setSelectedImageId, 
    bringToFront, 
    sendToBack 
  } = useCanvasState();

  // Sort images by z-index (highest first)
  const sortedImages = [...images].sort((a, b) => b.zIndex - a.zIndex);

  const handleSelectImage = (id: string) => {
    setSelectedImageId(id);
  };

  const handleMoveUp = (id: string) => {
    bringToFront(id);
  };

  const handleMoveDown = (id: string) => {
    sendToBack(id);
  };

  // Get a shortened version of the image URI for display
  const getImageLabel = (image: CanvasImage) => {
    const uri = image.uri;
    if (uri.startsWith('file://')) {
      return `Image ${image.id.substring(0, 4)}`;
    }
    
    // For web URLs, try to get the filename
    try {
      const url = new URL(uri);
      const pathParts = url.pathname.split('/');
      const filename = pathParts[pathParts.length - 1];
      return filename || `Image ${image.id.substring(0, 4)}`;
    } catch (e) {
      return `Image ${image.id.substring(0, 4)}`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Layers</Text>
      <ScrollView style={styles.scrollContainer}>
        {sortedImages.length === 0 ? (
          <Text style={styles.emptyText}>No layers yet</Text>
        ) : (
          sortedImages.map((image) => (
            <View 
              key={image.id} 
              style={[
                styles.layerItem, 
                selectedImageId === image.id && styles.selectedLayer
              ]}
            >
              <TouchableOpacity 
                style={styles.layerContent}
                onPress={() => handleSelectImage(image.id)}
              >
                <Text 
                  style={[
                    styles.layerText,
                    selectedImageId === image.id && styles.selectedLayerText
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="middle"
                >
                  {getImageLabel(image)}
                </Text>
              </TouchableOpacity>
              
              <View style={styles.layerControls}>
                <TouchableOpacity 
                  style={styles.layerButton}
                  onPress={() => handleMoveUp(image.id)}
                >
                  <Text style={styles.layerButtonText}>↑</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.layerButton}
                  onPress={() => handleMoveDown(image.id)}
                >
                  <Text style={styles.layerButtonText}>↓</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: '#f0f0f0',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  layerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedLayer: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
  },
  layerContent: {
    flex: 1,
  },
  layerText: {
    fontSize: 12,
  },
  selectedLayerText: {
    fontWeight: 'bold',
  },
  layerControls: {
    flexDirection: 'row',
  },
  layerButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
  },
  layerButtonText: {
    fontSize: 12,
  },
});

export default LayerPanel;
