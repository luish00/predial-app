import { StyleSheet } from 'react-native';
import colors from '../../../../colors';

export default StyleSheet.create({
  alignTextCenter: {
    alignItems: 'center',
  },

  body: {
    color: colors.textPrimary,
    fontSize: 17,
    lineHeight: 24,
    marginTop: 20,
    textAlign: 'center',
  },

  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  content: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
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
    color: colors.textPrimeryDark,
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 24,
    textAlign: 'center',
  },
});
