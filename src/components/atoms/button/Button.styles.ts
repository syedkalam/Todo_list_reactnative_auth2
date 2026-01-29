import {StyleSheet, Platform} from 'react-native';

export const variantStyles = {
  primary: {
    backgroundColor: '#007AFF',
    color: '#fff',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  secondary: {
    backgroundColor: '#fff',
    color: '#007AFF',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  danger: {
    backgroundColor: '#FF3B30',
    color: '#fff',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  dangerText: {
    backgroundColor: 'transparent',
    color: '#FF3B30',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  disabled: {
    backgroundColor: '#E5E5EA',
    color: '#8e8e93',
    borderWidth: 0,
    borderColor: 'transparent',
  },
};

export const sizeStyles = {
  small: {paddingVertical: 6, paddingHorizontal: 12, fontSize: 13},
  medium: {paddingVertical: 14, paddingHorizontal: 20, fontSize: 16},
  large: {paddingVertical: 16, paddingHorizontal: 24, fontSize: 17},
};

export default StyleSheet.create({
  button: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: '#007AFF',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginHorizontal: 4,
  },
});
