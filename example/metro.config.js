const path = require("path");

const escape = require("escape-string-regexp");
const { getDefaultConfig } = require("expo/metro-config");
const exclusionList =
  require("metro-config/private/defaults/exclusionList").default;

const pack = require("../package.json");

const root = path.resolve(__dirname, "..");
const peerModules = Object.keys(pack.peerDependencies || {});

const config = getDefaultConfig(__dirname);

config.watchFolders = [root];

// Prevent Metro from loading root node_modules copies of peerDependencies
config.resolver.blockList = exclusionList(
  peerModules.map(
    (m) => new RegExp(`^${escape(path.join(root, "node_modules", m))}\\/.*$`),
  ),
);

// Map peer dependencies and your library package to example/node_modules
config.resolver.extraNodeModules = {
  ...peerModules.reduce((acc, name) => {
    acc[name] = path.join(__dirname, "node_modules", name);
    return acc;
  }, {}),
  [pack.name]: root,
};

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(root, "node_modules"),
];

module.exports = config;
