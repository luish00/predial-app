import { StyleSheet } from 'react-native';
import colors from '../../../../colors';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    borderBottomColor: colors.secondaryDark,
    borderBottomWidth: 2.5,
    flex: 1,
    paddingBottom: 4,
    fontSize: 18,
    color: colors.textPrimaryDark,
  },
  inputFocused: {
    borderBottomColor: colors.primaryDark,
  },
  inputError: {
    borderBottomColor: colors.inputError,
  },
  inputDisabled: {
    borderBottomColor: '#222',
  },
  imageContainer: {
    borderBottomColor: colors.secondaryDark,
    borderBottomWidth: 2.5,
    paddingRight: 8,
  },
});
