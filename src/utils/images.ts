import type { ImageSourcePropType } from 'react-native';

//Image assets used in the app, including local and remote images, with type definitions for better code clarity and maintainability.

const IMG: {
  LOGO: ImageSourcePropType;
  LOGO2: string;
} = {
  LOGO: require('../../asset/img/logomain.png'),
  LOGO2: 'https://i.ytimg.com/vi/gmkp0W-sEao/maxresdefault.jpg',
};

export default IMG;
