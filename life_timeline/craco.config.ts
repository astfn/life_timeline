import _patch from "path";
const resolve = (path: string) => _patch.resolve(__dirname, path);

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
    },
  },
};
