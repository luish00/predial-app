import { StyleSheet } from 'react-native';
import colors from '../../../colors';

export default StyleSheet.create({
  alignTextCenter: {
    alignItems: 'center',
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
    textAlign: 'center',
  },
});
