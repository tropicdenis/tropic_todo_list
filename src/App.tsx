import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false}
    ])

//BLL
    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskID) //true
        setTasks(filteredTasks)
        console.log(tasks)
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean) {
        const task = tasks.find(t => t.id === taskID)
        //false -> undefined, null, 0, "", NaN
        //true -> {}, [], " "
        if (task) {
            task.isDone = newIsDoneValue
            setTasks([...tasks])
        }
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function changeTodoListFilter(newFilterValue: FilterValuesType) {
        setFilter(newFilterValue)
    }

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    //UI
    //CRUD. Create,Read, Update, Delete
    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;


