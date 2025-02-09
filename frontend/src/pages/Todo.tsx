import React from "react";

const Todo: React.FC = () => {
  const [tasks, setTasks] = React.useState<{ id: number, text: string, completed: boolean }[]>([]);

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
      <div className="todo">
        <h2>完了したタスク</h2>
        <table>
          <thead>
          <tr>
            <th>完了タスク</th>
            <th>消去</th>
          </tr>
          </thead>
          <tbody>
          {tasks.filter(task => task.completed).map(task => (
              <tr key={task.id}>
                <td>{task.text}</td>
                <td>
                  <button onClick={() => deleteTask(task.id)}>消去</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default Todo;