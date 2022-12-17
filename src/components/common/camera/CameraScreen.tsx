import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Linking, Modal, TouchableHighlight, View } from 'react-native';
import {
  Camera,
  useCameraDevices,
  PhotoFile,
} from 'react-native-vision-camera';
import { PrimaryButton } from '../buttons/PrimaryButton';

import {
  backWhiteIcon,
  circleWhiteIcon,
  closeWhiteIcon,
  unCheckedRadioWhiteIcon,
} from '../../../assets/icons';

import styles from './CameraScreen.styles';
import { log } from '../../../utilities/utils';
import colors from '../../../colors';

interface CameraScreenProps {
  onClose: () => void;
  onTakePhoto?: (photo?: PhotoFile) => void;
  visible: boolean;
}

const CameraScreen: React.FC<CameraScreenProps> = ({
  onClose,
  onTakePhoto,
  visible = false,
}) => {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back!;

  const [photoInfo, setPhotoInfo] = useState<PhotoFile | null>(null);

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission === 'denied') {
      await Linking.openSettings();
    }
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, [requestCameraPermission]);

  const handleTakePhoto = useCallback(async () => {
    console.log('cilck');

    try {
      const photo = await camera?.current?.takePhoto({
        enableAutoStabilization: true,
        flash: 'auto',
      });

      setPhotoInfo(photo!);
    } catch (error) {
      log('photo', error.message);
    }
  }, []);

  const handleRepeat = useCallback(() => {
    setPhotoInfo(null);
  }, []);

  const handleSavePhoto = useCallback(() => {
    console.log('save photo');

    if (onTakePhoto && photoInfo) {
      onTakePhoto(photoInfo);
    }

    onClose();
    handleRepeat();
  }, [handleRepeat, onClose, onTakePhoto, photoInfo]);

  const handleCancel = useCallback(() => {
    if (photoInfo) {
      handleRepeat();
    } else {
      if (onClose) {
        onClose();
      }
    }
  }, [handleRepeat, onClose, photoInfo]);

  const TopButton: React.FC = () => {
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

  const CameraComponent: React.FC = () => {
    if (device && !photoInfo) {
      return (
        <View style={styles.cameraContainer}>
          <Camera
            ref={camera}
            device={device}
            style={styles.cameraStyle}
            isActive={true}
            photo={true}
          />

          <TouchableHighlight
            activeOpacity={0.6}
            onPress={handleTakePhoto}
            style={styles.photoButton}
            underlayColor="transparent">
            <View pointerEvents="none">
              <Image
                source={unCheckedRadioWhiteIcon}
                style={styles.photoButtonOuter}
              />

              <Image source={circleWhiteIcon} style={styles.photoButtonIcon} />
            </View>
          </TouchableHighlight>
        </View>
      );
    }

    return null;
  };

  const PhotoComponent: React.FC = () => {
    if (photoInfo) {
      return (
        <View style={styles.cameraContainer}>
          <Image
            source={{ uri: `file://${photoInfo.path}` }}
            style={styles.photoStyle}
          />

          <View style={styles.photoTakenActions}>
            <PrimaryButton
              onPress={handleRepeat}
              borderLess
              size="small"
              style={{ width: 100 }}
              textColor={colors.textPrimary}
              textFontSize={20}>
              Repetir
            </PrimaryButton>

            <PrimaryButton
              onPress={handleSavePhoto}
              borderLess
              size="small"
              style={{ width: 100 }}
              textColor={colors.secondary}
              textFontSize={20}>
              Usar foto
            </PrimaryButton>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.cameraContainer}>
        <CameraComponent />

        <PhotoComponent />

        <TopButton />
      </View>
    </Modal>
  );
};

export { CameraScreen };
