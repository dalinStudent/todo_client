import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../interfaces/todo";
import { TODO } from "./constants";
import { 
  createTodoActionSyn, 
  deleteToActionSyn, 
  fetchTodoActionSyn, 
  updateTodoActionSyn 
} from "./actions";
import Swal from "sweetalert2";

export interface TodoMgtState {
    todosList: Array<Todo>,
    loadingTodo: boolean,
    loadingAdd: boolean,
    loadingUpdate: boolean,
    loadingDelete: boolean,
    error: any,
} 

const initialState = {
    todosList: [],
    loadingTodo: false,
    loadingDelete: false,
    loadingDetail: false,
    error: {},
} as unknown as TodoMgtState;
const showErrorAlert = () => {
  Swal.fire({
    title: 'Oop Sorry, This todo already exist!',
    showDenyButton: false,
    icon: 'error',
    confirmButtonText: 'Yes',
  })
}
export const todoMgtSlice = createSlice({
    name: TODO,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchTodoActionSyn.pending, (state) => {
        state.loadingTodo = true;
      });
      builder.addCase(fetchTodoActionSyn.fulfilled, (state, action) => {
        const { payload } = action;
        state.loadingTodo = false;
        state.todosList = payload;
      });
      builder.addCase(fetchTodoActionSyn.rejected, (state, action) => {
        state.loadingTodo = false;
      });
      builder.addCase(createTodoActionSyn.pending, (state) => {
        state.loadingTodo = true;
      });
      builder.addCase(createTodoActionSyn.fulfilled, (state, action) => {
        const { payload } = action;
        state.loadingTodo = false;
        state.todosList.push(payload.data);;
      });
      builder.addCase(createTodoActionSyn.rejected, (state, action) => {
        state.loadingTodo = false;
        state.error = showErrorAlert();
      });
      builder.addCase(updateTodoActionSyn.pending, (state) => {
        state.loadingTodo = true;
      });
      builder.addCase(updateTodoActionSyn.fulfilled, (state, action) => {
        const { payload } = action;
        state.loadingTodo = false;
        const updatedIndex = state.todosList.findIndex(todo => todo.id === payload.data.id);
        state.todosList[updatedIndex] = payload.data;
      });
      builder.addCase(updateTodoActionSyn.rejected, (state, action) => {
        state.loadingTodo = false;
        state.error = showErrorAlert();
      });
      builder.addCase(deleteToActionSyn.pending, (state) => {
        state.loadingDelete = true;
      });
      builder.addCase(deleteToActionSyn.fulfilled, (state, action) => {
        const { payload } = action;
        state.loadingDelete = false;
        state.todosList = state.todosList.filter((todo) => todo.id !== payload.id);
      })
      builder.addCase(deleteToActionSyn.rejected, (state, action) => {
        state.loadingDelete = false;
      });
    }
});

export const {} = todoMgtSlice.actions;
  
export default todoMgtSlice.reducer;