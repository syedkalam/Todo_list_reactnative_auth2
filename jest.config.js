module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(expo-local-authentication|expo-modules-core|@react-native|react-native|immer|@reduxjs/toolkit|redux|react-redux|nanoid)/)',
  ],
  moduleNameMapper: {
    '^expo-local-authentication$':
      '<rootDir>/__mocks__/expo-local-authentication.ts',
  },
};
