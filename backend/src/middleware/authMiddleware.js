const jwt = require('jsonwebtoken');  // JWTを使うためにインポート
const config = require('../config');  // シークレットキーなどの設定ファイルをインポート

// 認証ミドルウェア
const authenticate = (req, res, next) => {
    // リクエストヘッダからトークンを取得
    const token = req.header('Authorization')?.replace('Bearer ', ''); // 'Bearer ' プレフィックスを取り除く

    // トークンが提供されていない場合
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // トークンの検証
        const decoded = jwt.verify(token, config.JWT_SECRET);  // JWT_SECRETはconfigファイルで定義したシークレットキー

        // トークンが有効であれば、リクエストにユーザー情報を追加
        req.user = decoded;  // トークン内のデータをリクエストオブジェクトに追加

        next();  // 次のミドルウェアへ進む
    } catch (error) {
        // トークンが無効な場合
        res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = authenticate;
