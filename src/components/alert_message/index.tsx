import Toast from 'react-native-toast-message';
import type { ToastShowParams } from 'react-native-toast-message';

interface AlertMessageProps {
  title?: string;
  message?: string;
  type?: ToastShowParams['type'];
  position?: 'top' | 'bottom';
  visibilityTime?: number;
}

const showToast = ({
  title,
  message,
  type = 'info',
  position = 'top',
  visibilityTime = 3000,
}: AlertMessageProps) => {
  Toast.show({
    text1: title,
    text2: message,
    type,
    position,
    visibilityTime,
  });
};

export const showError = (props: Omit<AlertMessageProps, 'type'>) => {
  showToast({ ...props, type: 'error' });
};

export const showSuccess = ({
  title,
  message,
  position,
  visibilityTime,
}: Omit<AlertMessageProps, 'type'>) => {
  showToast({
    title,
    message,
    type: 'success',
    position,
    visibilityTime,
  });
};

export const showInfo = ({
  title,
  message,
  position,
  visibilityTime,
}: Omit<AlertMessageProps, 'type'>) => {
  showToast({
    title,
    message,
    type: 'info',
    position,
    visibilityTime,
  });
};

export { showToast };
