import { ActivityIndicator, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../styles/Colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export type AMButtonProps = {
  onPress: (any?: any) => void;
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
};

export const AMButton = ({ onPress, text, style, loading, textStyle }: AMButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    {loading !== null ? (
      <View style={{ ...styles.buttonStyle, ...style }}>
        {loading ? (
          <View>
            <ActivityIndicator color={Colors.BLACK_BACKGROUND} size="small" />
          </View>
        ) : (
          <Text style={{ ...styles.textStyle, ...textStyle }}>{text}</Text>
        )}
      </View>
    ) : (
      <View style={{ ...styles.buttonStyle, ...style }}>
        <Text style={{ ...styles.textStyle, ...textStyle }}>{text}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 2,
    width: '100%',
    height: 53,
    backgroundColor: Colors.Pink,
    marginBottom: 20,
  },
  textStyle: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontSize: hp(2.1),
    fontWeight: '500'
  },
});
