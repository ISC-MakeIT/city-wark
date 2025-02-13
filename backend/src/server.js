const express = require('express');
const cors = require('cors');
require('dotenv').config();  // .envファイルを読み込む
const { promise } = require('./config/database'); // データベース接続をインポート
const userRoutes = require('./routes/userRoutes'); // userRoutesのインポート

const app = express();

// CORSを有効にする
app.use(cors());
// JSONボディのパース
app.use(express.json());

const PORT = process.env.PORT || 3001;

// 基本的なルート
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// ユーザー関連のルートを使う
app.use('/api', userRoutes);  // /api以下でユーザーのルートを使用

// データベース接続を確認後、サーバーを起動
promise()
    .then(() => {
        console.log("Connected to DB");

        // サーバーの起動（DB接続後）
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed", error);
    });
