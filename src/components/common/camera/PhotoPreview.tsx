import React from 'react';
import { View, Image } from 'react-native';
import { PhotoFile } from 'react-native-vision-camera';

import { PrimaryButton } from '../buttons/PrimaryButton';

import colors from '../../../colors';
import styles from './CameraScreen.styles';

interface Props {
  handleRepeat: () => void;
  handleSavePhoto: () => void;
  photoInfo?: PhotoFile;
}

const PhotoPreview: React.FC<Props> = ({
  handleRepeat,
  handleSavePhoto,
  photoInfo,
}) => (
  <View style={styles.cameraContainer}>
    <Image
      source={{ uri: `file://${photoInfo?.path}` }}
      style={styles.photoStyle}
    />

    <View style={styles.photoTakenActions}>
      <PrimaryButton
        onPress={handleRepeat}
        borderLess
        size="small"
        style={styles.photoTakenActionsWidth}
        textColor={colors.textPrimary}
        textFontSize={20}>
        Repetir
      </PrimaryButton>

      <PrimaryButton
        onPress={handleSavePhoto}
        borderLess
        size="small"
        style={styles.photoTakenActionsWidth}
        textColor={colors.secondary}
        textFontSize={20}>
        Usar foto
      </PrimaryButton>
    </View>
  </View>
);

export { PhotoPreview };
