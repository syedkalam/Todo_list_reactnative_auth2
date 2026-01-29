import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';
import {Todo} from '../../../redux/slices/todoSlice';
import styles from './TodoForm.styles';

type TodoFormProps = {
  onSubmit: (title: string, description: string) => Promise<void> | void;
  todo?: Todo; // optional, if passed → edit mode
  onCancel?: () => void; // optional for edit
};

const TodoForm: React.FC<TodoFormProps> = ({todo, onSubmit, onCancel}) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);

  const handleSubmit = async () => {
    await onSubmit(title, description);
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        style={styles.input}
      />
      <View style={styles.buttonRow}>
        {onCancel && (
          <Button title="Cancel" variant="secondary" onPress={onCancel} />
        )}
        <Button
          title={todo ? 'Update Todo' : 'Add Todo'}
          variant="primary"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default TodoForm;
