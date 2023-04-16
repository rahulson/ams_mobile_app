import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { LoginFormPayload } from '../../api';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LogInSchema } from '../../helper/Validation';
import Colors from '../../styles/Colors';
import { AMButton } from '../Button/AMButton';
import { Input } from './Input';


type LoginFormProps = {
  onSubmit: (d: LoginFormPayload) => void;
  LoggingInError?: string | null;
  loading: boolean;
  onNavigate?: () => void;
  onNavigateToSignUp?: () => void;
};

export const LogInForm = ({ onSubmit, LoggingInError, loading, onNavigate, onNavigateToSignUp }: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LogInSchema),
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

      {LoggingInError && (
        <View>
          <Text style={styles.ErrorTextStyle}>{LoggingInError}</Text>
        </View>
      )}
      <Text onPress={onNavigate} style={styles.forgotPassword}>
        Forgot Password?
      </Text>
      <View
        style={{
          marginTop: hp(3)


        }}>
        <AMButton onPress={handleSubmit(onSubmit)} text="LOGIN" />
      </View>
      <View
        style={{
          marginTop: hp(1)


        }}>
        <AMButton onPress={onNavigateToSignUp} text="REGISTER" />
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
