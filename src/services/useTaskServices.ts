import { useCallback, useEffect, useState } from 'react';
import { useApiGet, useFetch } from '../hooks';
import { TaskProp } from '../types';

export const useCreateTaskService = () => {
  const [createdTask, setCreatedTask] = useState<TaskProp | null | undefined>(
    null,
  );
  const [createTaskLoading, setCreateTaskLoading] = useState(false);
  const [createTaskError, setCreateTaskError] = useState(false);
  const [isTaskCreated, setTaskCreated] = useState(false);
  const { post, put } = useFetch<TaskProp>();

  const resetCreteService = useCallback((loading = false) => {
    setCreateTaskLoading(loading);
    setCreateTaskError(false);
    setTaskCreated(false);
  }, []);

  const createTask = useCallback(async (body: TaskProp) => {
    resetCreteService(true);

    const { isValid, data } = await post({ path: 'task', body });

    setCreatedTask(data);
    setCreateTaskLoading(false);
    setCreateTaskError(!isValid);

    if (isValid) {
      setTaskCreated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTask = useCallback(async (body: TaskProp) => {
    resetCreteService(true);

    const { isValid, data } = await put({ path: `task/${body.Id}`, body });

    setCreatedTask(data);
    setCreateTaskLoading(false);
    setCreateTaskError(!isValid);

    if (isValid) {
      setTaskCreated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    createdTask,
    createTask,
    createTaskError,
    createTaskLoading,
    isTaskCreated,
    resetCreteService,
    updateTask,
  };
};

export const useGetTaskService = (accountId: number | undefined) => {
  const { get, isLoading, result } = useApiGet<TaskProp[]>('task');
  const [data, setData] = useState<TaskProp[]>([]);

  useEffect(() => {
    if (!result?.isValid || !result?.data) {
      result;
    }

    const filterData: TaskProp[] =
      result?.data?.map((item: TaskProp) => ({
        ...item,
        PaymentPromise: item.PaymentPromise?.split('T')[0],
      })) || [];

    setData(filterData);
  }, [result]);

  const getTasks = useCallback(() => {
    if (!accountId) {
      return;
    }

    get({ params: { accountId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return {
    data,
    getTasks,
    isLoading,
    result,
  };
};
