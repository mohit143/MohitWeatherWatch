// module.exports = {
//   presets: [
//     'module:metro-react-native-babel-preset',
//     '@babel/preset-env',
//     '@babel/preset-react',
//   ],
//   plugins: [
//     ['@babel/plugin-transform-class-properties', { loose: true }],
//     ['@babel/plugin-transform-private-methods', { loose: true }],
//     ['@babel/plugin-transform-private-property-in-object', { loose: true }],
//     'nativewind/babel',
//     [
//       'module-resolver',
//       {
//         root: ['./src'],
//         alias: {
//           tests: './tests/',
//           '@': './src/',
//         },
//       },
//     ],
//   ]
// };
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          tests: './tests/',
          '@': './src/',
        },
      },
    ],
  ]
};