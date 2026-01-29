import {configureStore} from '@reduxjs/toolkit';
import todoReducer, {
  addTodo,
  updateTodo,
  deleteTodo,
  addTodoWithAuth,
  updateTodoWithAuth,
  deleteTodoWithAuth,
} from '../src/redux/slices/todoSlice';
import * as auth from '../src/utils/auth';

jest.mock('../src/utils/auth');

const mockAuth = auth as jest.Mocked<typeof auth>;

const createTestStore = () =>
  configureStore({
    reducer: {todo: todoReducer},
  });

describe('todoSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sync reducers', () => {
    it('addTodo adds a new todo', () => {
      const store = createTestStore();
      store.dispatch(addTodo({title: 'Test', description: 'Desc'}));

      const todos = store.getState().todo.todos;
      expect(todos).toHaveLength(1);
      expect(todos[0].title).toBe('Test');
      expect(todos[0].description).toBe('Desc');
    });

    it('updateTodo updates existing todo', () => {
      const store = createTestStore();
      store.dispatch(addTodo({title: 'Old', description: 'Old Desc'}));

      const id = store.getState().todo.todos[0].id;
      store.dispatch(updateTodo({id, title: 'New', description: 'New Desc'}));

      const todo = store.getState().todo.todos[0];
      expect(todo.title).toBe('New');
      expect(todo.description).toBe('New Desc');
    });

    it('deleteTodo removes todo', () => {
      const store = createTestStore();
      store.dispatch(addTodo({title: 'Test', description: 'Desc'}));

      const id = store.getState().todo.todos[0].id;
      store.dispatch(deleteTodo(id));

      expect(store.getState().todo.todos).toHaveLength(0);
    });
  });

  describe('auth-gated thunks', () => {
    it('addTodoWithAuth adds todo when auth succeeds', async () => {
      mockAuth.authenticateUser.mockResolvedValue(true);
      const store = createTestStore();

      await store.dispatch(
        addTodoWithAuth({title: 'Auth Test', description: 'Desc'}),
      );

      expect(store.getState().todo.todos).toHaveLength(1);
      expect(mockAuth.authenticateUser).toHaveBeenCalledTimes(1);
    });

    it('addTodoWithAuth rejects when auth fails', async () => {
      mockAuth.authenticateUser.mockResolvedValue(false);
      const store = createTestStore();

      const result = await store.dispatch(
        addTodoWithAuth({title: 'Test', description: 'Desc'}),
      );

      expect(result.type).toBe('todo/addWithAuth/rejected');
      expect(store.getState().todo.todos).toHaveLength(0);
    });

    it('deleteTodoWithAuth deletes when auth succeeds', async () => {
      const store = createTestStore();
      store.dispatch(addTodo({title: 'Test', description: 'Desc'}));
      const id = store.getState().todo.todos[0].id;

      mockAuth.authenticateUser.mockResolvedValue(true);
      await store.dispatch(deleteTodoWithAuth(id));

      expect(store.getState().todo.todos).toHaveLength(0);
    });

    it('deleteTodoWithAuth rejects when auth fails', async () => {
      const store = createTestStore();
      store.dispatch(addTodo({title: 'Test', description: 'Desc'}));
      const id = store.getState().todo.todos[0].id;

      mockAuth.authenticateUser.mockResolvedValue(false);
      const result = await store.dispatch(deleteTodoWithAuth(id));

      expect(result.type).toBe('todo/deleteWithAuth/rejected');
      expect(store.getState().todo.todos).toHaveLength(1);
    });

    it('updateTodoWithAuth updates when auth succeeds', async () => {
      const store = createTestStore();
      store.dispatch(addTodo({title: 'Old', description: 'Old Desc'}));
      const id = store.getState().todo.todos[0].id;

      mockAuth.authenticateUser.mockResolvedValue(true);
      await store.dispatch(
        updateTodoWithAuth({id, title: 'New', description: 'New Desc'}),
      );

      expect(store.getState().todo.todos[0].title).toBe('New');
    });
  });

  // Session-based auth tests: verify unlock behavior for assignment requirement
  describe('session-based auth unlock', () => {
    it('locked session -> auth success -> action succeeds and unlocks session', async () => {
      const store = createTestStore();

      // Initially locked
      expect(store.getState().todo.isUnlocked).toBe(false);

      mockAuth.authenticateUser.mockResolvedValue(true);
      const result = await store.dispatch(
        addTodoWithAuth({title: 'Test', description: 'Desc'}),
      );

      // Action succeeded
      expect(result.type).toBe('todo/addWithAuth/fulfilled');
      expect(store.getState().todo.todos).toHaveLength(1);

      // Session is now unlocked
      expect(store.getState().todo.isUnlocked).toBe(true);

      // Subsequent action should NOT call authenticateUser again
      mockAuth.authenticateUser.mockClear();
      await store.dispatch(
        addTodoWithAuth({title: 'Second', description: 'Desc2'}),
      );

      expect(mockAuth.authenticateUser).not.toHaveBeenCalled();
      expect(store.getState().todo.todos).toHaveLength(2);
    });

    it('locked session -> auth fails -> action is rejected and session stays locked', async () => {
      const store = createTestStore();

      // Initially locked
      expect(store.getState().todo.isUnlocked).toBe(false);

      mockAuth.authenticateUser.mockResolvedValue(false);
      const result = await store.dispatch(
        addTodoWithAuth({title: 'Test', description: 'Desc'}),
      );

      // Action was rejected
      expect(result.type).toBe('todo/addWithAuth/rejected');
      expect(store.getState().todo.todos).toHaveLength(0);

      // Session remains locked
      expect(store.getState().todo.isUnlocked).toBe(false);
    });
  });
});
