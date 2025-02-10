require("dotenv").config(); // 環境変数の読み込み

const express = require("express");
const cors = require("cors");
const config = require("./config");

const app = express();
const port = config.port || 3001; // `config.js` からポートを取得

// CORS設定
app.use(cors(config.corsOptions));

app.use(express.json()); // JSON ボディのパース

// ユーザー関連のルートを登録
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

// 基本のルート
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// サーバーの起動
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${port}`);
});
