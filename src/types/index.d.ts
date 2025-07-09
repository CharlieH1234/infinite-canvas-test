// Type definitions for the Infinite Canvas App

// Declare modules for packages that don't have type definitions
declare module '@shopify/react-native-skia' {
  const SkiaView: any;
  export { SkiaView };
  export default SkiaView;
}

declare module '@testing-library/jest-native/extend-expect';

// Declare Jest globals for TypeScript
declare global {
  const jest: any;
  const describe: (name: string, fn: () => void) => void;
  const it: (name: string, fn: () => void) => void;
  const test: (name: string, fn: () => void) => void;
  const expect: any;
  const beforeAll: (fn: () => void) => void;
  const afterAll: (fn: () => void) => void;
  const beforeEach: (fn: () => void) => void;
  const afterEach: (fn: () => void) => void;
  
  // For require in Jest mocks
  const require: (id: string) => any;
}

// This export is needed to make TypeScript treat this as a module
export {};
