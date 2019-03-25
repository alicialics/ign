const proxy = require("http-proxy-middleware");
// See https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development

module.exports = function (app) {
  // Use a proxy to fetch from ign's API because it doesn't allow CORS...
  app.use(proxy("/api", { pathRewrite: { '^/api': '/' }, changeOrigin: true, target: "https://ign-apis.herokuapp.com/" }));
}
