/**
 * Image processing utility functions
 */

/**
 * Resize an image while maintaining aspect ratio
 */
export const resizeWithAspectRatio = (
  originalWidth: number,
  originalHeight: number,
  targetWidth: number,
  targetHeight: number
) => {
  const aspectRatio = originalWidth / originalHeight;
  
  let newWidth = targetWidth;
  let newHeight = targetWidth / aspectRatio;
  
  if (newHeight > targetHeight) {
    newHeight = targetHeight;
    newWidth = targetHeight * aspectRatio;
  }
  
  return { width: newWidth, height: newHeight };
};

/**
 * Get image dimensions from URI (for web)
 */
export const getImageDimensions = (uri: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = uri;
  });
};

/**
 * Apply basic image filters
 * @param imageData - ImageData object from canvas context
 * @param filters - Object containing filter values
 */
export const applyImageFilters = (
  imageData: ImageData,
  filters: {
    brightness?: number; // -100 to 100
    contrast?: number;   // -100 to 100
    saturation?: number; // -100 to 100
  }
): ImageData => {
  const { brightness = 0, contrast = 0, saturation = 0 } = filters;
  
  // Create a copy of the image data
  const result = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height
  );
  
  // Apply filters
  for (let i = 0; i < result.data.length; i += 4) {
    // Get RGB values
    let r = result.data[i];
    let g = result.data[i + 1];
    let b = result.data[i + 2];
    
    // Apply brightness
    if (brightness !== 0) {
      const brightnessFactor = 1 + brightness / 100;
      r *= brightnessFactor;
      g *= brightnessFactor;
      b *= brightnessFactor;
    }
    
    // Apply contrast
    if (contrast !== 0) {
      const contrastFactor = (1 + contrast / 100);
      const midpoint = 128;
      r = (r - midpoint) * contrastFactor + midpoint;
      g = (g - midpoint) * contrastFactor + midpoint;
      b = (b - midpoint) * contrastFactor + midpoint;
    }
    
    // Apply saturation
    if (saturation !== 0) {
      const saturationFactor = 1 + saturation / 100;
      const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
      r = gray + saturationFactor * (r - gray);
      g = gray + saturationFactor * (g - gray);
      b = gray + saturationFactor * (b - gray);
    }
    
    // Clamp values to valid range (0-255)
    result.data[i] = Math.max(0, Math.min(255, r));
    result.data[i + 1] = Math.max(0, Math.min(255, g));
    result.data[i + 2] = Math.max(0, Math.min(255, b));
  }
  
  return result;
};
