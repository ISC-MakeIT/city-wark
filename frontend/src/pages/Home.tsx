import React, { useState, useEffect } from "react";
import { useFontSize } from "../context/FontSizeContext"; // フォントサイズを取得
import "./Home.css"; // CSSのインポート

const Home: React.FC = () => {
    const { fontSize } = useFontSize(); // フォントサイズを適用
    const [tasks, setTasks] = useState<{ id: number, text: string, completed: boolean, fromTargetTask: boolean }[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [showCompleted, setShowCompleted] = useState<boolean>(false); // 完了タスクの表示制御
    const [randomTask, setRandomTask] = useState<string>(''); // ランダムタスクを管理
    const [isTargetTaskAdded, setIsTargetTaskAdded] = useState<boolean>(false); // 目標タスクが追加されたかどうかを管理
    const [isTargetTaskCompleted, setIsTargetTaskCompleted] = useState<boolean>(false); // 目標タスクの完了状態
    // ★のついた完了タスクの数をカウント
    const targetTaskCompletedCount = tasks.filter(task => task.completed && task.fromTargetTask).length;
    // ランダムタスクのリスト
    const targetTask = [
        "皿洗いをしよう", "散歩しよう", "トイレ掃除", "部屋の片付け", "買い物", "ゴミ出し",
        "コーヒーで一息", "水を飲む", "洗濯物を干す", "洗濯物をたたむ", "お花に水を上げる", "ドラマを見る",
        "電話をする", "歯磨き", "お風呂掃除", "クローゼットの整理", "日光を浴びる", "洗面台の掃除",
        "音楽を聴く", "短歌を読む", "本を読む"
    ];

    // 初回レンダリング時にランダムタスクを決める
    useEffect(() => {
        const randomTask = targetTask[Math.floor(Math.random() * targetTask.length)];
        setRandomTask(randomTask);
    }, []);

    // タスク追加
    const addTask = (taskText: string, fromTargetTask: boolean = false) => {
        if (taskText.trim()) {
            setTasks([...tasks, { id: Date.now(), text: taskText, completed: false, fromTargetTask }]);
        }
    };
    const taskCount = targetTask.length;
    const randomNewMakeTask = targetTask[Math.floor(Math.random() * taskCount)];
    // 手入力のタスク追加用
    const handleAddTask = () => {
        addTask(newTask);
        setNewTask('');
    };

    // タスク完了状態を変更
    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                if (task.fromTargetTask) {
                    setIsTargetTaskCompleted(true); // 目標タスクが完了した場合の処理
                }
                return { ...task, completed: !task.completed };
            }
            return task;
        }));
    };

    // タスクを削除
    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // 目標タスクを追加
    const handleAddTargetTask = () => {
        addTask(randomTask, true);
        setIsTargetTaskAdded(true); // タスク追加後、ボタンを無効化
    };

    // 完了タスクの数をカウント
    const point = tasks.filter(task => task.completed).length;

    return (
        <div className="home">
            {/* 今日の目標タスク */}
            <div className="targetTask">
                <h1 style={{fontSize}}>今日の目標タスク</h1>
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <p style={{fontSize}}>{randomTask}</p>
                    <button
                        onClick={handleAddTargetTask}
                        style={{fontSize}}
                        className={"targetTask"}
                        disabled={isTargetTaskAdded || isTargetTaskCompleted} // タスク追加後または完了後はボタンを無効化
                    >
                        {isTargetTaskCompleted ? "タスク完了" : isTargetTaskAdded ? "挑戦中" : "タスク追加"}
                    </button>
                </div>
            </div>

            {/* ToDoリスト */}
            <div className="todo">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder={randomNewMakeTask}
                    style={{fontSize}} // フォントサイズを適用
                />
                <button onClick={handleAddTask} style={{fontSize}}>タスク追加</button>

                {/* 未完了のタスク */}
                <table>
                    <thead>
                    <tr>
                        <th style={{fontSize}}>挑戦中タスク</th>
                        <th style={{fontSize}}>完了</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.filter(task => !task.completed).map(task => (
                        <tr key={task.id}>
                            <td style={{fontSize}}>
                                {task.fromTargetTask && "★"} {task.text}
                            </td>
                            <td>
                                <button onClick={() => toggleTaskCompletion(task.id)} style={{fontSize}}>
                                    完了
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* 完了したタスクの表示/非表示ボタン */}
                <button onClick={() => setShowCompleted(!showCompleted)} style={{fontSize, marginTop: "10px"}}>
                    {showCompleted ? "完了タスク" : "完了タスクを表示"}
                </button>

                {/* 完了したタスク (折りたたみ可能) */}
                {showCompleted && (
                    <table>
                        <thead>
                        <tr>
                            <th style={{fontSize}}>完了したタスク</th>
                            <th style={{fontSize}}>消去</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.filter(task => task.completed).map(task => (
                            <tr key={task.id}>
                                <td style={{fontSize}}>
                                    {task.fromTargetTask && "★"} {task.text}
                                </td>
                                <td>
                                    {/* 目標タスクには消去ボタンを表示しない */}
                                    {!task.fromTargetTask && (
                                        <button onClick={() => deleteTask(task.id)} style={{fontSize}}>
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

            {/* 完了タスクの数を表示 */}
            <div>
                <h2>{point}</h2>
                <p>{targetTaskCompletedCount}</p>

            </div>
        </div>
    );
};

export default Home;
