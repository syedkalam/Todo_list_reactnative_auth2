import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 6,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#8e8e93',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 8,
  },
});
