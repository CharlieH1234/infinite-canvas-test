// This file is run before each test file
import '@testing-library/jest-native/extend-expect';

// Make TypeScript recognize Jest globals
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      expect: typeof import('@jest/globals').expect;
      jest: typeof import('@jest/globals').jest;
      describe: typeof import('@jest/globals').describe;
      it: typeof import('@jest/globals').it;
      test: typeof import('@jest/globals').test;
      beforeAll: typeof import('@jest/globals').beforeAll;
      afterAll: typeof import('@jest/globals').afterAll;
      beforeEach: typeof import('@jest/globals').beforeEach;
      afterEach: typeof import('@jest/globals').afterEach;
    }
  }
}
