import React from 'react';
import { Image as SkiaImage, useImage } from '@shopify/react-native-skia';
import { CanvasImageProps } from '../../types/canvas.types';

/**
 * CanvasImage component for rendering images on the canvas
 * This component will be used to display images on the infinite canvas
 */
const CanvasImage: React.FC<CanvasImageProps> = ({ 
  uri, 
  x, 
  y, 
  width, 
  height, 
  selected 
}) => {
  const image = useImage(uri);

  if (!image) {
    return null;
  }

  return (
    <SkiaImage
      image={image}
      x={x}
      y={y}
      width={width}
      height={height}
      fit="contain"
    />
  );
};

export default CanvasImage;
