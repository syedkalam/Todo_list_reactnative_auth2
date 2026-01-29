import React, {ReactNode} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import styles, {sizeStyles, variantStyles} from './Button.styles';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'dangerText' | 'disabled';

type ButtonProps = {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  children?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  children,
  iconLeft,
  iconRight,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
}) => {
  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: currentVariant.backgroundColor,
          borderWidth: currentVariant.borderWidth,
          borderColor: currentVariant.borderColor,
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
        },
        style,
      ]}
      onPress={onPress}
      disabled={variant === 'disabled'}>
      <View style={styles.content}>
        {iconLeft && <View style={styles.icon}>{iconLeft}</View>}
        {children ? (
          children
        ) : (
          <Text
            style={[
              styles.text,
              {color: currentVariant.color, fontSize: currentSize.fontSize},
              textStyle,
            ]}>
            {title}
          </Text>
        )}
        {iconRight && <View style={styles.icon}>{iconRight}</View>}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
