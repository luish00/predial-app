import { StyleSheet } from 'react-native';
import colors from '../colors';

export default StyleSheet.create({
  toggleButton: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
  },
  toggleButtonOn: {
    backgroundColor: colors.secondary,
  },
  toggleButtonOff: {
    backgroundColor: '#fff',
    flex: 1,
    height: 52,
  },
  toggleButtonIcon: {
    marginRight: 8,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  photoContainer: {
    justifyContent: 'center',
    height: 52,
  },
});
