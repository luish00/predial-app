import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Image, Linking, Modal, TouchableHighlight, View } from 'react-native';
import {
  Camera,
  useCameraDevices,
  PhotoFile,
} from 'react-native-vision-camera';

import {
  circleWhiteIcon,
  unCheckedRadioWhiteIcon,
} from '../../../assets/icons';
import {
  flashAutoIcon,
  flashOffIcon,
  flashOnIcon,
} from '../../../assets/icons/camera';

import styles from './CameraScreen.styles';
import { log } from '../../../utilities/utils';

import { ButtonImage } from '../buttons/ButtonImage';
import { Row } from '../grids';
import { CameraTopButton } from './CameraTopButton';
import { PhotoPreview } from './PhotoPreview';

interface CameraScreenProps {
  onClose: () => void;
  onTakePhoto?: (photo?: PhotoFile) => void;
  visible: boolean;
}

enum FLASH_TYPE {
  auto,
  on,
  off,
}

const FLASH_TYPES = ['auto', 'on', 'off'];
const FLAS_IMAGES = [flashAutoIcon, flashOnIcon, flashOffIcon];

const CameraScreen: React.FC<CameraScreenProps> = ({
  onClose,
  onTakePhoto,
  visible = false,
}) => {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back!;

  const [photoInfo, setPhotoInfo] = useState<PhotoFile | null>(null);
  const [flashType, setFlashType] = useState<FLASH_TYPE | undefined>(
    FLASH_TYPE.auto,
  );

  const flash: 'auto' | 'on' | 'off' = useMemo(() => {
    const type = FLASH_TYPES[flashType || 0];

    return type;
  }, [flashType]);

  const showCamera = useMemo(() => {
    return device && !photoInfo;
  }, [device, photoInfo]);

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission === 'denied') {
      await Linking.openSettings();
    }
  }, []);

  const handleTakePhoto = useCallback(async () => {
    try {
      const photo = await camera?.current?.takePhoto({
        enableAutoStabilization: true,
        flash: flash,
      });

      setPhotoInfo(photo!);
    } catch (error) {
      log('photo', error.message);
    }
  }, [flash]);

  const handleRepeat = useCallback(() => {
    setPhotoInfo(null);
  }, []);

  const handleSavePhoto = useCallback(() => {
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

  const handleOnFlash = useCallback(() => {
    setFlashType((prev: FLASH_TYPE | undefined) => {
      switch (prev) {
        case FLASH_TYPE.auto:
          return FLASH_TYPE.on;
        case FLASH_TYPE.on:
          return FLASH_TYPE.off;
        case FLASH_TYPE.off:
          return FLASH_TYPE.auto;
        default:
          FLASH_TYPE.auto;
      }
    });
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, [requestCameraPermission]);

  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.cameraContainer}>
        {showCamera && (
          <View style={styles.cameraContainer}>
            <Camera
              ref={camera}
              device={device}
              style={styles.cameraStyle}
              isActive={true}
              photo={true}
            />

            <Row style={styles.photoButtonContainer}>
              <ButtonImage
                onPress={handleOnFlash}
                image={FLAS_IMAGES[flashType || 0]}
                buttonStyle={styles.photoFlashButton}
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

                  <Image
                    source={circleWhiteIcon}
                    style={styles.photoButtonIcon}
                  />
                </View>
              </TouchableHighlight>
            </Row>
          </View>
        )}

        {photoInfo && (
          <PhotoPreview
            handleRepeat={handleRepeat}
            handleSavePhoto={handleSavePhoto}
            photoInfo={photoInfo}
          />
        )}

        <CameraTopButton handleCancel={handleCancel} photoInfo={photoInfo} />
      </View>
    </Modal>
  );
};

export { CameraScreen };
