import * as yup from 'yup';

const requiredMessage = 'This field is required';
const passwordMustMatch = 'Passwords must match';
const passwordLength = 'Password must be 8-16 characters long';

const baseSchema = {
  firstName: yup.string().required(requiredMessage),
  lastName: yup.string().required(requiredMessage),
  email: yup.string().required(requiredMessage),
  avatar: yup.string().nullable(),
  permission: yup.object({
    label: yup.string(),
    value: yup.string()
  }).required(requiredMessage),
  status: yup.object({
    label: yup.string(),
    value: yup.string()
  }).required(requiredMessage)
};

export const editSchema = yup.object(baseSchema);

export const createSchema = yup.object({
  ...baseSchema,
  password: yup.string().required(requiredMessage).min(8, passwordLength).max(16, passwordLength),
  confirmPassword: yup.string().required(requiredMessage).oneOf([yup.ref('password')], passwordMustMatch)
});
