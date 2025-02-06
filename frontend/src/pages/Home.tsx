import React, { useState } from "react";
import { useFontSize } from "../context/FontSizeContext"; // フォントサイズを取得

const Home: React.FC = () => {
    const { fontSize } = useFontSize(); // フォントサイズを適用
    const [tasks, setTasks] = useState<{ id: number, text: string, completed: boolean }[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    // タスク追加
    const addTask = () => {
        if (newTask.trim()) {
            setTasks([
                ...tasks,
                { id: Date.now(), text: newTask, completed: false },
            ]);
            setNewTask('');
        }
    };

    // タスク完了状態を変更
    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // 完了したタスクを元に戻す
    const restoreTask = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: false } : task
        ));
    };

    return (
        <div className="home">
            <div className="nowDayTask">
                <h1 style={{ fontSize }}>今日の目標タスク</h1>
            </div>
            <div className="todo">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="新しいタスク"
                    style={{ fontSize }} // フォントサイズを適用
                />
                <button onClick={addTask} style={{ fontSize }}>タスク追加</button>
                <h2 style={{ fontSize }}>未完了のタスク</h2>
                <table>
                    <thead>
                    <tr>
                        <th style={{ fontSize }}>タスク</th>
                        <th style={{ fontSize }}>完了</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.filter(task => !task.completed).map(task => (
                        <tr key={task.id}>
                            <td style={{ fontSize }}>{task.text}</td>
                            <td>
                                <button onClick={() => toggleTaskCompletion(task.id)} style={{ fontSize }}>
                                    完了
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <h2 style={{ fontSize }}>完了したタスク</h2>
                <table>
                    <thead>
                    <tr>
                        <th style={{ fontSize }}>タスク</th>
                        <th style={{ fontSize }}>元に戻す</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.filter(task => task.completed).map(task => (
                        <tr key={task.id}>
                            <td style={{ fontSize }}>{task.text}</td>
                            <td>
                                <button onClick={() => restoreTask(task.id)} style={{ fontSize }}>
                                    元に戻す
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
