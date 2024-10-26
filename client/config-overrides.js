const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require("webpack");

module.exports = function override(config, env) {
    // Thêm fallback cho các mô-đun Node.js
    config.resolve.fallback = {
        ...config.resolve.fallback,
        net: require.resolve('net-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify'), // Thêm nếu cần
        assert: require.resolve('assert/'), // Thêm nếu cần
        // Thêm các mô-đun khác nếu cần
    };

    // Thêm NodePolyfillPlugin
    config.plugins.push(new NodePolyfillPlugin());

    // Thêm DefinePlugin để định nghĩa các biến môi trường
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.MY_ENV': JSON.stringify(process.env.MY_ENV),
            // Có thể thêm nhiều biến môi trường khác nếu cần
        })
    );

    // Trả về cấu hình đã chỉnh sửa
    return config;
};
