import { useCallback, useEffect, useState } from 'react';
import { useApiGet, useFetch } from '../../../../../hooks';
import { TaskProp } from '../../../../../types';

export const useCreateTaskService = () => {
  const [createTaskLoading, setCreateTaskLoading] = useState(false);
  const [createTaskError, setCreateTaskError] = useState(false);
  const [isTaskCreated, setTaskCreated] = useState(false);
  const { post, put } = useFetch();

  const resetCreteService = useCallback((loading = false) => {
    setCreateTaskLoading(loading);
    setCreateTaskError(false);
    setTaskCreated(false);
  }, []);

  const createTask = useCallback(async (body: TaskProp) => {
    resetCreteService(true);

    const { isValid, data } = await post({ path: 'task', body });

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

    setCreateTaskLoading(false);
    setCreateTaskError(!isValid);

    if (isValid) {
      setTaskCreated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    createTask,
    createTaskError,
    createTaskLoading,
    isTaskCreated,
    resetCreteService,
    updateTask,
  };
};

export const useGetTaskService = (accountId: number | undefined) => {
  const { get, isLoading, result } = useApiGet<TaskProp>('task');

  const getTasks = useCallback(() => {
    if (!accountId) {
      return;
    }

    get({ params: { accountId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  useEffect(() => {
    console.log('get taks');

    getTasks();
  }, [getTasks]);

  return {
    getTasks,
    isLoading,
    result,
  };
};
