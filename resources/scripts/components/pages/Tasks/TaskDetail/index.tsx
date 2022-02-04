import { AppDispatch } from '@store/index';
import { AxiosResponse } from 'axios';
import { TASK_STATUS } from '../../../../configs/constants';
import { Task } from '../../../../interfaces/Task';
import { newTaskSchema } from '@containers/Tasks/schemas';
import { styled } from '@mui/material/styles';
import { taskActions } from '@store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/system/Box';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import FormTextarea from '@components/form/FormTextarea';
import React, { Fragment, useEffect } from 'react';
import TaskService from '../../../../services/TaskService';
import styles from './styles.module.scss';

export interface TaskDetailProps extends DrawerProps {
  task: Task;
}

const StyledDrawer = styled(Drawer)<DrawerProps>(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 400,
    padding: theme.spacing(2)
  }
}));

const TaskDetail = (props: TaskDetailProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { task, onClose, ...restProps } = props;

  useEffect(() => {
    if (task) {
      // Conflict react-hook-form type so have to mark as any
      Object.keys(task).forEach((key: any) => {
        setValue(key, task[key as keyof Task]);
      });
    }
  }, [task]);

  // React hook form
  const { control, setValue, getValues, trigger } = useForm({
    defaultValues: { title: '', description: '' },
    resolver: yupResolver(newTaskSchema)
  });

  const handleUpdateTask = async () => {
    try {
      const validated = await trigger();
      if (task.status !== TASK_STATUS.DONE && validated) {
        const updatedTask = getValues() as Task;
        const { data }: AxiosResponse = await TaskService.updateTask({
          ...updatedTask,
          task_id: updatedTask.taskId
        });
        if (data?.success) {
          dispatch(taskActions.updateTask(updatedTask as Task));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <Fragment>
    <StyledDrawer {...restProps} anchor="right" onClose={onClose}>
      <FormTextarea
        name="title"
        control={control}
        placeholder="Title"
        className={styles.task__title}
        disabled={task?.status === TASK_STATUS.DONE}
      />
      <FormTextarea
        name="description"
        control={control}
        className={styles.task__description}
        placeholder="Description"
        disabled={task?.status === TASK_STATUS.DONE}
      />
      <Box><button onClick={handleUpdateTask}>Click me</button></Box>
    </StyledDrawer>
  </Fragment>;
};

export default TaskDetail;
