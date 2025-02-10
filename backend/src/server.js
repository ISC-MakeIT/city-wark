const express =require("express")  ;

const app = express();
const port = 3000;

// JSONボディのパースを有効にする
app.use(express.json());

// 基本的なルート
app.get('/', (req , res ) => {
    console.log(req.query);  // reqを使ってクエリパラメータを取得
    res.send('Hello, World!');
});


// サーバーの起動
app.listen(port,'0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
