import React, { useState, useEffect } from "react";
import { useFontSize } from "../context/FontSizeContext";
import "./Home.css";
import Weather from "../components/Weather";

const Home: React.FC = () => {
    const { fontSize, setFontSize } = useFontSize();
    const [tasks, setTasks] = useState<{ id: number, text: string, completed: boolean }[]>([]);
    const [randomTask, setRandomTask] = useState<string>("");
    const [showCompleted, setShowCompleted] = useState<boolean>(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [points, setPoints] = useState<number>(0);

    const predefinedTasks = [
        "皿洗いをしよう", "散歩しよう", "トイレ掃除", "部屋の片付け", "買い物", "ゴミ出し",
        "コーヒーで一息", "水を飲む", "洗濯物を干す", "洗濯物をたたむ", "お花に水を上げる", "ドラマを見る",
        "電話をする", "歯磨き", "お風呂掃除", "クローゼットの整理", "日光を浴びる", "洗面台の掃除",
        "音楽を聴く", "短歌を読む", "本を読む"
    ];

    useEffect(() => {
        setRandomTask(predefinedTasks[Math.floor(Math.random() * predefinedTasks.length)]);
        const lastCompletedDate = localStorage.getItem("lastCompletedDate");
        const savedPoints = localStorage.getItem("points");
        const today = new Date().toDateString();

        if (savedPoints) {
            setPoints(Number(savedPoints));
        }

        if (lastCompletedDate !== today) {
            localStorage.setItem("lastCompletedDate", "");
        }
    }, []);

    const addTask = () => {
        if (randomTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: randomTask, completed: false }]);
            setRandomTask(predefinedTasks[Math.floor(Math.random() * predefinedTasks.length)]);
        }
    };

    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
        const today = new Date().toDateString();
        const lastCompletedDate = localStorage.getItem("lastCompletedDate");

        if (lastCompletedDate !== today) {
            const newPoints = points + 1;
            setPoints(newPoints);
            localStorage.setItem("points", newPoints.toString());
            localStorage.setItem("lastCompletedDate", today);
        }
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="home" style={{ fontSize: `${fontSize}px` }}>
            <div className="settings-button" onClick={() => setShowSettings(!showSettings)}>
                &#9776;
            </div>
            <Weather />
            {showSettings && (
                <div className="settings-frame">
                    <div className="settings-content">
                        <h2>設定画面</h2>
                        <div className="setting-section">
                            <label>文字の大きさ：</label>
                            <input
                                type="range"
                                min={12}
                                max={36}
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                            />
                            <span>{fontSize}px</span>
                        </div>
                        <button onClick={() => setShowSettings(false)} className="close-button">閉じる</button>
                    </div>
                </div>
            )}
            <div className="targetTask">
                <div className="todayTargetTask">今日のタスク</div>
                <div className="task-container">
                    <p className="todayRandomTask">{randomTask}</p>
                    <button onClick={addTask}>タスク追加</button>
                </div>
            </div>
            <div className="todo">
                <table>
                    <thead>
                    <tr>
                        <th>タスク</th>
                        <th>完了</th>
                        <th>削除</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.filter(task => !task.completed).map(task => (
                        <tr key={task.id}>
                            <td>{task.text}</td>
                            <td>
                                <button onClick={() => toggleTaskCompletion(task.id)}>完了</button>
                            </td>
                            <td>
                                <button onClick={() => deleteTask(task.id)} className="delete">削除</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={() => setShowCompleted(!showCompleted)}>
                    {showCompleted ? "完了タスク" : "完了タスクを表示"}
                </button>
                {showCompleted && (
                    <table>
                        <thead>
                        <tr>
                            <th>完了したタスク</th>
                            <th>削除</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.filter(task => task.completed).map(task => (
                            <tr key={task.id}>
                                <td>{task.text}</td>
                                <td>
                                    <button onClick={() => deleteTask(task.id)} className="delete">削除</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="points-display">
                <h2>ポイント: {points}</h2>
            </div>
        </div>
    );
};

export default Home;
