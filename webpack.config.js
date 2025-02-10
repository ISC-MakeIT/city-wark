const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',  // エントリーポイント
    output: {
        filename: 'bundle.js',  // 出力ファイル名
        path: path.resolve(__dirname, 'dist')  // 出力先ディレクトリ
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',  // HTMLテンプレートの指定
        })
    ]
};
