import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { NavigationProp } from '@react-navigation/core';

import { InputForm } from '../common/inputs';
import { Label } from '../common/grids/Label';

import { accountIcon, passwordIcon } from '../../assets/icons';

import { Container } from '../common/grids/Container';
import { PrimaryButton } from '../common/buttons/PrimaryButton';
import { validateEmail } from '../../utilities/utils';
import { FormNextFocus } from '../common/form/FormNextFocus';
import { useLoginService } from './services/useAuthService';

import styles from './loginScreen.style';

interface Props {
  navigation: NavigationProp<any>;
}

const FORM_KEYS = ['email', 'password'];

const LoginScreenScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('12345');

  const { isLoading, doLogin, errorLogin } = useLoginService();

  const isFromValid = React.useMemo(() => {
    return validateEmail(email.trim()) && password.length > 0;
  }, [email, password]);

  const onPress = React.useCallback(() => {
    if (!isFromValid) {
      return;
    }

    doLogin({ Password: password, UserName: email.trim() });
  }, [email, isFromValid, doLogin, password]);

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
        <FormNextFocus inputKeys={FORM_KEYS}>
          <InputForm
            disabled={isLoading}
            image={accountIcon}
            keyboardType="email-address"
            label="Usuario"
            nativeID={'email'}
            onChangeText={(value: string) => setEmail(value)}
            placeholder="usario@gmail.com"
            required
            returnKeyType="next"
            value={email}
          />

          <InputForm
            disabled={isLoading}
            image={passwordIcon}
            label="Contraseña"
            nativeID="password"
            onChangeText={setPassword}
            placeholder="*********"
            required
            returnKeyType="done"
            secureTextEntry
            value={password}
          />
        </FormNextFocus>

        {errorLogin && (
          <View style={styles.containerError}>
            <Label color="#fff" textAlign="center">
              {errorLogin}
            </Label>
          </View>
        )}

        <View style={styles.containerButtons}>
          <PrimaryButton alignSelf="center" size="mid" onPress={onPress}>
            Login
          </PrimaryButton>

          <PrimaryButton
            borderLess
            disabled={isLoading}
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
