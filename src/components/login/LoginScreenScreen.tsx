import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { NavigationProp } from '@react-navigation/core';

import { InputWithImage } from '../common/inputs/InputWithImage';
import { Label } from '../common/grids/Label';

import { accountIcon, passwordIcon } from '../../assets/login';

import styles from './loginScreen.style';
import { Container } from '../common/grids/Container';
import { PrimaryButton } from '../common/buttons/PrimaryButton';

interface Porps {
  navigation: NavigationProp<any>;
}

const LoginScreenScreen = ({ navigation }: Porps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPress = () => {
    console.log('clic;');
  };

  const onForgotPassword = () => {
    navigation.navigate('RecoveryPassword');
  };

  return (
    <Container style={styles.container}>
      <Label fontSize={50} textAlign="center">
        ¡Inicia sesión!
      </Label>

      <Image style={styles.image} />

      <View style={styles.containerInputs}>
        <InputWithImage
          image={accountIcon}
          keyboardType="email-address"
          label="Usuario"
          onChangeText={value => setEmail(value)}
          placeholder="usario@gmail.com"
          required
          value={email}
        />

        <InputWithImage
          image={passwordIcon}
          label="Contraseña"
          onChangeText={setPassword}
          placeholder="*********"
          secureTextEntry
          value={password}
        />

        <PrimaryButton onPress={onPress}>Login</PrimaryButton>

        <PrimaryButton borderLess onPress={onForgotPassword}>
          ¿Olvidaste tu contraseña?
        </PrimaryButton>
      </View>
    </Container>
  );
};

export { LoginScreenScreen };
