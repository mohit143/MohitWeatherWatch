
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
    '\\.(js|jsx|ts|tsx)$': 'babel-jest', // Ensure Babel handles JS/TS files
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons)/)',
  ],
};