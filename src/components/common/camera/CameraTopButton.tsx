import React from 'react';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';
import { PhotoFile } from 'react-native-vision-camera';

import { backWhiteIcon, closeWhiteIcon } from '../../../assets/icons';

interface Props {
  handleCancel: () => void;
  photoInfo: PhotoFile | null;
}

const styles = StyleSheet.create({
  closeCamera: {
    left: 10,
    position: 'absolute',
    top: 20,
  },
  closeIcon: {
    tintColor: '#222',
    height: 30,
    width: 30,
  },
});

const CameraTopButton: React.FC<Props> = ({ handleCancel, photoInfo }) => {
  const icon = photoInfo ? backWhiteIcon : closeWhiteIcon;

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      onPress={handleCancel}
      style={styles.closeCamera}
      underlayColor="transparent">
      <Image source={icon} style={styles.closeIcon} />
    </TouchableHighlight>
  );
};

export { CameraTopButton };
