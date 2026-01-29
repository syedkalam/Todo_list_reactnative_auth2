import React from 'react';
import {TextInput, StyleProp, TextStyle, ViewStyle} from 'react-native';
import styles from './Input.styles';

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  width?: number | string;
  height?: number;
  multiline?: boolean;
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  width = '100%',
  height,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
}) => {
  return (
    <TextInput
      style={[
        styles.input,
        {width, height: height || (multiline ? numberOfLines * 24 : 40)}, // auto height for multiline
        multiline && styles.multilineInput,
        inputStyle,
        style,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#999"
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  );
};

export default Input;
