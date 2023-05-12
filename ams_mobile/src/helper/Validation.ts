import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup); // extend yup

export const LogInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

export const CreateUserSchema = Yup.object().shape({
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    department: Yup.string().required('Required'),
    semester: Yup.array().of(Yup.string()).required('Required'),
    role: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too Short!').required('Required'),
    confirmPassword: Yup
    .string()
    .required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.')
});