import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

export type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}

export type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER-TITLE"
    filter: FilterValuesType
    id: string
}

let initialState: Array<TodoListType> = []

type ActionType = RemoveTodoListActionType | AddTodoListActionType |
    ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch(action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {id: action.todolistId, title: action.title, filter: "all"}
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return[...todoLists]
            }
            return todoLists
        case "CHANGE-TODOLIST-FILTER-TITLE": {
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...todoLists]
            }
            return todoLists
        }
        default:
            return todoLists

    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {

    return {type: "REMOVE-TODOLIST", id}
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {

    return {type: "ADD-TODOLIST", title: title, todolistId: v1()}
}
export const ChangeTitleTodoListAC = (id: string, title: string): ChangeTodoListTitleActionType => {

    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}
export const ChangeFilterTitleTodoListAC = (id: string, filter:FilterValuesType): ChangeTodoListFilterActionType => {

    return {type: "CHANGE-TODOLIST-FILTER-TITLE", id, filter}
}