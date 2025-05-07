import { useState, useEffect } from 'react';
import { fetchTasksByStatus } from '@/services/api';
import { Task, TaskResponse } from '@/types';
import { getLatestTasks } from '@/lib/utils';

export function useTaskStatus(statusId: number, refreshTrigger: number = 0) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [taskData, setTaskData] = useState<TaskResponse | null>(null);
  const [latestTasks, setLatestTasks] = useState<Task[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchTasksByStatus(statusId);
      setTaskData(response);
      setLatestTasks(getLatestTasks(response.data, 10));
      setError(null);
    } catch (err: any) {
      setError(err);
      setTaskData(null);
      setLatestTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusId, refreshTrigger]);

  return {
    loading,
    error,
    taskData,
    latestTasks,
    refetch: fetchData,
  };
}