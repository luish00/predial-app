import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
} from 'react-native';

import colors from '../../colors';

interface Props {
  height: number;
  source?: ImageSourcePropType | undefined;
  style?: ImageStyle;
  width: number;
}

const styles = StyleSheet.create({
  tinColor: { tintColor: colors.secondary },
});

const ImageIcon: React.FC<Props> = ({ height, source, style, width }) => {
  return (
    <Image
      style={[{ width, height }, styles.tinColor, style]}
      source={source}
    />
  );
};

export { ImageIcon };
