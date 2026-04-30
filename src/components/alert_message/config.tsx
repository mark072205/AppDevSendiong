import React from 'react';
import { View, Text } from 'react-native';
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';

const toastBaseStyle = {
  borderLeftWidth: 4,
  minHeight: 64,
  height: 'auto' as const,
  paddingVertical: 10,
  borderRadius: 8,
  width: '92%' as const,
  alignSelf: 'center' as const,
  backgroundColor: '#ffffff',
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.12,
  shadowRadius: 6,
  elevation: 4,
};

const text1Style = {
  fontSize: 15,
  fontWeight: '700' as const,
};

const text2Style = {
  fontSize: 14,
  lineHeight: 18,
  color: '#5e6d55',
};

const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        ...toastBaseStyle,
        borderLeftColor: '#1e3a8a',
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{ ...text1Style, color: '#1e3a8a' }}
      text2Style={text2Style}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        ...toastBaseStyle,
        borderLeftColor: '#b42318',
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{ ...text1Style, color: '#b42318' }}
      text2Style={{ ...text2Style, color: '#7a271a' }}
    />
  ),

  info: (props) => (
    <View
      style={{
        ...toastBaseStyle,
        borderLeftColor: '#5e6d55',
        borderLeftWidth: 4,
        borderWidth: 1,
        borderColor: '#d1d5db',
        paddingHorizontal: 14,
        paddingVertical: 12,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: '#5e6d55',
          marginBottom: props.text2 ? 4 : 0,
        }}
      >
        {props.text1}
      </Text>
      {!!props.text2 && (
        <Text
          style={{
            fontSize: 14,
            lineHeight: 18,
            color: '#5e6d55',
          }}
        >
          {props.text2}
        </Text>
      )}
    </View>
  ),
};

export default toastConfig;