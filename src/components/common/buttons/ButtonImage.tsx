import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
  ViewStyle,
} from 'react-native';

interface Props {
  buttonStyle?: ViewStyle;
  image: ImageSourcePropType;
  onPress: () => void;
  tintColor?: string;
}

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
  },
});

const ButtonImage: React.FC<Props> = ({
  buttonStyle,
  image,
  tintColor,
  onPress,
}) => (
  <TouchableHighlight
    style={buttonStyle}
    onPress={onPress}
    activeOpacity={0.2}
    underlayColor="transparent">
    <Image style={[styles.image, { tintColor }]} source={image} />
  </TouchableHighlight>
);

export { ButtonImage };
