import React, { useState, useEffect } from "react";
import { useFontSize } from "../context/FontSizeContext"; // コンテキストをインポート
import "./Todo.css"; // スタイルを外部ファイルに分離
import axios from "axios"; // APIリクエスト用

interface TodoProps {
  setUserPoints: (points: number) => void; // 親コンポーネントにポイントを設定する関数を受け取る
  userPoints: number; // 現在のポイントを受け取る
}

const Todo: React.FC<TodoProps> = ({ setUserPoints, userPoints }) => {
  const { fontSize } = useFontSize();
  const [todos, setTodos] = useState([
    { comment: "今日は洗濯物をやろう", completed: false, point_value: 10 },
    { comment: "床を今日は拭こう", completed: false, point_value: 10 },
    { comment: "データがなくならないようにしよう", completed: false, point_value: 10 },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const userId = 1; // 仮のユーザーID

  // タスクを追加する関数
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { comment: newTodo, completed: false, point_value: 10 }]);
      setNewTodo("");
    }
  };

  // 状態を切り替える関数（完了にする）
  const toggleState = async (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
        i === index && !todo.completed ? { ...todo, completed: true } : todo
    );

    // 状態を変更する前にsetTodosを呼び出すとすぐに反映されないことがあるため、完了状態をセット後、API呼び出し
    setTodos(updatedTodos);

    // 完了状態の場合にポイント加算とAPI呼び出しを行う
    if (!updatedTodos[index].completed) {
      const todoId = index + 1; // 仮のID（インデックスを1始まりに）

      try {
        // タスク完了APIを呼び出してポイントを加算
        await axios.post("http://localhost:3001/todos/complete", { userId, todoId });

        // タスク完了後にポイントを再取得
        await fetchUserPoints();
      } catch (error) {
        console.error("タスク完了エラー:", error);
      }
    }
  };

  // ユーザーのポイントを取得
  const fetchUserPoints = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/todos/user-points/${userId}`);
      setUserPoints(response.data.points); // 取得したポイントを親コンポーネントに渡して更新
    } catch (error) {
      console.error("ユーザーのポイント取得エラー:", error);
    }
  };

  useEffect(() => {
    fetchUserPoints(); // 初期レンダリング時にポイントを取得
  }, [userId, setUserPoints]); // setUserPointsが依存関係に追加

  // 未完了リストと完了リストに分ける
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
      <div className="todo" style={{ fontSize: `${fontSize}px` }}>
        <h1>TODOリスト</h1>
        <h2>ユーザーのポイント: {userPoints} ポイント</h2>

        {/* 未完了リスト */}
        <h2>未完了のTODO</h2>
        <table>
          <thead>
          <tr>
            <th className="id">ID</th>
            <th className="comment">コメント</th>
            <th className="state">状態</th>
            <th className="button">操作</th>
          </tr>
          </thead>
          <tbody>
          {incompleteTodos.map((todo, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{todo.comment}</td>
                <td>{todo.completed ? "終了" : "未終了"}</td>
                <td>
                  <button onClick={() => toggleState(index)}>
                    完了にする
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        {/* 完了リスト */}
        <h2>完了したTODO</h2>
        <table>
          <thead>
          <tr>
            <th className="id">ID</th>
            <th className="comment">コメント</th>
            <th className="state">状態</th>
          </tr>
          </thead>
          <tbody>
          {completedTodos.map((todo, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{todo.comment}</td>
                <td>{todo.completed ? "完了" : "未完了"}</td>
              </tr>
          ))}
          </tbody>
        </table>

        <div className="add-todo">
          <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="新しいTODOを入力"
          />
          <button onClick={addTodo}>追加</button>
        </div>
      </div>
  );
};

export default Todo;
