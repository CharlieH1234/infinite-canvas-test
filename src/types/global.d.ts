// This file contains global type declarations for Jest and testing libraries
import '@testing-library/jest-native/extend-expect';

declare global {
  // Declare Jest globals to fix TypeScript errors
  const jest: typeof import('@jest/globals').jest;
  const describe: typeof import('@jest/globals').describe;
  const it: typeof import('@jest/globals').it;
  const test: typeof import('@jest/globals').test;
  const expect: typeof import('@jest/globals').expect;
  const beforeAll: typeof import('@jest/globals').beforeAll;
  const afterAll: typeof import('@jest/globals').afterAll;
  const beforeEach: typeof import('@jest/globals').beforeEach;
  const afterEach: typeof import('@jest/globals').afterEach;
}

// This export is needed to make TypeScript treat this as a module
export {};
