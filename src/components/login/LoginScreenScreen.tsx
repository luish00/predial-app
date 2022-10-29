import React from 'react';
import { Image, View } from 'react-native';

import { InputWithImage } from '../common/inputs/InputWithImage';
import { Label } from '../common/grids/Label';
import { Row } from '../common/Row';

import { accountIcon, passwordIcon } from '../../assets/login';

import styles from './login.style';
import { Container } from '../common/grids/Container';
import { PrimaryButton } from '../common/buttons/PrimaryButton';

const LoginScreenScreen = () => {
  const onPress = () => {
    console.log('clic;');
  };

  return (
    <Container style={styles.container}>
      <Label fontSize={50} textAlign="center">
        ¡Inicia sesión!
      </Label>

      <Image style={styles.image} />

      <View style={styles.containerInputs}>
        <InputWithImage
          keyboardType="email-address"
          image={accountIcon}
          label="Usuario"
        />

        <InputWithImage
          secureTextEntry
          image={passwordIcon}
          label="Contraseña"
        />

        <PrimaryButton onPress={onPress}>Login</PrimaryButton>

        <PrimaryButton borderLess onPress={onPress}>
          ¿Olvidaste tu contraseña?
        </PrimaryButton>
      </View>
    </Container>
  );
};

export { LoginScreenScreen };
