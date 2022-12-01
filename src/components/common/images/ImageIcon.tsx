import React from 'react';
import { Image, ImageSourcePropType, ImageStyle } from 'react-native';

import colors from '../../../colors';

interface Props {
  height: number;
  source?: ImageSourcePropType | undefined;
  style?: ImageStyle;
  width: number;
  tintColor?: string;
}

const ImageIcon: React.FC<Props> = ({
  height,
  source,
  style,
  tintColor = colors.secondary,
  width,
}) => {
  return (
    <Image
      style={[{ height, tintColor: tintColor, width }, style]}
      source={source}
    />
  );
};

export { ImageIcon };
