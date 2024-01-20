// eslint-disable-next-line no-undef
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@api": "./src/api",
          "@crons": "./src/crons",
          "@database": "./src/database",
          "@modules": "./src/modules",
          "@routes": "./src/routes",
          "@services": "./src/services",
          "@shared": "./src/shared",
          "@config": "./src/config",
          "@utils": "./src/utils",
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};
