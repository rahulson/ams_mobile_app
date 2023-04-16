import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { LoginFormPayload } from '../../api';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CreateUserSchema } from '../../helper/Validation';
import Colors from '../../styles/Colors';
import { AMButton } from '../Button/AMButton';
import { Input } from './Input';

type LoginFormProps = {
  onSubmit: (d: LoginFormPayload) => void;
  LoggingInError?: string | null;
  loading: boolean;
  onNavigate?: () => void;
};

export const SignUpForm = ({ onSubmit, LoggingInError, loading, onNavigate }: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',    
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(CreateUserSchema),
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1, marginHorizontal: 14 }}>
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
              placeholder="FirstName"
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
              placeholder="LasttName"
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
    </KeyboardAvoidingView>
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
