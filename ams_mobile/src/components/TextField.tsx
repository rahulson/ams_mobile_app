import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Color from '../styles/Colors';
import { Input } from './Form/Input';

type FormInputProps = {
  control: any;
  name: string;
  isError?: boolean;
  errorMessage?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  multiline?: boolean;
  placeholder?: string;
  numberOfLines?: number;
};

const FormInput = ({
  control,
  name,
  isError,
  errorMessage,
  style,
  inputStyle = {},
  placeholder = '',
  multiline = false,
  numberOfLines = 1,
  ...restProps
}: FormInputProps) => {
  const inputStyles = { ...{ height: hp(3.5) }, ...inputStyle };
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={style}>
          <Input
            autoCompleteType={name}
            autoCapitalize="none"
            style={inputStyles}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}
            error={isError}
            multiline={multiline}
            numberOfLines={numberOfLines}
            {...restProps}
          />
          {isError && <Text style={styles.ErrorTextStyle}>{errorMessage}</Text>}
        </View>
      )}
      name={name}
    />
  );
};

const styles = StyleSheet.create({
  ErrorTextStyle: {
    color: Color.ERROR_RED,
    marginTop: hp(1),
  },
});

export default FormInput;
