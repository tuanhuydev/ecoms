import { AxiosResponse } from 'axios';
import { EMPTY_STRING } from '../../configs/constants';
import { TASK_STATUS } from '../../configs/enums';
import { Task } from '../../interfaces/Task';
import { selectBacklogTasks, taskActions } from '@store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@mui/material/Button';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PageContainer from '@components/base/PageContainer';
import React, { useEffect, useState } from 'react';
import TaskService from '@services/TaskService';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Overview() {
  const dispatch = useDispatch();
  const tasks = selectBacklogTasks();

  useEffect(() => {
    dispatch(taskActions.fetchTasks());
  }, []);

  const [taskTitle, setTitle] = useState(EMPTY_STRING);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleAddTask = async () => {
    try {
      if (taskTitle) {
        const newTask: Partial<Task> = { title: taskTitle, status: TASK_STATUS.BACKLOG };
        const { data }: AxiosResponse = await TaskService.createTask(newTask);
        if (data?.id) {
          dispatch(taskActions.addTask({ id: data?.id, ...newTask } as Task));
          setTitle(EMPTY_STRING);
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <PageContainer title="Overview">
      Overview
    </PageContainer>
  );
}
