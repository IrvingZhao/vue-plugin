const host = "localhost";
const port = 3000;
const baseUrl = "/";
const outputDir = "dist";
const assertDir = "static";

module.exports = {
    publicPath: baseUrl,
    outputDir: outputDir,
    assetsDir: assertDir,
    devServer: {
        clientLogLevel: 'info',
        quiet: true,
        host: host,
        port: port,
        proxy: {
            "/api": {
                target: "http://api.gaogeche.cn:8080/app/mock/18",
                onProxyReq(proxyReq, req, res) {
                    console.log("proxy path: [" + proxyReq.method + "] http://api.gaogeche.cn:8080" + proxyReq.path)
                }
            }
        }
    },
    configureWebpack: {
        entry: "./example/main.js"
    },
    chainWebpack(config) {
        config.module.rule("js").test(/\.jsx?$/).exclude.clear().add((filePath) => {
            if (/node_modules\/xlb-/.test(filePath)) {
                return false;
            } else return /node_modules/.test(filePath);
        });
    }
};