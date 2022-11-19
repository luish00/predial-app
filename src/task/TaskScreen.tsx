import React, { useCallback, useState } from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import colors from '../colors';
import { checkIcon, unCheckIcon } from '../assets/icons';

import { AccountTaskItem } from '../components/myAccounts/account/accountTasks';
import { Container, Label, Row } from '../components/common/grids';
import { FormNextFocus } from '../components/common/form/FormNextFocus';
import { InputForm } from '../components/common/inputs';
import { PrimaryButton } from '../components/common/buttons/PrimaryButton';
import { ImageIcon } from '../components/common/images';

import styles from './TaskScreen.style';
import { useInputReducerState } from '../hooks';
import { NavigationPropBase, TaskProp } from '../types';
import DatePicker from 'react-native-date-picker';

interface PhotoButtonProps {
  label: string;
  onPress?: () => void;
}

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

export const TaskScreen: React.FC<NavigationPropBase> = () => {
  const route = useRoute();
  const { task } = route?.params || {};

  const [isPersonalNotify, setPersonalNotify] = useState(true);
  const [openPicker, setOpenPicker] = useState(false);
  const { onChangeInput, setItemState, state } =
    useInputReducerState<TaskProp>(task);

  const onPersonalPress = useCallback(() => {
    setPersonalNotify(true);
  }, []);

  const onIntructivoPress = useCallback(() => {
    setPersonalNotify(false);
  }, []);

  const onSave = useCallback(() => {
    console.log('save', state);
  }, [state]);

  const onConfirmPicker = useCallback(
    (date: Date) => {
      setOpenPicker(false);

      setItemState('PaymentPromise', date.toUTCString());
    },
    [setItemState],
  );

  const onCancelPicker = useCallback(() => {
    setOpenPicker(false);
  }, []);

  return (
    <Container>
      <AccountTaskItem disabled item={task} />

      <View style={styles.formContainer}>
        <TouchableNativeFeedback onPress={onPersonalPress}>
          <View style={styles.toggleButton}>
            <ImageIcon
              height={25}
              source={isPersonalNotify ? checkIcon : unCheckIcon}
              style={styles.toggleButtonIcon}
              tintColor={colors.secondary}
              width={25}
            />

            <Label color={colors.textPrimary}>Notificación personal</Label>
          </View>
        </TouchableNativeFeedback>

        {isPersonalNotify && (
          <View>
            <FormNextFocus inputKeys={FORM_NOTIFICATION}>
              <InputForm
                label="Nombre de contacto"
                nativeID="Name"
                onChange={onChangeInput}
                required
                returnKeyType="next"
                value={state.Name}
              />

              <InputForm
                keyboardType="phone-pad"
                label="Celular"
                nativeID="Mobile"
                onChange={onChangeInput}
                required
                returnKeyType="next"
                value={state.Mobile}
              />

              <TouchableNativeFeedback onPress={() => setOpenPicker(true)}>
                <View>
                  <InputForm
                    label="Promesa de pago"
                    nativeID="PaymentPromise"
                    onChange={onChangeInput}
                    required
                    returnKeyType="done"
                    editable={false}
                    value={state.PaymentPromise}
                  />
                </View>
              </TouchableNativeFeedback>
            </FormNextFocus>
          </View>
        )}

        <TouchableNativeFeedback onPress={onIntructivoPress}>
          <View style={styles.toggleButton}>
            <ImageIcon
              height={25}
              source={isPersonalNotify ? unCheckIcon : checkIcon}
              style={styles.toggleButtonIcon}
              tintColor={colors.secondary}
              width={25}
            />

            <Label color={colors.textPrimary}>
              Notificación por instructivo
            </Label>
          </View>
        </TouchableNativeFeedback>

        {isPersonalNotify && <PhotoButton label="Foto identificación" />}

        <PhotoButton label="Foto evidencia" />

        <PhotoButton label="Foto del predio" />

        <Row justifyContent="flex-end">
          <PrimaryButton borderLess>Cancelar</PrimaryButton>

          <PrimaryButton onPress={onSave}>Guardar</PrimaryButton>
        </Row>
      </View>

      <DatePicker
        date={new Date()}
        minimumDate={new Date()}
        modal
        mode="date"
        onCancel={onCancelPicker}
        onConfirm={onConfirmPicker}
        open={openPicker}
      />
    </Container>
  );
};
