import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { AccountTaskItem } from '../components/account/accountTasks';
import { Col, Container, Label, Row } from '../components/common/grids';
import colors from '../colors';
import { FormNextFocus } from '../components/common/form/FormNextFocus';
import { InputForm } from '../components/common/inputs';
import { PrimaryButton } from '../components/common/buttons/PrimaryButton';

interface PhotoButtonProps {
  label: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  toggleButton: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonOn: {
    backgroundColor: colors.secondary,
  },
  toggleButtonOff: {
    backgroundColor: '#fff',
    flex: 1,
    height: 52,
  },
  formContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  photoContainer: {
    justifyContent: 'center',
    height: 52,
    paddingHorizontal: 16,
  },
  saveCancelContainer: {
    paddingHorizontal: 16,
  },
});

const FORM_NOTIFICATION = ['Name', 'Mobile', 'PaymentPromise'];

const PhotoButton: React.FC<PhotoButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.photoContainer}>
        <Label fontWeight="bold" fontSize={20}>
          {label}
        </Label>
      </View>
    </TouchableNativeFeedback>
  );
};

export const TaskScreen = () => {
  const [isPersonalNotify, setPersonalNotify] = useState(true);

  const route = useRoute();
  const { task } = route?.params || {};

  const togglePersonalStyle = isPersonalNotify
    ? styles.toggleButtonOn
    : styles.toggleButtonOff;

  const toggleInstructivoStyle = !isPersonalNotify
    ? styles.toggleButtonOn
    : styles.toggleButtonOff;

  const onPersonalPress = useCallback(() => {
    setPersonalNotify(true);
  }, []);

  const onIntructivoPress = useCallback(() => {
    setPersonalNotify(false);
  }, []);

  return (
    <Container>
      <AccountTaskItem disabled item={task} />

      <Row>
        <TouchableNativeFeedback onPress={onPersonalPress}>
          <View style={[styles.toggleButton, togglePersonalStyle]}>
            <Label color={isPersonalNotify ? '#fff' : colors.textPrimary}>
              Notificación personal
            </Label>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={onIntructivoPress}>
          <View style={[styles.toggleButton, toggleInstructivoStyle]}>
            <Label color={!isPersonalNotify ? '#fff' : colors.textPrimary}>
              Notificación por instructivo
            </Label>
          </View>
        </TouchableNativeFeedback>
      </Row>

      <View style={styles.formContainer}>
        <FormNextFocus inputKeys={FORM_NOTIFICATION}>
          <InputForm
            label="Nombre de contacto"
            nativeID="Name"
            returnKeyType="next"
          />

          <InputForm label="Celular" nativeID="Mobile" returnKeyType="next" />

          <InputForm
            label="Promesa de pago"
            nativeID="PaymentPromise"
            returnKeyType="done"
          />
        </FormNextFocus>
      </View>

      <PhotoButton label="Foto identificación" />

      <PhotoButton label="Foto evidencia" />

      <PhotoButton label="Foto del predio" />

      <Row justifyContent="flex-end" style={styles.saveCancelContainer}>
        <PrimaryButton borderLess>Cancelar</PrimaryButton>

        <PrimaryButton>Guardar</PrimaryButton>
      </Row>
    </Container>
  );
};
