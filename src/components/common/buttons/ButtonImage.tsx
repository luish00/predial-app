import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
  ViewStyle,
} from 'react-native';

interface Props {
  image: ImageSourcePropType;
  onPress: () => void;
  buttonStyle?: ViewStyle;
}

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
  },
});

const ButtonImage: React.FC<Props> = ({ buttonStyle, image, onPress }) => (
  <TouchableHighlight
    style={buttonStyle}
    onPress={onPress}
    activeOpacity={0.2}
    underlayColor="transparent">
    <Image style={styles.image} source={image} />
  </TouchableHighlight>
);

export { ButtonImage };
