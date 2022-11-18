import { StyleSheet } from 'react-native';
import colors from '../../colors';

export default StyleSheet.create({
  appName: {
    fontSize: 20,
  },
  container: {
    padding: 16,
  },
  containerError: {
    backgroundColor: colors.inputError,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
  },
  containerButtons: {
    paddingTop: 20,
  },
  containerInputs: {
    paddingHorizontal: 30,
  },
  image: {
    backgroundColor: 'red',
    height: 130,
    marginTop: 8,
    marginBottom: 32,
    width: '98%',
  },
  forgotButton: {
    marginTop: 16,
  },
});
