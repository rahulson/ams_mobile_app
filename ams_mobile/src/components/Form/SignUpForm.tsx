import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { SignupFormPayload } from '../../api';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CreateUserSchema } from '../../helper/Validation';
import Colors from '../../styles/Colors';
import { AMButton } from '../Button/AMButton';
import { Input } from './Input';
import AutocompleteSelect from '../AutocompleteSelect';
import { DEPARTMENT, SEMESTER } from '../../constants/AppConstant';
import isEmpty from 'lodash/isEmpty'
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type LoginFormProps = {
  onSubmit: (d: SignupFormPayload) => void;
  LoggingInError?: string | null;
  loading: boolean;
  onNavigate?: () => void;
};

export const SignUpForm = ({ onSubmit, LoggingInError, loading, onNavigate }: LoginFormProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Student', value: 'student'},
    {label: 'Teacher', value: 'teacher'}
  ]);
  const [isShowDepartment, setShowDepartment] = useState(false);
  const [department, setDepartment] = useState(null);
  const [departmentList, setDepartmentList] = useState([
    {label: 'Electronics and Communication', value: 'Electronics and Communication'},
    {label: 'Information Technology', value: 'Information Technology'},
    {label: 'Computer Science', value: 'Computer Science'}
  ]);

  const [isShowSemester, setShowSemester] = useState(false);
  const [semester, setSemester] = useState(null);
  const [semesterList, setSemesterList] = useState([
    {label: 'Semester I', value: 'Semester I'},
    {label: 'Semester II', value: 'Semester II'},
    {label: 'Semester III', value: 'Semester III'},
    {label: 'Semester IV', value: 'Semester IV'},
    {label: 'Semester V', value: 'Semester V'},
    {label: 'Semester VI', value: 'Semester VI'},
    {label: 'Semester VII', value: 'Semester VII'},
    {label: 'Semester VIII', value: 'Semester VIII'},
  ]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      department: '',
      semester: [],
      email: '',
      password: '',
      confirmPassword: '',
      role: ''
    },
    resolver: yupResolver(CreateUserSchema),
  });

  const fetchDepartment = async (text: string) => {
    if (isEmpty(text)) {
      return DEPARTMENT
    }
    const arr = DEPARTMENT.filter((item) => item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1)
    return arr
  }

  const fetchSemester = async (text: string) => {
    if (isEmpty(text)) {
      return SEMESTER
    }
    const arr = SEMESTER.filter((item) => item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1)
    return arr
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1, marginHorizontal: 14 }}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: hp(2), marginTop: hp(2) }}>
            <Input
              autoCompleteType="firstname"
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="First Name"
              error={errors['firstname'] ? true : false}
            />
            {errors['firstname'] && (
              <Text style={styles.ErrorTextStyle}>{errors['firstname'].message}</Text>
            )}
          </View>
        )}
        name="firstname"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: hp(2) }}>
            <Input
              autoCompleteType="lastname"
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Lastt Name"
              error={errors['lastname'] ? true : false}
            />
            {errors['lastname'] && (
              <Text style={styles.ErrorTextStyle}>{errors['lastname'].message}</Text>
            )}
          </View>
        )}
        name="lastname"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: hp(2), zIndex: 100 }}>
            <DropDownPicker
              open={isShowDepartment}
              value={department}
              items={departmentList}
              setOpen={setShowDepartment}
              setValue={setDepartment}
              setItems={setDepartmentList}
              placeholder='Department'
              multiple={false}
              onSelectItem={(item) => onChange(item.value)}
            />
            {errors['department'] && (
              <Text style={styles.ErrorTextStyle}>{errors['department'].message}</Text>
            )}
          </View>
        )}
        name="department"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: hp(2), zIndex: 90 }}>
            <DropDownPicker
              open={isShowSemester}
              value={semester}
              items={semesterList}
              setOpen={setShowSemester}
              setValue={setSemester}
              setItems={setSemesterList}
              placeholder='Semester'
              multiple={false}
              onSelectItem={(item) => onChange([item.value])}
            />
            {errors['semester'] && (
              <Text style={styles.ErrorTextStyle}>{errors['semester'].message}</Text>
            )}
          </View>
        )}
        name="semester"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: hp(2) }}>
            <Input
              autoCompleteType="email"
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Email"
              error={errors['email'] ? true : false}
            />
            {errors['email'] && (
              <Text style={styles.ErrorTextStyle}>{errors['email'].message}</Text>
            )}
          </View>
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: hp(2) }}>
            <Input
              autoCompleteType="password"
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              password
              placeholder="Password"
              error={errors['password'] ? true : false}
            />
            {errors['password'] && (
              <Text style={styles.ErrorTextStyle}>{errors['password'].message}</Text>
            )}
          </View>
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: hp(2) }}>
            <Input
              autoCompleteType="confirmPassword"
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              password
              placeholder="Confirm Password"
              error={errors['confirmPassword'] ? true : false}
            />
            {errors['confirmPassword'] && (
              <Text style={styles.ErrorTextStyle}>{errors['confirmPassword'].message}</Text>
            )}
          </View>
        )}
        name="confirmPassword"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur } }) => (
          <View style={{ marginBottom: hp(2), zIndex: 1000 }}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder='Role'
              multiple={false}
              onSelectItem={(item) => onChange(item.value)}
            />
            {errors['role'] && (
              <Text style={styles.ErrorTextStyle}>{errors['role'].message}</Text>
            )}
          </View>
        )}
        name="role"
      />
      {LoggingInError && (
        <View>
          <Text style={styles.ErrorTextStyle}>{LoggingInError}</Text>
        </View>
      )}
      <View
        style={{
          marginTop: hp(3)


        }}>
        <AMButton onPress={handleSubmit(onSubmit)} text="SignUp" />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  ErrorTextStyle: {
    color: Colors.ERROR_RED,
  },
  forgotPassword: {
    color: Colors.BH_Dark_Blue,
    textAlign: 'left',
    marginTop: hp(1),
  },
});
