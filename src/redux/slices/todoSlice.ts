import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {nanoid} from 'nanoid/non-secure';
import {authenticateUser} from '../../utils/auth';

export type Todo = {
  id: string;
  title: string;
  description: string;
};

type TodoState = {
  todos: Todo[];
  // Session-based auth: resets to false when app is killed (in-memory only, not persisted)
  isUnlocked: boolean;
};

const initialState: TodoState = {
  todos: [],
  isUnlocked: false,
};

// Auth-gated thunk for adding todo
// Session-based: only prompts biometric if not already unlocked this session
export const addTodoWithAuth = createAsyncThunk<
  {title: string; description: string} | null,
  {title: string; description: string},
  {rejectValue: string; state: {todo: TodoState}}
>('todo/addWithAuth', async (payload, {rejectWithValue, getState}) => {
  const {isUnlocked} = getState().todo;
  if (!isUnlocked) {
    const authenticated = await authenticateUser();
    if (!authenticated) {
      return rejectWithValue('Authentication failed');
    }
  }
  return payload;
});

// Auth-gated thunk for updating todo
// Session-based: only prompts biometric if not already unlocked this session
export const updateTodoWithAuth = createAsyncThunk<
  {id: string; title: string; description: string} | null,
  {id: string; title: string; description: string},
  {rejectValue: string; state: {todo: TodoState}}
>('todo/updateWithAuth', async (payload, {rejectWithValue, getState}) => {
  const {isUnlocked} = getState().todo;
  if (!isUnlocked) {
    const authenticated = await authenticateUser();
    if (!authenticated) {
      return rejectWithValue('Authentication failed');
    }
  }
  return payload;
});

// Auth-gated thunk for deleting todo
// Session-based: only prompts biometric if not already unlocked this session
export const deleteTodoWithAuth = createAsyncThunk<
  string | null,
  string,
  {rejectValue: string; state: {todo: TodoState}}
>('todo/deleteWithAuth', async (id, {rejectWithValue, getState}) => {
  const {isUnlocked} = getState().todo;
  if (!isUnlocked) {
    const authenticated = await authenticateUser();
    if (!authenticated) {
      return rejectWithValue('Authentication failed');
    }
  }
  return id;
});

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // Keep raw actions for testing/internal use
    addTodo: (
      state,
      action: PayloadAction<{title: string; description: string}>,
    ) => {
      state.todos.push({
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
      });
    },
    updateTodo: (
      state,
      action: PayloadAction<{id: string; title: string; description: string}>,
    ) => {
      const index = state.todos.findIndex(
        todo => todo.id === action.payload.id,
      );
      if (index !== -1) {
        state.todos[index].title = action.payload.title;
        state.todos[index].description = action.payload.description;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addTodoWithAuth.fulfilled, (state, action) => {
        if (action.payload) {
          // Unlock session on successful auth
          state.isUnlocked = true;
          state.todos.push({
            id: nanoid(),
            title: action.payload.title,
            description: action.payload.description,
          });
        }
      })
      .addCase(updateTodoWithAuth.fulfilled, (state, action) => {
        if (action.payload) {
          // Unlock session on successful auth
          state.isUnlocked = true;
          const index = state.todos.findIndex(
            todo => todo.id === action.payload!.id,
          );
          if (index !== -1) {
            state.todos[index].title = action.payload.title;
            state.todos[index].description = action.payload.description;
          }
        }
      })
      .addCase(deleteTodoWithAuth.fulfilled, (state, action) => {
        if (action.payload) {
          // Unlock session on successful auth
          state.isUnlocked = true;
          state.todos = state.todos.filter(todo => todo.id !== action.payload);
        }
      });
  },
});

export const {addTodo, updateTodo, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;
