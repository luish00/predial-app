import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Container } from '../common/grids/Container';
import { Label } from '../common/grids/Label';
import { InputWithImage } from '../common/inputs';
import { emailIcon } from '../../assets/icons';
import { PrimaryButton } from '../common/buttons/PrimaryButton';
import { validateEmail } from '../../utilities/utils';
import { AlertModal } from '../common/modals';

const styles = StyleSheet.create({
  container: { padding: 16 },
  formContainer: { paddingHorizontal: 44, paddingTop: 50, paddingBottom: 50 },
});

const RecoveryPasswordScreen: React.FC<PropsWithChildren> = () => {
  const [value, setValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const toggleAlert = React.useCallback(() => {
    setShowAlert(prev => !prev);
  }, []);

  const onForgotPassword = React.useCallback(() => {
    if (validateEmail(value)) {
      toggleAlert();
    }
  }, [toggleAlert, value]);

  return (
    <>
      <AlertModal
        body="Se ha enviado un correo de recuperación de contraseña"
        handlePrimaryButtonPress={toggleAlert}
        handleSecondaryButtonPress={toggleAlert}
        primaryText="Aceptar"
        secondaryText="Cancelar"
        title="Recuperación de contraseña"
        visible={showAlert}
      />

      <Container style={styles.container}>
        <Label textAlign="center" fontSize={30}>
          Olvidaste tu contraseña
        </Label>

        <View style={styles.formContainer}>
          <InputWithImage
            image={emailIcon}
            keyboardType="email-address"
            label="Correo"
            onChangeText={setValue}
            required
            placeholder="usuario@gmail.com"
            nativeID="value"
            returnKeyType="go"
            value={value}
          />
        </View>

        <PrimaryButton
          size="small"
          alignSelf="center"
          onPress={onForgotPassword}>
          Enviar
        </PrimaryButton>
      </Container>
    </>
  );
};

export { RecoveryPasswordScreen };
