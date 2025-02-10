const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001; // バックエンドのポートは3001

// CORS設定
app.use(cors({
    origin: 'http://localhost:3000', // フロントエンドのURL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // JSON ボディのパース

// ユーザー関連のルートを登録
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// 基本のルート
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// サーバーの起動
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
