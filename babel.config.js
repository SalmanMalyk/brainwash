module.exports = {
  presets: [
    [
      "@vue/app",
      {
        "polyfills": ["es7.object.entries", "es6.promise"]
      }
    ],
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
  ]
};
