import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { useCanvasStore, CanvasImage } from './useCanvasState';
import { generateUniqueId } from '../utils/canvasHelpers';

export const useImageManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addImage } = useCanvasStore();

  /**
   * Request permissions for accessing the media library
   */
  const requestMediaLibraryPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
        return false;
      }
    }
    return true;
  };

  /**
   * Request permissions for accessing the camera
   */
  const requestCameraPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return false;
      }
    }
    return true;
  };

  /**
   * Pick an image from the device's media library
   */
  const pickImageFromLibrary = async (canvasX = 0, canvasY = 0) => {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) return;

    setIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        
        // Add the image to the canvas
        addImageToCanvas(selectedAsset.uri, canvasX, canvasY);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Take a photo using the device's camera
   */
  const takePhoto = async (canvasX = 0, canvasY = 0) => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    setIsLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        
        // Add the image to the canvas
        addImageToCanvas(selectedAsset.uri, canvasX, canvasY);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      alert('Failed to take photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle file upload for web platform
   */
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, canvasX = 0, canvasY = 0) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit. Please choose a smaller file.');
        return;
      }

      // Check file type
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('Only JPEG, PNG, and WebP formats are supported.');
        return;
      }

      setIsLoading(true);
      try {
        const fileUrl = URL.createObjectURL(file);
        
        // Add the image to the canvas
        addImageToCanvas(fileUrl, canvasX, canvasY);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  /**
   * Add an image to the canvas
   */
  const addImageToCanvas = (uri: string, x: number, y: number) => {
    const newImage: CanvasImage = {
      id: generateUniqueId(),
      uri,
      x,
      y,
      width: 200, // Default width
      height: 200, // Default height
      rotation: 0,
      opacity: 1,
      zIndex: Date.now(), // Use timestamp for initial z-index
    };
    
    addImage(newImage);
  };

  return {
    isLoading,
    pickImageFromLibrary,
    takePhoto,
    handleFileUpload,
  };
};
