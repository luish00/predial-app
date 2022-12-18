import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../../colors';

const { height, width } = Dimensions.get('screen');

export default StyleSheet.create({
  cameraContainer: {
    flex: 1,
    height: height,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: width,
  },
  cameraStyle: {
    flex: 1,
  },
  photoButtonContainer: {
    bottom: 0,
    height: 190,
    justifyContent: 'center',
    left: 0,
    marginLeft: -60,
    position: 'absolute',
    right: 0,
  },
  photoButton: {
    alignItems: 'center',
  },
  photoButtonIcon: {
    height: 60,
    width: 60,
    position: 'relative',
    top: 10,
  },
  photoButtonOuter: {
    height: 80,
    width: 80,
    position: 'absolute',
    alignSelf: 'center',
  },
  photoFlashButton: {
    marginRight: 30,
    paddingTop: 30,
  },
  photoStyle: {
    height: height,
    width: width,
  },
  photoTakenActions: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#eee',
    bottom: 50,
    flex: 1,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    position: 'absolute',
    width: width,
  },
  photoTakenActionsWidth: {
    width: 100,
  },
  repeatContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  repeatIcon: {
    tintColor: colors.secondary,
    height: 30,
    width: 30,
  },
});
