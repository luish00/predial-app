import React from 'react';
import { Modal, Text, View, ViewStyle } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

import colors from '../../../colors';
import styles from './ModalBase.style';

import { PrimaryButton } from '../buttons/PrimaryButton';
import { Container } from '../grids';
import {
  loadingAnimation,
  loadingHorizontalAnimation,
} from '../../../assets/lottie';

interface SecondaryButtonProps {
  secondaryText?: string | null;
  handleSecondaryButtonPress?: () => void;
}

interface ModalBaseProps {
  children: React.ReactNode;
  title?: string;
  visible: boolean;
  styleContent?: ViewStyle;
}

interface ModalTwoButtonProps extends ModalBaseProps {
  handlePrimaryButtonPress: () => void;
  isLoading?: boolean;
  handleSecondaryButtonPress?: () => void;
  primaryText: string;
  secondaryText?: string;
}

type AlertModalType = Omit<ModalTwoButtonProps, 'children'>;
interface AlertModalProps extends AlertModalType {
  body: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  secondaryText,
  handleSecondaryButtonPress,
}) => {
  if (!secondaryText) {
    return null;
  }

  return (
    <PrimaryButton
      style={styles.secondaryButton}
      borderLess
      textColor={colors.textPrimary}
      onPress={handleSecondaryButtonPress}>
      {secondaryText.toUpperCase()}
    </PrimaryButton>
  );
};

const TwoButton: React.FC<ModalTwoButtonProps> = props => {
  const {
    handleSecondaryButtonPress,
    isLoading,
    secondaryText,
    handlePrimaryButtonPress,
    primaryText,
  } = props;

  return (
    <View style={styles.buttonsContainer}>
      <SecondaryButton
        handleSecondaryButtonPress={handleSecondaryButtonPress}
        secondaryText={secondaryText}
      />

      {primaryText && (
        <PrimaryButton isLoading={isLoading} onPress={handlePrimaryButtonPress}>
          {primaryText?.toUpperCase()}
        </PrimaryButton>
      )}
    </View>
  );
};

export const ModalBase: React.FC<ModalBaseProps> = ({
  children,
  title,
  visible,
  styleContent,
}) => (
  <Modal animationType="slide" transparent visible={visible}>
    <View style={styles.overlay}>
      <View style={[styles.content, styleContent]}>
        {title && <Text style={styles.title}>{title}</Text>}

        {children}
      </View>
    </View>
  </Modal>
);

export const ModalTwoButton: React.FC<ModalTwoButtonProps> = props => {
  return (
    <ModalBase {...props}>
      {props.children}

      <TwoButton {...props} />
    </ModalBase>
  );
};

export const AlertModal: React.FC<AlertModalProps> = props => {
  const { body } = props;

  return (
    <ModalTwoButton {...props}>
      <Text style={styles.body}>{body}</Text>
    </ModalTwoButton>
  );
};

export const ModalScreen: React.FC<ModalTwoButtonProps> = props => {
  const { children, isLoading, title, visible } = props;

  return (
    <Modal animationType="slide" visible={visible}>
      <Text style={styles.titleScreen}>{title}</Text>

      <View style={styles.content}>
        {isLoading && (
          <View>
            <AnimatedLottieView
              autoPlay
              loop
              source={loadingHorizontalAnimation}
              autoSize
            />
          </View>
        )}

        <Container>
          {children}

          <TwoButton {...props} />
        </Container>
      </View>
    </Modal>
  );
};

export const ModalLoading = ({ visible = false }) => {
  return (
    <ModalBase visible={visible} styleContent={styles.modalLoadingContainer}>
      <AnimatedLottieView
        source={loadingAnimation}
        autoPlay
        loop
        hardwareAccelerationAndroid
        style={styles.modalLoadingLottie}
      />
    </ModalBase>
  );
};
