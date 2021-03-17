import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
    todoListID: string;
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

export function Todolist(props: TodoListPropsType) {

    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const setAllFilter = () => props.changeTodoListFilter("all", props.todoListID)
    const setActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)
    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    const tasks = props.tasks.map(task => {

        const removeTask = () => props.removeTask(task.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(task.id, newTitle, props.todoListID)

        return (
            <li key={task.id} className={task.isDone ? "isDone" : ""}>
                <Checkbox color={"primary"} checked={task.isDone} onChange={changeTaskStatus} />

                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
               {/* <button onClick={removeTask}>X</button>*/}
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
               {/* <Button onClick={removeTodoList}>X</Button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setAllFilter}>All
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setActiveFilter}>Active
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "completed" ?  "secondary" : "primary"}
                    size={"small"}
                    onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>

    )
}