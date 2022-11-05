import { StyleSheet } from 'react-native';
import colors from '../../../colors';

export const stylesPrimary = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    marginVertical: 1,
    paddingHorizontal: 8,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export const stylesBorderLess = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 52,
    justifyContent: 'center',
    marginVertical: 1,
    minWidth: 100,
    paddingHorizontal: 8,
  },
  text: {
    color: colors.primaryDark,
    fontSize: 20,
    fontWeight: 'bold',
  },
});