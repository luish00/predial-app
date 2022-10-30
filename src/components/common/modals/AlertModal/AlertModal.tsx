import React from 'react';
import { Modal, TouchableNativeFeedback, Text, View } from 'react-native';
import colors from '../../../../colors';
import { PrimaryButton } from '../../buttons/PrimaryButton';

import styles from './Alertmodal.style';

interface SecondaryButtonProps {
  secondaryText?: string | null;
  handleSecondaryButtonPress?: () => void;
}

interface AlertModalProos {
  body: string;
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

const AlertModal: React.FC<AlertModalProos> = ({
  body,
  handlePrimaryButtonPress,
  handleSecondaryButtonPress,
  primaryText,
  secondaryText,
  subText,
  title,
  visible,
}) => (
  <Modal animationType="fade" transparent visible={visible}>
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.body}>{body}</Text>

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

export { AlertModal };
