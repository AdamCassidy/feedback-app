var PrerenderSpaPlugin = require("prerender-spa-plugin");
var path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: () => {
    if (process.env.NODE_ENV !== "production") return;
    return {
      output: {
        crossOriginLoading: "anonymous",
      },
      plugins: [
        new PrerenderSpaPlugin(
          // Absolute path to compiled SPA
          path.resolve(__dirname, "dist"),
          // List of routes to prerender
          ["/", "/about", "/homeProjects", "/sports", "/cooking", "/automotive"]
        ),
      ],
    };
  },
};
