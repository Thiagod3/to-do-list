
import { ChangeEvent, useState } from "react";
import styles from "./List.module.css";
import { Task } from "./Task";
import { ClipboardText } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';

interface TaskType {
  id: string;
  content: string;
  isDone: boolean;
}

export function List() {
const [tasks, setTasks] = useState<TaskType[]>([]);

const [contTasks, setContTasks] = useState<number>(0);

const [contCheckedTasks, setContCheckedTasks]= useState<number>(0);

  function handleCreateNewTask(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const newTaskContent = event.target.content.value;

    if (newTaskContent !== '') {
      const newTask: TaskType = {
        id: uuidv4(),
        content: newTaskContent,
        isDone: false,
      };

      setTasks([...tasks, newTask]);
      setContTasks(contTasks+1);
      event.target.content.value = '';
    }
  }

  function handleTaskCompletion(id: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? 
        task.isDone === false ?
          { ...task, isDone: true }
        :
        { ...task, isDone: false }
      : task
    );
    setTasks(updatedTasks);

    tasks.map((task) =>
    task.id === id ? 
    task.isDone === false ?
      setContCheckedTasks(contCheckedTasks+1)
    :
    setContCheckedTasks(contCheckedTasks-1)
  : task
    )
  }

  function handleTaskDelete(id: string) {
    const tasksWithoutDeleteOne = tasks.filter((task) => 
      {return task.id !== id}
    )

    setTasks(tasksWithoutDeleteOne);
    setContTasks(contTasks-1);

    tasks.map((task) =>
  task.id === id ? 
    task.isDone === true ?
      setContCheckedTasks(contCheckedTasks - 1)
    :
    task
  : task
);

  }

  return (
    <article className={styles.TaskList}>

      <form onSubmit={handleCreateNewTask} className={styles.criarTarefa}>
        <input 
          placeholder="Adicione uma nova tarefa" 
          name="content"
        />
        <button type="submit">Criar</button>
      </form>

      <div className={styles.Textconts}>
        <p>
          Tarefas criadas
          <p className={styles.conts}>{contTasks}</p>
        </p>
        <p>
          Concluidas
          <p>
            {contTasks == 0 ?
              <p className={styles.conts}>{contTasks}</p>
              :
              <p className={styles.conts}>{contCheckedTasks} de {contTasks}</p>
        
            }</p>
        </p>
      </div>
        {
            tasks?.length > 0
            ?(
                <div>
                    {tasks.map(task => {
                        return <Task 
                          key={task.id}
                          content={task.content} 
                          isDone={task.isDone}
                          onComplete={() => handleTaskCompletion(task.id)}
                          toDelete={() => handleTaskDelete(task.id)}
                      />
                    })}
                </div>
            ):(
                <div className={styles.emptyTask}>
                    <ClipboardText size={60}/>
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            )

        }
    </article>
  );
}
