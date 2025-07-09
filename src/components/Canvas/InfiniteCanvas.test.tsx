import React from 'react';
import { render } from '@testing-library/react-native';
import InfiniteCanvas from './InfiniteCanvas';
import { jest } from '@jest/globals';

// Mock the useCanvasState hook
jest.mock('../../hooks/useCanvasState', () => ({
  useCanvasState: () => ({
    canvasRef: { current: null },
    strokeColor: '#000000',
    strokeWidth: 2,
    setStrokeColor: jest.fn(),
    setStrokeWidth: jest.fn(),
    images: [],
    selectedImageId: null,
    setSelectedImageId: jest.fn(),
    addImage: jest.fn(),
    updateImage: jest.fn(),
    removeImage: jest.fn(),
    bringToFront: jest.fn(),
    sendToBack: jest.fn(),
  }),
}));

// Mock the FreeCanvas component from react-native-free-canvas
jest.mock('../../../lib/src', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: (props: any) => <View {...props} testID="free-canvas" />,
  };
});

describe('InfiniteCanvas', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<InfiniteCanvas />);
    expect(getByTestId('free-canvas')).toBeTruthy();
  });
});
