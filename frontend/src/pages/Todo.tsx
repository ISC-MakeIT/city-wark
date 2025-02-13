import React, { useState, useEffect } from "react";
import { useFontSize } from "../context/FontSizeContext"; // コンテキストをインポート
import axios from "axios"; // axiosを使ってバックエンドにリクエストを送信
import "./Todo.css"; // スタイルを外部ファイルに分離

interface Task {
  id: number;
  comment: string;
  scheduled_date: string | null;
  completed: boolean;
}

const Todo: React.FC = () => {
  const { fontSize } = useFontSize();

  const [todos, setTodos] = useState<Task[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [scheduledDate, setScheduledDate] = useState(""); // 後日の予定日
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 新しいタスクをバックエンドに送信して追加する関数
  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        await axios.post("http://localhost:3001/todo/add", {
          comment: newTodo,
          scheduledDate: scheduledDate,
        });
        await fetchTodos(); // タスクが追加されたら再取得
        setNewTodo("");
        setScheduledDate(""); // フォームのリセット
      } catch (error) {
        console.error("タスクの追加に失敗しました:", error);
        setErrorMessage("タスクの追加に失敗しました。もう一度試してください。");
      }
    }
  };

  // タスクをバックエンドから取得する関数
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/todo/get");
      setTodos(response.data);
    } catch (error) {
      console.error("タスクの取得に失敗しました:", error);
      setErrorMessage("タスクの取得に失敗しました。");
    }
  };

  // 初期化時にタスクを取得
  useEffect(() => {
    const fetchData = async () => {
      await fetchTodos();  // async function内でawaitを使用
    };
    fetchData().then(() => {
      // fetchDataが完了した後に実行する処理（例：ログ）
      console.log("タスクが取得されました");
    }).catch((error) => {
      console.error("タスクの取得中にエラーが発生しました:", error);
    });
  }, []);

  return (
      <div className="todo" style={{ fontSize: `${fontSize}px` }}>
        <h1>TODOリスト</h1>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* 新しいTODOを追加 */}
        <div className="add-todo">
          <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="新しいTODOを入力"
          />
          <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              placeholder="後日の日付"
          />
          <button
              onClick={addTodo}
              disabled={!newTodo.trim() || !scheduledDate}
          >
            追加
          </button>
        </div>

        {/* タスク表示 */}
        <h2>タスク一覧</h2>
        {todos.map((todo) => (
            <div key={todo.id}>
              <p>
                {todo.comment} - {todo.scheduled_date ? `予定日: ${todo.scheduled_date}` : "未設定"}
              </p>
            </div>
        ))}
      </div>
  );
};

export default Todo;
