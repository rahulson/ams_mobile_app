import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaskInput from 'react-native-mask-input';
import Colors from '../../styles/Colors';

export const Input = ({
  style = {},
  password = false,
  placeholder = '',
  error = false,
  value = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={error ? styles.InputContainterError : styles.InputContainter}>
      <MaskInput
        style={{
          ...styles.InputStyle,
          ...style,
        }}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#9d9d9d"
        secureTextEntry={password && !showPassword}
        {...props}
      />
      {password && (
        <TouchableOpacity
          style={{ width: 24, height: 24 }}
          onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <MaterialCommunityIcons name="eye-outline" size={24} color="#999999" />
          ) : (
            <MaterialCommunityIcons name="eye-off-outline" size={24} color="#999999" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainter: {
    width: '100%',
    borderColor: Colors.GRAY_BACKGROUND,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  InputContainterError: {
    width: '100%',
    borderColor: Colors.ERROR_RED,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  InputStyle: {
    fontSize: 16,
    flexGrow: 1,
    //fontFamily: 'Montserrat',
  },
});
