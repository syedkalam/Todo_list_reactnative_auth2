import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    //     auth: authReducer,
    // auth: todoReducer,
    todo: todoReducer,

    //     [baseApi.reducerPath]: baseApi.reducer,
  },
  //   middleware: getDefaultMiddleware =>
  //     getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
