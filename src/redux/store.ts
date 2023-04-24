import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import todoMgtSlice from "../features/todos/reducer";

export const store = configureStore({
    reducer: {
        todoMgt: todoMgtSlice,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;