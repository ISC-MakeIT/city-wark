const mysql = require("mysql");
require("dotenv").config(); // .env ファイルから環境変数を読み込む

const pool = mysql.createPool({
    connectionLimit: 10, // 最大接続数
    host: process.env.DB_HOST || "localhost", // 環境変数を使用してホストを設定
    user: process.env.DB_USER || "root", // ユーザー名
    password: process.env.DB_PASS || "password", // パスワード
    database: process.env.DB_NAME || "hackathon", // データベース名
    port: process.env.DB_PORT || 3306 // ポート
});

// 接続テスト
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to the MySQL database");
    connection.release(); // 接続を解放
});

// クエリ実行用の関数
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) {
                console.error("Database query error:", err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = { pool, query };
