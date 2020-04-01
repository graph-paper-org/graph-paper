module.exports = {
  moduleFileExtensions: ["js"],
  transform: {
    "^.+\\.(js)?$": "babel-jest",
    "^.+\\.svelte$": "jest-transform-svelte",
  },
  moduleDirectories: ["node_modules"],
};
