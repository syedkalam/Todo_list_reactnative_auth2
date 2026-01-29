import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styles from './TodoItem.styles';
import Button from '../../atoms/button/Button';

type Props = {
  title: string;
  description: string;
  onDelete: () => void;
  onEdit: () => void;
};

const TodoItem: React.FC<Props> = ({title, description, onDelete, onEdit}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.actions}>
        {/* Edit Icon */}
        <Button
          variant="secondary"
          onPress={onEdit}
          title="Edit"
          style={styles.iconButton}
          size={'small'}
        />

        {/* Delete Icon */}
        <Button
          variant="dangerText"
          onPress={onDelete}
          title="Remove"
          style={styles.iconButton}
          size={'small'}
        />
      </View>
    </View>
  );
};

export default memo(TodoItem);
