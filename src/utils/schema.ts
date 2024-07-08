import * as yup from 'yup';

export const schema = yup.object().shape({
  todo: yup
    .string()
    .required('This field is required')
    .min(3, 'Your task is more than 3 letters'),
});
