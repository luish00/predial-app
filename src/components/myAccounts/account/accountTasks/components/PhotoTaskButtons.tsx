import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { PhotoFile } from 'react-native-vision-camera';

import { AttachmentModel } from '../../../../../models/AttachmentModel';
import { AttachmentType } from '../../../../../types.d';
import { CameraScreen } from '../../../../common/camera';
import { Label } from '../../../../common/grids';

interface PhotoButtonProps {
  label: string;
  onPress?: () => void;
  count: number;
}

const styles = StyleSheet.create({
  photoContainer: {
    height: 50,
    justifyContent: 'center',
  },
});

const PhotoButton: React.FC<PhotoButtonProps> = ({
  label,
  onPress,
  count = 0,
}) => {
  return (
    <>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.photoContainer}>
          <Label fontWeight="bold" fontSize={20}>
            {label}
          </Label>
        </View>
      </TouchableNativeFeedback>

      {count > 0 && (
        <TouchableNativeFeedback onPress={onPress}>
          <View>
            <Label fontWeight="bold" textAlign="right" fontSize={15}>
              {`Pendiente por subir ${count}`}
            </Label>
          </View>
        </TouchableNativeFeedback>
      )}
    </>
  );
};

export const PhotoTaskButtons = ({
  isPersonalNotify = false,
  accountDetailsId = 0,
  taskId = '',
}) => {
  const [showTakePhoto, setShowTakePhoto] = useState(null);
  const [photos, setPhotos] = useState<AttachmentModel[]>([]);

  const onSavePhoto = useCallback(
    (data?: PhotoFile) => {
      console.log('onSavePhoto', data?.path);

      if (!data) {
        return;
      }

      setPhotos(prev => {
        const newState = [
          ...prev,
          new AttachmentModel({
            AccountId: String(accountDetailsId),
            Body: data.path,
            ParentId: taskId,
            Type: showTakePhoto || AttachmentType.Evidencia,
          }),
        ];

        return newState;
      });
    },
    [accountDetailsId, showTakePhoto, taskId],
  );

  console.log('img', photos)

  const photoTypeCount = useCallback(
    (type: string): number => {
      return photos.filter(item => item.Type === type).length;
    },
    [photos],
  );

  return (
    <>
      {isPersonalNotify && (
        <PhotoButton
          count={photoTypeCount(AttachmentType.Identificacion)}
          label="Foto identificación"
          onPress={() => setShowTakePhoto(AttachmentType.Identificacion)}
        />
      )}

      <PhotoButton
        count={photoTypeCount(AttachmentType.Evidencia)}
        label="Foto evidencia"
        onPress={() => setShowTakePhoto(AttachmentType.Evidencia)}
      />

      <PhotoButton
        count={photoTypeCount(AttachmentType.Predio)}
        label="Foto del predio"
        onPress={() => setShowTakePhoto(AttachmentType.Predio)}
      />

      <CameraScreen
        visible={!!showTakePhoto}
        onClose={() => setShowTakePhoto(null)}
        onTakePhoto={onSavePhoto}
      />
    </>
  );
};
