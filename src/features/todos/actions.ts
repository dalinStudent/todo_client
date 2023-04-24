import { createAsyncThunk } from "@reduxjs/toolkit";
import { TODO, TODO_CREATE, TODO_DELETE, TODO_UPDATE } from "./constants";
import { 
    removeTodoService, 
    fetchTodoService, 
    createTodoService, 
    updateTodoService
} from "./services";

export const fetchTodoActionSyn: any = createAsyncThunk(
    TODO,
    fetchTodoService
)
export const createTodoActionSyn: any = createAsyncThunk(
    TODO_CREATE,
    createTodoService
)
export const updateTodoActionSyn: any = createAsyncThunk(
    TODO_UPDATE,
    updateTodoService
)
export const deleteToActionSyn: any = createAsyncThunk(
    TODO_DELETE,
    removeTodoService
)

export const test = '*';