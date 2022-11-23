import { StyleSheet } from 'react-native';
import colors from '../../../colors';

export default StyleSheet.create({
  alignTextCenter: {
    alignItems: 'center',
  },

  body: {
    color: colors.textPrimary,
    fontSize: 17,
    lineHeight: 24,
    marginTop: 10,
    textAlign: 'left',
  },

  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25,
  },

  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
    width: '100%',
  },

  overlay: {
    alignItems: 'center',
    backgroundColor: '#202020b3',
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },

  secondaryButton: {
    marginRight: 8,
  },

  title: {
    color: colors.textPrimaryDark,
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 24,
    paddingBottom: 16,
    textAlign: 'left',
  },

  titleScreen: {
    color: colors.textPrimaryDark,
    padding: 16,
    borderBottomColor: '#999',
    elevation: 2,
    borderBottomWidth: 1,
    margin: -2,
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 24,
    textAlign: 'left',
  },

  modalLoadingContainer: {
    width: '70%',
  },

  modalLoadingLottie: {
    alignSelf: 'center',
    height: 160,
  },
});
