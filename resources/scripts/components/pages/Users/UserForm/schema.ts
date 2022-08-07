import * as yup from 'yup';

const requiredMessage = 'This field is required';
const passwordMustMatch = 'Passwords must match';
const passwordLength = 'Password must be 8-16 characters long';

export default yup.object({
  firstName: yup.string().required(requiredMessage),
  lastName: yup.string().required(requiredMessage),
  email: yup.string().required(requiredMessage),
  phone: yup.string().required(requiredMessage),
  password: yup.string().required(requiredMessage).min(8, passwordLength).max(16, passwordLength),
  confirmPassword: yup.string().required(requiredMessage)
    .oneOf([yup.ref('password')], passwordMustMatch),
  permission: yup.object({
    label: yup.string(),
    value: yup.string()
  }).required(requiredMessage),
  status: yup.object({
    label: yup.string(),
    value: yup.string()
  }).required(requiredMessage)
}).required();
