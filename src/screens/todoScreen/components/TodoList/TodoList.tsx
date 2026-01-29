import React from 'react';
import {FlatList, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import TodoItem from '../../../../components/molecules/todoItem/TodoItem';
import styles from './TodoList.styles';
import {AppDispatch, RootState} from '../../../../redux/store';
import {deleteTodoWithAuth} from '../../../../redux/slices/todoSlice';

type Props = {
  onEdit: (todo: any) => void;
};

const TodoList: React.FC<Props> = ({onEdit}) => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => dispatch(deleteTodoWithAuth(id));

  if (todos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No todos yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TodoItem
          title={item.title}
          description={item.description}
          onDelete={() => handleDelete(item.id)}
          onEdit={() => onEdit(item)}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default TodoList;
