const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10, // 最大接続数
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydatabase"
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
