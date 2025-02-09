import React, { useState, useEffect } from "react";
import { useFontSize } from "../context/FontSizeContext"; // フォントサイズを取得
import "./Home.css"; // CSSのインポート

const Home: React.FC = () => {
    const { fontSize } = useFontSize();
    const [tasks, setTasks] = useState<{ id: number, text: string, completed: boolean, fromTargetTask: boolean }[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [showCompleted, setShowCompleted] = useState<boolean>(false);
    const [randomTask, setRandomTask] = useState<string>('');
    const [isTargetTaskAdded, setIsTargetTaskAdded] = useState<boolean>(false);
    const [isTargetTaskCompleted, setIsTargetTaskCompleted] = useState<boolean>(false);

    const targetTaskCompletedCount = tasks.filter(task => task.completed && task.fromTargetTask).length;

    const targetTask = [
        "皿洗いをしよう", "散歩しよう", "トイレ掃除", "部屋の片付け", "買い物", "ゴミ出し",
        "コーヒーで一息", "水を飲む", "洗濯物を干す", "洗濯物をたたむ", "お花に水を上げる", "ドラマを見る",
        "電話をする", "歯磨き", "お風呂掃除", "クローゼットの整理", "日光を浴びる", "洗面台の掃除",
        "音楽を聴く", "短歌を読む", "本を読む"
    ];

    useEffect(() => {
        setRandomTask(targetTask[Math.floor(Math.random() * targetTask.length)]);
    }, []);

    const addTask = (taskText: string, fromTargetTask: boolean = false) => {
        if (taskText.trim()) {
            setTasks([...tasks, { id: Date.now(), text: taskText, completed: false, fromTargetTask }]);
        }
    };

    const randomNewMakeTask = targetTask[Math.floor(Math.random() * targetTask.length)];

    const handleAddTask = () => {
        addTask(newTask);
        setNewTask('');
    };

    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                if (task.fromTargetTask) {
                    setIsTargetTaskCompleted(true);
                }
                return { ...task, completed: !task.completed };
            }
            return task;
        }));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleAddTargetTask = () => {
        addTask(randomTask, true);
        setIsTargetTaskAdded(true);
    };

    const point = tasks.filter(task => task.completed).length;

    return (
        <div className="home">
            <div className="targetTask">
                <div className={"todayTargetTask"}>今日の目標タスク</div>
                <div className="task-container">
                    <p className={"todayRandomTask"}>{randomTask}</p>
                    <button
                        onClick={handleAddTargetTask}
                        className={`targetTask ${isTargetTaskCompleted ? "completed" : isTargetTaskAdded ? "inProgress" : "add"}`}
                        disabled={isTargetTaskAdded || isTargetTaskCompleted}
                    >
                        {isTargetTaskCompleted ? "タスク完了" : isTargetTaskAdded ? "挑戦中" : "タスク追加"}
                    </button>

                </div>
            </div>

            <div className="todo">
                <div className="todo-input-container">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder={randomNewMakeTask}
                        style={{ fontSize }}
                    />
                    <button onClick={handleAddTask}>追加</button>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>挑戦中タスク</th>
                        <th>完了</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.filter(task => !task.completed).map(task => (
                        <tr key={task.id}>
                            <td style={{ fontSize }}>
                                {task.fromTargetTask && "★"} {task.text}
                            </td>
                            <td>
                                <button onClick={() => toggleTaskCompletion(task.id)} style={{ fontSize }}>
                                    完了
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <button onClick={() => setShowCompleted(!showCompleted)} style={{ fontSize, marginTop: "10px" }}>
                    {showCompleted ? "完了タスク" : "完了タスクを表示"}
                </button>

                {showCompleted && (
                    <table>
                        <thead>
                        <tr>
                            <th style={{ fontSize }}>完了したタスク</th>
                            <th style={{ fontSize }}>消去</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.filter(task => task.completed).map(task => (
                            <tr key={task.id}>
                                <td style={{ fontSize }}>
                                    {task.fromTargetTask && "★"} {task.text}
                                </td>
                                <td>
                                    {!task.fromTargetTask && (
                                        <button onClick={() => deleteTask(task.id)} style={{ fontSize }}>
                                            消去
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="task-stats">
                <h2>{point}</h2>
                <p>{targetTaskCompletedCount}</p>
            </div>
        </div>
    );
};

export default Home;
