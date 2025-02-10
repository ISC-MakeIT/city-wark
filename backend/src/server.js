const express = require("express");

const app = express();
const port = 3000;

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
