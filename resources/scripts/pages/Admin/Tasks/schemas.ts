import * as yup from 'yup';

export const newTaskSchema = yup
  .object({
    title: yup.string().required()
  })
  .required();
