import AnimatedLottieView from 'lottie-react-native';
import React, { useCallback } from 'react';
import {
  ImageSourcePropType,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { loadingCircle } from '../../../assets/lottie';
import { Row } from '../grids';
import { ImageIcon } from '../images';
import { stylesBorderLess, stylesPrimary } from './primaryButton.styles';

interface Props {
  alignSelf?:
    | 'auto'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'baseline';
  borderLess?: boolean;
  children: string;
  disabled?: boolean;
  icon?: ImageSourcePropType | undefined;
  isLoading?: boolean;
  minWidth?: number;
  onPress?: () => void;
  size?: 'auto' | 'big' | 'mid' | 'small';
  style?: ViewStyle;
  textColor?: string;
  textFontSize?: number;
}

interface InnerButtonProps {
  styles?: typeof stylesPrimary | typeof stylesBorderLess;
  customColor?: TextStyle | null | undefined;
  customFontSize?: TextStyle | null | undefined;
  icon?: ImageSourcePropType | undefined;
  text: string;
}

const sizes = { auto: 'auto', big: '100%', mid: '80%', small: '60%' };

const TextButton: React.FC<InnerButtonProps> = ({
  styles,
  customColor,
  customFontSize,
  text,
}) => <Text style={[styles?.text, customColor, customFontSize]}>{text}</Text>;

const IconTextButton: React.FC<InnerButtonProps> = ({
  text,
  customColor,
  icon,
  styles,
}) => (
  <Row>
    <ImageIcon
      style={{ marginRight: 8 }}
      width={30}
      height={30}
      source={icon}
      tintColor="#fff"
    />

    <TextButton customColor={customColor} styles={styles} text={text} />
  </Row>
);

const PrimaryButton: React.FC<Props> = ({
  alignSelf = 'auto',
  borderLess,
  children,
  disabled = false,
  icon,
  isLoading,
  onPress,
  size = 'auto',
  style,
  textColor,
  textFontSize,
  minWidth,
}) => {
  const styles = borderLess ? stylesBorderLess : stylesPrimary;

  const customColor = React.useMemo(() => {
    if (!textColor) {
      return null;
    }

    return { color: textColor };
  }, [textColor]);

  const customFontSize = React.useMemo(() => {
    if (!textFontSize) {
      return null;
    }

    return { fontSize: textFontSize };
  }, [textFontSize]);

  const Content = useCallback(
    () => (
      <>
        {icon ? (
          <IconTextButton
            text={children}
            icon={icon}
            customColor={customColor}
            styles={styles}
          />
        ) : (
          <TextButton
            text={children}
            icon={icon}
            customColor={customColor}
            customFontSize={customFontSize}
            styles={styles}
          />
        )}
      </>
    ),
    [children, customColor, customFontSize, icon, styles],
  );

  return (
    <TouchableNativeFeedback onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.container,
          { alignSelf: alignSelf, width: sizes[size], minWidth: minWidth },
          style,
          disabled && styles.buttonDisabled,
        ]}>
        {isLoading ? (
          <AnimatedLottieView
            style={stylesPrimary.loading}
            loop
            autoPlay
            source={loadingCircle}
          />
        ) : (
          <Content />
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

export { PrimaryButton };
