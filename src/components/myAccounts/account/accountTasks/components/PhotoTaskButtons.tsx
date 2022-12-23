import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { PhotoFile } from 'react-native-vision-camera';
import colors from '../../../../../colors';

import { AttachmentModel } from '../../../../../models/AttachmentModel';
import { AttachmentType } from '../../../../../types.d';
import { CameraScreen } from '../../../../common/camera';
import { Label, Row } from '../../../../common/grids';

interface PhotoButtonProps {
  count: number;
  countUppload: number;
  isLoading?: boolean;
  label: string;
  onPress?: () => void;
}

interface PhotoTaskButtonsProps {
  accountDetailsId: number | undefined;
  isLoading?: boolean;
  isPersonalNotify: boolean;
  photos: AttachmentModel[];
  setPhotos: React.Dispatch<React.SetStateAction<AttachmentModel[]>>;
  taskId?: string;
  uploadedPhotos: AttachmentModel[];
}

const styles = StyleSheet.create({
  photoContainer: {
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.secondary,
    paddingHorizontal: 8,
    marginBottom: 2,
  },
});

const PhotoButton: React.FC<PhotoButtonProps> = ({
  count = 0,
  countUppload = 0,
  isLoading = false,
  label,
  onPress,
}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.photoContainer}>
          <Label fontWeight="bold" fontSize={20}>
            {label}
          </Label>
        </View>
      </TouchableOpacity>

      <Row justifyContent="space-between">
        <Row>
          {(isLoading || countUppload > 0) && (
            <Label fontWeight="bold" textAlign="right" fontSize={15}>
              {`Fotos subidas: ${countUppload || ''}`}
            </Label>
          )}
          {isLoading && (
            <ActivityIndicator size="small" color={colors.secondary} />
          )}
        </Row>

        {count > 0 && (
          <View>
            <Label fontWeight="bold" textAlign="right" fontSize={15}>
              {`Pendiente por subir: ${count}`}
            </Label>
          </View>
        )}
      </Row>
    </>
  );
};

export const PhotoTaskButtons: React.FC<PhotoTaskButtonsProps> = ({
  accountDetailsId = 0,
  isLoading,
  isPersonalNotify = false,
  photos = [],
  setPhotos,
  taskId = '',
  uploadedPhotos = [],
}) => {
  const [showTakePhoto, setShowTakePhoto] = useState(null);

  const onSavePhoto = useCallback(
    (data?: PhotoFile) => {
      if (!data) {
        return;
      }

      setPhotos((prev: AttachmentModel[]) => {
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
    [accountDetailsId, setPhotos, showTakePhoto, taskId],
  );

  const photoTypeCount = useCallback(
    (type: string): number => {
      return photos.filter(item => item.Type === type).length;
    },
    [photos],
  );

  const photoUploadedTypeCount = useCallback(
    (type: string): number => {
      if (!uploadedPhotos) {
        return 0;
      }

      return uploadedPhotos.filter(item => item.Type === type).length;
    },
    [uploadedPhotos],
  );

  return (
    <>
      {isPersonalNotify && (
        <PhotoButton
          countUppload={photoUploadedTypeCount(AttachmentType.Identificacion)}
          count={photoTypeCount(AttachmentType.Identificacion)}
          isLoading={isLoading}
          label="Foto identificación"
          onPress={() => setShowTakePhoto(AttachmentType.Identificacion)}
        />
      )}

      <PhotoButton
        countUppload={photoUploadedTypeCount(AttachmentType.Evidencia)}
        count={photoTypeCount(AttachmentType.Evidencia)}
        isLoading={isLoading}
        label="Foto evidencia"
        onPress={() => setShowTakePhoto(AttachmentType.Evidencia)}
      />

      <PhotoButton
        countUppload={photoUploadedTypeCount(AttachmentType.Predio)}
        count={photoTypeCount(AttachmentType.Predio)}
        isLoading={isLoading}
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
