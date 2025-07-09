import { useRef } from 'react';
import { create } from 'zustand';
import { FreeCanvasRef } from '../../lib/src/types';

interface CanvasState {
  selectedImageId: string | null;
  images: CanvasImage[];
  setSelectedImageId: (id: string | null) => void;
  addImage: (image: CanvasImage) => void;
  updateImage: (id: string, updates: Partial<CanvasImage>) => void;
  removeImage: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
}

export interface CanvasImage {
  id: string;
  uri: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  zIndex: number;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  selectedImageId: null,
  images: [],
  
  setSelectedImageId: (id) => set({ selectedImageId: id }),
  
  addImage: (image) => set((state) => ({ 
    images: [...state.images, image] 
  })),
  
  updateImage: (id, updates) => set((state) => ({
    images: state.images.map((img) => 
      img.id === id ? { ...img, ...updates } : img
    ),
  })),
  
  removeImage: (id) => set((state) => ({
    images: state.images.filter((img) => img.id !== id),
    selectedImageId: state.selectedImageId === id ? null : state.selectedImageId,
  })),
  
  bringToFront: (id) => set((state) => {
    const maxZIndex = Math.max(...state.images.map((img) => img.zIndex), 0);
    return {
      images: state.images.map((img) => 
        img.id === id ? { ...img, zIndex: maxZIndex + 1 } : img
      ),
    };
  }),
  
  sendToBack: (id) => set((state) => {
    const minZIndex = Math.min(...state.images.map((img) => img.zIndex), 0);
    return {
      images: state.images.map((img) => 
        img.id === id ? { ...img, zIndex: minZIndex - 1 } : img
      ),
    };
  }),
}));

export const useCanvasState = () => {
  const canvasRef = useRef<FreeCanvasRef>(null);
  const canvasStore = useCanvasStore();
  
  return {
    canvasRef,
    ...canvasStore,
  };
};
