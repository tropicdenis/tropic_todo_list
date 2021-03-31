import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    //BLL:
    const todolistID_1 = v1();
    const todolistID_2 = v1();
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
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

    function addTask(title: string, todoListID: string) {
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

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title: title, filter: "all"}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }


    //UI
    const todolistComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
        }
        return (
            <Grid item key={tl.id}>
            <Paper elevation={5} style={{padding: "20px"}}>
                <Todolist
                    todoListID={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeTodoListFilter={changeTodoListFilter}
                    changeTodoListTitle={changeTodoListTitle}
                    addTask={addTask}
                    removeTodoList={removeTodoList}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                />
            </Paper>
            </Grid>
        )
    })
    return (
        <div className={"App"}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container  style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolistComponents}
                </Grid>

            </Container>


        </div>
    )
}

export default App;


