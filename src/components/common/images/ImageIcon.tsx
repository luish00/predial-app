import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
} from 'react-native';

import colors from '../../../colors';

interface Props {
  height: number;
  source?: ImageSourcePropType | undefined;
  style?: ImageStyle;
  width: number;
  tintColor?: string;
}

const styles = StyleSheet.create({
  tinColor: { tintColor: colors.secondary },
});

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
