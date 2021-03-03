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
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    //BLL:
    const todolistID_1 = v1();
    const todolistID_2 = v1();
    const [todoLists, setTodolists] = useState<Array<TodoListType>>([
            {id: todolistID_1, title: "what to learn", filter: "all"},
            {id: todolistID_2, title: "What to buy", filter: "all"}
        ]
    );

    const [tasks, setTasks] = useState<TaskStateType>({
            [todolistID_1]: [  //Используем [ССЫЛКУ] на содержимое переменной todolistID_1.
                // Содержимое станет именем свойства
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: false}
            ],
            [todolistID_2]: [
                {id: v1(), title: "Milk", isDone: false},
                {id: v1(), title: "Bread", isDone: true},
                {id: v1(), title: "Meat", isDone: false}
            ]
        }
    )


    function removeTask(todoListID: string, taskID: string) {
        const todoListTasks = tasks[todoListID]
        const filteredTasks = todoListTasks.filter(t => t.id !== taskID)
        tasks[todoListID] = filteredTasks
        setTasks({...tasks})
    }

    function addTask(todoListID: string, title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)
        //false -> undefined, null, 0, "", NaN
        //true -> {}, [], " "
        if (task) {
            task.isDone = newIsDoneValue
            setTasks({...tasks})
        }
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodolists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodolists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }


    //UI
    //CRUD. Create,Read, Update, Delete
    const todolistComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
        }
        return (

            <Todolist
                todoListID={tl.id}
                title={tl.title}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                removeTodoList={removeTodoList}
                changeTaskStatus={changeTaskStatus}
                filter={tl.filter}
            />

        )
    })
    return (
        <div className={"App"}>
            {todolistComponents}
        </div>
    )
}
    export default App;


