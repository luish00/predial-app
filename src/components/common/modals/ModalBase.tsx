import React from 'react';
import { Modal, Text, View } from 'react-native';

import colors from '../../../colors';
import styles from './ModalBase.style';

import { PrimaryButton } from '../buttons/PrimaryButton';

interface SecondaryButtonProps {
  secondaryText?: string | null;
  handleSecondaryButtonPress?: () => void;
}

interface AlertModalProps {
  children: React.ReactNode;
  handlePrimaryButtonPress: () => void;
  handleSecondaryButtonPress?: () => void;
  primaryText: string;
  secondaryText?: string;
  subText?: string;
  title: string;
  visible: boolean;
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

export const ModalBase: React.FC<AlertModalProps> = ({
  children,
  handlePrimaryButtonPress,
  handleSecondaryButtonPress,
  primaryText,
  secondaryText,
  subText,
  title,
  visible,
}) => (
  <Modal animationType="slide" transparent visible={visible}>
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        {children}

        <View style={styles.buttonsContainer}>
          <SecondaryButton
            handleSecondaryButtonPress={handleSecondaryButtonPress}
            secondaryText={secondaryText}
          />

          <PrimaryButton onPress={handlePrimaryButtonPress}>
            {primaryText && primaryText.toUpperCase()}
          </PrimaryButton>
        </View>

        <View style={styles.alignTextCenter}>{subText}</View>
      </View>
    </View>
  </Modal>
);
