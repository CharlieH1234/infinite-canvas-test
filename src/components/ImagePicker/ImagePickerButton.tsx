import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useImageManager } from '../../hooks/useImageManager';

interface ImagePickerButtonProps {
  onImageSelected?: () => void;
  canvasX?: number;
  canvasY?: number;
}

/**
 * Cross-platform image picker button component
 */
const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({
  onImageSelected,
  canvasX = 0,
  canvasY = 0,
}) => {
  const { pickImageFromLibrary, takePhoto, handleFileUpload, isLoading } = useImageManager();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePickImage = async () => {
    await pickImageFromLibrary(canvasX, canvasY);
    onImageSelected?.();
  };

  const handleTakePhoto = async () => {
    await takePhoto(canvasX, canvasY);
    onImageSelected?.();
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event, canvasX, canvasY);
    onImageSelected?.();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Web-specific file input
  const renderWebInput = () => {
    if (Platform.OS === 'web') {
      return (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <>
          {renderWebInput()}
          <TouchableOpacity
            style={styles.button}
            onPress={triggerFileInput}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePickImage}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Choose from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleTakePhoto}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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

export default ImagePickerButton;
