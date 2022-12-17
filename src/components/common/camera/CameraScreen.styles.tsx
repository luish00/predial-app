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
  closeCamera: {
    left: 10,
    position: 'absolute',
    top: 20,
  },
  closeIcon: {
    tintColor: colors.secondary,
    height: 30,
    width: 30,
  },
  photoButton: {
    position: 'absolute',
    alignItems: 'center',
    bottom: height * 0.2,
    left: 0,
    right: 0,
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
  photoStyle: {
    height: height,
    width: width,
  },
  photoTakenActions: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#eee',
    bottom: 50,
    height: 70,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    position: 'absolute',
    width: width,
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
