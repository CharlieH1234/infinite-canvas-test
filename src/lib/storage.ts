import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { CanvasState } from '../types/canvas.types';

// Storage keys
const CANVAS_STATE_KEY = 'infinite_canvas_state';
const AUTH_TOKEN_KEY = 'infinite_canvas_auth_token';

/**
 * Save canvas state to local storage
 */
export const saveCanvasState = async (canvasId: string, state: CanvasState): Promise<void> => {
  try {
    const key = `${CANVAS_STATE_KEY}_${canvasId}`;
    const jsonValue = JSON.stringify(state);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving canvas state:', error);
    throw new Error('Failed to save canvas state');
  }
};

/**
 * Load canvas state from local storage
 */
export const loadCanvasState = async (canvasId: string): Promise<CanvasState | null> => {
  try {
    const key = `${CANVAS_STATE_KEY}_${canvasId}`;
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading canvas state:', error);
    return null;
  }
};

/**
 * Delete canvas state from local storage
 */
export const deleteCanvasState = async (canvasId: string): Promise<void> => {
  try {
    const key = `${CANVAS_STATE_KEY}_${canvasId}`;
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error deleting canvas state:', error);
    throw new Error('Failed to delete canvas state');
  }
};

/**
 * List all saved canvas IDs
 */
export const listSavedCanvasIds = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys
      .filter(key => key.startsWith(CANVAS_STATE_KEY))
      .map(key => key.replace(`${CANVAS_STATE_KEY}_`, ''));
  } catch (error) {
    console.error('Error listing saved canvas IDs:', error);
    return [];
  }
};

/**
 * Save auth token securely
 */
export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      // For web, use localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      // For native platforms, use SecureStore
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    }
  } catch (error) {
    console.error('Error saving auth token:', error);
    throw new Error('Failed to save auth token');
  }
};

/**
 * Get auth token
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    if (Platform.OS === 'web') {
      // For web, use localStorage
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } else {
      // For native platforms, use SecureStore
      return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Delete auth token
 */
export const deleteAuthToken = async (): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      // For web, use localStorage
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } else {
      // For native platforms, use SecureStore
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    }
  } catch (error) {
    console.error('Error deleting auth token:', error);
    throw new Error('Failed to delete auth token');
  }
};
