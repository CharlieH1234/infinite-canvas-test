import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useCanvasState } from '../../hooks/useCanvasState';
import ImagePickerButton from '../ImagePicker/ImagePickerButton';

interface ToolbarProps {
  onUndo?: () => void;
  onReset?: () => void;
  onExport?: () => void;
}

/**
 * Toolbar component with drawing tools and image management options
 */
const Toolbar: React.FC<ToolbarProps> = ({
  onUndo,
  onReset,
  onExport,
}) => {
  const { 
    selectedImageId, 
    setSelectedImageId, 
    removeImage, 
    bringToFront, 
    sendToBack 
  } = useCanvasState();

  const handleDeleteSelected = () => {
    if (selectedImageId) {
      removeImage(selectedImageId);
    }
  };

  const handleBringToFront = () => {
    if (selectedImageId) {
      bringToFront(selectedImageId);
    }
  };

  const handleSendToBack = () => {
    if (selectedImageId) {
      sendToBack(selectedImageId);
    }
  };

  const handleDeselectAll = () => {
    setSelectedImageId(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Drawing</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={onUndo}>
            <Text style={styles.buttonText}>Undo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Images</Text>
        <View style={styles.buttonGroup}>
          <ImagePickerButton />
        </View>
      </View>

      {selectedImageId && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Image</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={handleDeleteSelected}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleBringToFront}>
              <Text style={styles.buttonText}>Bring to Front</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSendToBack}>
              <Text style={styles.buttonText}>Send to Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDeselectAll}>
              <Text style={styles.buttonText}>Deselect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Canvas</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={onExport}>
            <Text style={styles.buttonText}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Toolbar;
