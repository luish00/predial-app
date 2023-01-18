import { useState, useCallback } from 'react';
import { Image } from 'react-native-compressor';

import { useApiGet, useApiService } from '../hooks';
import { AttachmentModel } from '../models/AttachmentModel';

export const useCreateAttachmentService = () => {
  const { apiCall } = useApiService();
  const [index, setIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [finishUploadedAttach, setFinishUploadAttach] = useState(false);

  const uploadAttachment = useCallback(
    async (attachments: AttachmentModel[]) => {
      const finish = attachments.length === 0;
      setLoading(true);
      setFinishUploadAttach(false);

      if (finish) {
        setLoading(false);
        setFinishUploadAttach(true);
        return;
      }
      const [item, ...rest] = attachments;

      const bodyBase64 = await Image.compress(`file://${item.Body}`, {
        quality: 0.6,
        returnableOutputType: 'base64',
      });

      await apiCall({
        path: 'attachment',
        body: { ...item, Body: bodyBase64.replace(/\n/g, '') },
      });

      setIndex((prev: number) => prev + 1);

      uploadAttachment(rest);
    },
    [apiCall],
  );

  const createAttachments = useCallback(
    (data: AttachmentModel[]) => {
      setIndex(0);
      uploadAttachment(data);
    },
    [uploadAttachment],
  );

  return {
    createAttachments,
    finishUploadedAttach,
    index,
    isLoading,
  };
};

export const useGetAttachmentService = () => {
  const { get, isLoading, result } = useApiGet<AttachmentModel[]>('attachment');

  const getAttachments = useCallback(
    (id: number) => {
      get({ params: { parentId: id } });
    },
    [get],
  );

  return {
    getAttachments,
    isGetAttchLoading: isLoading,
    taskAttachements: result,
  };
};
