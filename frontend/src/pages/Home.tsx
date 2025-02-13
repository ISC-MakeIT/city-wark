import React, { useEffect, useState } from "react";
import { useFontSize } from "../context/FontSizeContext"; // フォントサイズを取得
import Weather from "../components/Weather";
import Todo from "../pages/Todo";  // Todo コンポーネントをインポート
import "../components/Header.css";

const Home: React.FC = () => {
    const { fontSize } = useFontSize(); // フォントサイズを適用
    const [tasks, setTasks] = useState<any[]>([]); // タスクデータの状態
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error] = useState<string | null>(null); // エラーメッセージの状態
    const [isLoading, setIsLoading] = useState<boolean>(true); // ローディング状態の管理

    useEffect(() => {
        // バックエンドAPIを呼び出して、タスクデータを取得
        fetch('http://localhost:3001/api/tasks')  // APIのエンドポイントを指定
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);  // 取得したデータをセット
                setIsLoading(false);  // ローディング終了
            })
            .catch((error) => {
                console.log("Error fetching tasks:", error);  // エラーはログに残すが表示はしない
            });
    }, []);

    return (
        <div style={{fontSize: `${fontSize}px`}}>
            {isLoading && <p>データを読み込み中...</p>} {/* ローディング表示 */}
            {error && <p style={{color: "red"}}>{error}</p>} {/* エラーメッセージ表示 */}

            <Weather/>
            <h1>ホームページ</h1>
            <p>当日できるタスクを表示</p>

            {/* Todo コンポーネントをここに組み込む */}
            <Todo/>

            <div>
                <h2>今日のタスク</h2>
                <ul>
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <li key={index}>{task.name}</li>  // タスクの名前を表示
                        ))
                    ) : (
                        <p>タスクはありません。</p>  // タスクがない場合のメッセージ
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Home;
