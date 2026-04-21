import type { ReactElement, ReactNode } from 'react';
import { Text, TextInput, View } from 'react-native';
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

// CustomTextInput component with optional label, left icon, and styling props

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: TextInputProps['onChangeText'];
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: ReactNode;
  inputContainerStyle?: StyleProp<ViewStyle>;
};

function CustomTextInput({
  label,
  placeholder,
  value,
  onChangeText,
  textStyle,
  containerStyle,
  leftIcon,
  inputContainerStyle,
}: Props): ReactElement {
  const hasIcon = leftIcon != null;
  return (
    <View style={containerStyle}>
      {label ? (
        <Text style={{ fontWeight: '600', marginBottom: 6, color: '#1a1a1a' }}>{label}</Text>
      ) : null}
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            paddingHorizontal: 12,
            minHeight: 48,
          },
          inputContainerStyle,
        ]}
      >
        {hasIcon ? (
          <View style={{ marginRight: 10 }}>
            {typeof leftIcon === 'string' ? (
              <Text style={{ fontSize: 18 }}>{leftIcon}</Text>
            ) : (
              leftIcon
            )}
          </View>
        ) : null}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
          style={[
            {
              flex: 1,
              paddingVertical: 12,
              fontSize: 16,
              color: '#1a1a1a',
            },
            textStyle,
          ]}
        />
      </View>
    </View>
  );
}

export default CustomTextInput;
