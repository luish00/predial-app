import React from 'react';
import { Modal, Text, View } from 'react-native';

import colors from '../../../colors';
import styles from './ModalBase.style';

import { PrimaryButton } from '../buttons/PrimaryButton';
import { Container } from '../grids';

interface SecondaryButtonProps {
  secondaryText?: string | null;
  handleSecondaryButtonPress?: () => void;
}

interface ModalBaseProps {
  children: React.ReactNode;
  title: string;
  visible: boolean;
}

interface ModalTwoButtonProps extends ModalBaseProps {
  handlePrimaryButtonPress: () => void;
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

      <PrimaryButton onPress={handlePrimaryButtonPress}>
        {primaryText && primaryText.toUpperCase()}
      </PrimaryButton>
    </View>
  );
};

export const ModalBase: React.FC<ModalBaseProps> = ({
  children,
  title,
  visible,
}) => (
  <Modal animationType="slide" transparent visible={visible}>
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

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
  const { visible, title, children } = props;

  return (
    <Modal animationType="slide" visible={visible}>
      <Text style={styles.titleScreen}>{title}</Text>

      <View style={styles.content}>
        <Container>
          {children}

          <TwoButton {...props} />
        </Container>
      </View>
    </Modal>
  );
};
