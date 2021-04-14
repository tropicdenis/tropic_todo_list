import {
    AddTodoListAC,
    AddTodoListActionType, ChangeTodoListFilterActionType,
    ChangeTodoListTitleActionType, RemoveTodoListAC,
    RemoveTodoListActionType,
    todoListsReducer
} from './todolists_reducer';
import {v1} from 'uuid';
import {FilterValuesType, TasksStateType, TodoListType} from '../App';
import {tasksReducer} from "./tasks_reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
