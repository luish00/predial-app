import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, View, Linking, TouchableHighlight } from 'react-native';
import {
  Camera,
  useCameraDevices,
  PhotoFile,
} from 'react-native-vision-camera';
import { PrimaryButton } from '../components/common/buttons/PrimaryButton';

import {
  backWhiteIcon,
  checkIcon,
  circleWhiteIcon,
  closeWhiteIcon,
  repeatWhiteIcon,
  unCheckedRadioWhiteIcon,
} from '../assets/icons';

import styles from './TaskScreen.style';
import { Label } from '../components/common/grids';

interface CameraScreenProps {
  onClose?: () => void;
  onTakePhoto?: () => void;
}

const CameraScreen: React.FC<CameraScreenProps> = ({
  onClose,
  onTakePhoto,
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
    const photo = await camera?.current?.takePhoto({
      enableAutoStabilization: true,
      flash: 'auto',
    });

    console.log('photo', photo);
    setPhotoInfo(photo!);

    if (onTakePhoto) {
      onTakePhoto();
    }
  }, [onTakePhoto]);

  const handleSavePhoto = useCallback(() => {
    console.log('save photo');
  }, []);

  const handleRepeat = useCallback(() => {
    setPhotoInfo(null);
  }, []);

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
            <TouchableHighlight
              style={styles.repeatContainer}
              onPress={handleRepeat}>
              <View>
                <Image source={repeatWhiteIcon} style={styles.repeatIcon} />

                <Label fontSize={12} color="#fff">
                  Repetir
                </Label>
              </View>
            </TouchableHighlight>

            <PrimaryButton
              alignSelf="flex-end"
              icon={checkIcon}
              onPress={handleSavePhoto}
              size="small"
              textFontSize={12}>
              Usar foto
            </PrimaryButton>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.cameraContainer}>
      <CameraComponent />

      <PhotoComponent />

      <TopButton />
    </View>
  );
};

export { CameraScreen };
