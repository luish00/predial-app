import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import colors from '../../../../../colors';
import { checkIcon, unCheckIcon, eventIcon } from '../../../../../assets/icons';

import { AccountTaskItem } from '..';
import { Col, Container, Label, Row } from '../../../../common/grids';
import { FormNextFocus } from '../../../../common/form/FormNextFocus';
import { InputForm } from '../../../../common/inputs';
import { PrimaryButton } from '../../../../common/buttons/PrimaryButton';
import { ImageIcon } from '../../../../common/images';

import styles from './TaskScreen.style';
import { useInputReducerState } from '../../../../../hooks';
import { NavigationPropBase, TaskProp } from '../../../../../types';
import DatePicker from 'react-native-date-picker';
import { useCreateTaskService } from '../services/useTaskServices';
import {
  useValidateInput,
  ValidationsProps,
} from '../../../../common/form/hooks/useValidateInput';
import { AlertModal, ModalLoading } from '../../../../common/modals';
import { HomeTabScreen } from '../../../../home/HomeTabScreen';
import { useAccountContext } from '../../../../../contexts/useAccountContext';
import { DropdownForm } from '../../../../common/inputs/Dropdown/DropdownForm';

interface PhotoButtonProps {
  label: string;
  onPress?: () => void;
}

const FORM_NOTIFICATION = ['Name', 'Mobile', 'Email', 'PaymentPromise'];

const InputFormValidations: ValidationsProps[] = [
  {
    key: 'Name',
    keyName: 'Nombre del contacto',
    requerid: true,
  },
  {
    key: 'Mobile',
    keyName: 'Teléfono',
    minLength: 10,
    onlyNumber: true,
    requerid: true,
  },
  {
    key: 'Email',
    isEmail: true,
    keyName: 'Correo',
  },
  {
    key: 'PaymentPromise',
    keyName: 'Promesa de pago',
    requerid: true,
  },
];

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

export const TaskScreen: React.FC<NavigationPropBase> = ({ navigation }) => {
  const route = useRoute();
  const { task } = route?.params || {};

  const { accountState: { contacts } } = useAccountContext();
  const [isPersonalNotify, setPersonalNotify] = useState(true);
  const [openPicker, setOpenPicker] = useState(false);
  const { onChangeInput, setItemState, state } =
    useInputReducerState<TaskProp>(task);
  const { formErrors, validateForm } = useValidateInput(
    InputFormValidations,
    state,
  );
  const {
    createTask,
    createTaskError,
    createTaskLoading,
    isTaskCreated,
    updateTask,
    resetCreteService,
  } = useCreateTaskService();

  const contactsMemo = useMemo(() => {

  },[contacts]);

  const onPersonalPress = useCallback(() => {
    setPersonalNotify(true);
  }, []);

  const onIntructivoPress = useCallback(() => {
    setPersonalNotify(false);
  }, []);

  const goBack = useCallback(() => {
    navigation?.goBack();
  }, [navigation]);

  useEffect(() => {
    if (createTaskError) {
      resetCreteService();

      Toast.show({
        type: 'error',
        text1: '!!Upps¡¡ Ocurrió un problema a guardar la tarea.',
      });
    }
  }, [createTaskError, resetCreteService]);

  const onSave = useCallback(() => {
    const isValid = isPersonalNotify ? validateForm() : true;

    if (!isValid) {
      return;
    }

    const action = task.Id ? updateTask : createTask;

    action({
      ...state,
      ContactId: '1', // TODO: contact test
      InstructionNotification: !isPersonalNotify,
      PersonalNotification: isPersonalNotify,
      Phone: state.Mobile,
    });
  }, [createTask, isPersonalNotify, state, task.Id, updateTask, validateForm]);

  const onConfirmPicker = useCallback(
    (date: Date) => {
      setOpenPicker(false);

      setItemState('PaymentPromise', date.toISOString().split('T')[0]);
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
              <DropdownForm
                data={contacts?.map(item => ({
                  label: `${item.FirstName} ${item.MiddleName}`,
                  value: item.Id,
                }))}
                title="Contactos"
                value=""
              />

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
                maxLength={10}
                nativeID="Mobile"
                onChange={onChangeInput}
                required
                returnKeyType="next"
                value={state.Mobile}
              />

              <InputForm
                label="Correo electrónico"
                nativeID="Email"
                onChange={onChangeInput}
                placeholder="correo@gmail.com"
                required
                returnKeyType="next"
                value={state.Email}
              />

              <TouchableNativeFeedback onPress={() => setOpenPicker(true)}>
                <View>
                  <InputForm
                    editable={false}
                    image={eventIcon}
                    label="Promesa de pago"
                    nativeID="PaymentPromise"
                    onChange={onChangeInput}
                    required
                    returnKeyType="done"
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

        <Col>
          {formErrors.map((error, index) => (
            <Label key={String(index)} color={colors.inputError}>
              {error}
            </Label>
          ))}
        </Col>

        <Row justifyContent="flex-end">
          <PrimaryButton
            borderLess
            onPress={goBack}
            style={styles.cancelButton}>
            Cancelar
          </PrimaryButton>

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

      <ModalLoading visible={createTaskLoading} />

      <AlertModal
        body="Tarea creada con éxito"
        visible={isTaskCreated}
        title="Tarea"
        primaryText="Aceptar"
        handlePrimaryButtonPress={goBack}
      />
    </Container>
  );
};
