import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { NavigationProp } from '@react-navigation/core';

import { InputWithImage } from '../common/inputs/InputWithImage';
import { Label } from '../common/grids/Label';

import { accountIcon, passwordIcon } from '../../assets/icons';

import styles from './loginScreen.style';
import { Container } from '../common/grids/Container';
import { PrimaryButton } from '../common/buttons/PrimaryButton';
import { validateEmail } from '../../utilities/utils';
import { useAuthContext } from '../../contexts/useAuthContext';

interface Porps {
  navigation: NavigationProp<any>;
}

const LoginScreenScreen = ({ navigation }: Porps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useAuthContext();
  const {
    authFunctions: { signIn },
  } = authContext;

  const isFromValid = React.useMemo(() => {
    return validateEmail(email) && password.length > 0;
  }, [email, password]);

  const onPress = React.useCallback(() => {
    if (!isFromValid) {
      return;
    }

    // TODO: dummy token
    signIn('dummy_token');
  }, [isFromValid, signIn]);

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
          autoFocus
          image={accountIcon}
          keyboardType="email-address"
          label="Usuario"
          onChangeText={value => setEmail(value)}
          placeholder="usario@gmail.com"
          required
          returnKeyType="next"
          value={email}
        />

        <InputWithImage
          image={passwordIcon}
          label="Contraseña"
          onChangeText={setPassword}
          placeholder="*********"
          required
          returnKeyType="go"
          secureTextEntry
          value={password}
        />

        <View style={styles.containerButtons}>
          <PrimaryButton alignSelf="center" size="mid" onPress={onPress}>
            Login
          </PrimaryButton>

          <PrimaryButton
            borderLess
            onPress={onForgotPassword}
            style={styles.forgotButton}>
            ¿Olvidaste tu contraseña?
          </PrimaryButton>
        </View>
      </View>
    </Container>
  );
};

export { LoginScreenScreen };
