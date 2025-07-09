import '@testing-library/jest-native/extend-expect';

// This file contains global type declarations for Jest
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveTextContent: (expected: string | RegExp) => R;
      toBeVisible: () => R;
      toBeDisabled: () => R;
      toHaveProp: (propName: string, propValue?: any) => R;
      toHaveStyle: (style: object) => R;
    }
  }
}
