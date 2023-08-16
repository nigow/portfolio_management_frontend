const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/dev/users",
        createProxyMiddleware({
            target: process.env.REACT_APP_ENDPOINT,
            changeOrigin: true,
        })
    );
};
