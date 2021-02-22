import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
}

export function Todolist(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError("Error")
        }
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const setAllFilter = () => props.changeTodoListFilter("all")
    const setActiveFilter = () => props.changeTodoListFilter("active")
    const setCompletedFilter = () => props.changeTodoListFilter("completed")

    const tasks = props.tasks.map(task => {

        const removeTask = () => props.removeTask(task.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked)

        return (
            <li className={task.isDone ? "isDone" : ""}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeTaskStatus}
                />

                <span>{task.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                    className={error ? "error" : ""}/>

                <button onClick={addTask}>+</button>
                {error && <div className={"errorMessage"}>Title is required!</div> }
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active" : ""}
                        onClick={setAllFilter}>All
                </button>
                <button className={props.filter === "active" ? "active" : ""}
                        onClick={setActiveFilter}>Active
                </button>
                <button className={props.filter === "completed" ? "active" : ""}
                        onClick={setCompletedFilter}>Completed
                </button>
            </div>
        </div>

    )
}