import type { ReactElement } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

function CustomButton({ containerStyle, textStyle, label, onPress, disabled }: Props): ReactElement {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <Text style={textStyle}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CustomButton;
