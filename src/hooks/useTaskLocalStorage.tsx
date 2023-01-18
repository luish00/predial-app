import { useEffect } from 'react';
import { AttachmentTaskStorage } from '../models/AttachmentModel';
import { getStorePhotoTask, storePhotoTask } from '../utilities/store';

type CallbackType = (_: AttachmentTaskStorage[]) => void | undefined;

export const useTaskLocalStorage = (callback: CallbackType) => {
  useEffect(() => {
    if (!callback) {
      return;
    }

    const read = async () => {
      const taskPhotos = await getStorePhotoTask();

      if (taskPhotos) {
        callback(taskPhotos);
      }
    };

    read();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { storePhotoTask };
};
