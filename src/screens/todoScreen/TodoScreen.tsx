import React, {useState} from 'react';
import {View, Modal} from 'react-native';
import {useDispatch} from 'react-redux';

import Button from '../../components/atoms/button/Button';
import TodoForm from '../../components/molecules/todoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import {AppDispatch} from '../../redux/store';
import {
  addTodoWithAuth,
  updateTodoWithAuth,
  Todo,
} from '../../redux/slices/todoSlice';
import styles from './TodoScreen.styles';

const TodoScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  // Handle adding new todo (auth in thunk)
  const handleAddTodo = async (title: string, description: string) => {
    const result = await dispatch(addTodoWithAuth({title, description}));
    if (addTodoWithAuth.fulfilled.match(result)) {
      setModalVisible(false);
    }
  };

  // Handle updating existing todo (auth in thunk)
  const handleUpdateTodo = async (title: string, description: string) => {
    if (!editingTodo) {
      return;
    }
    const result = await dispatch(
      updateTodoWithAuth({id: editingTodo.id, title, description}),
    );
    if (updateTodoWithAuth.fulfilled.match(result)) {
      setEditingTodo(null);
      setModalVisible(false);
    }
  };

  // Open modal for editing
  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Button
        title="+ Add Todo"
        onPress={() => {
          setEditingTodo(null);
          setModalVisible(true);
        }}
      />
      <TodoList onEdit={openEditModal} />
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TodoForm
              key={editingTodo?.id ?? 'new'}
              todo={editingTodo ?? undefined}
              onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
              onCancel={() => {
                setModalVisible(false);
                setEditingTodo(null);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TodoScreen;
