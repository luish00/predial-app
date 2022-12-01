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
import {
  useAppDispatch,
  useAppSelector,
  useInputReducerState,
} from '../../../../../hooks';
import {
  ContactProp,
  NavigationPropBase,
  TaskProp,
} from '../../../../../types';
import DatePicker from 'react-native-date-picker';
import { useCreateTaskService } from '../services/useTaskServices';
import {
  useValidateInput,
  ValidationsProps,
} from '../../../../common/form/hooks/useValidateInput';
import { AlertModal, ModalLoading } from '../../../../common/modals';
import {
  DropdownForm,
  DropdownItemType,
} from '../../../../common/inputs/Dropdown/DropdownForm';
import { ContactModal } from '../../accountContacts/components/ContactModal';
import { ContactModel } from '../../../../../models/ContactModel';
import { useCreateContact } from '../../../services/useAccountService';
import { addContact } from '../../../../../redux/slices/accountDetailsSlice';

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

const newContact = new ContactModel();

export const TaskScreen: React.FC<NavigationPropBase> = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { task } = route?.params || {};
  const store = useAppSelector(state => state.accountDetails);
  const { contacts } = store;

  const [isPersonalNotify, setPersonalNotify] = useState(true);
  const [openPicker, setOpenPicker] = useState(false);
  const [showNewContact, setShowNewContact] = useState(false);

  const {
    createOrUpdateContact,
    isLoading,
    errors,
    contact: contactCreated,
    resetAccountService,
  } = useCreateContact();

  const { onChangeInput, setItemState, updateState, state } =
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

  const contactsMemo: DropdownItemType[] = useMemo(() => {
    if (contacts.length === 0) {
      [];
    }

    return contacts.map(item => ({
      ...item,
      label: `${item.FirstName} ${item.MiddleName}`,
      value: item.Id,
    }));
  }, [contacts]);

  const onPersonalPress = useCallback(() => {
    setPersonalNotify(true);
  }, []);

  const onIntructivoPress = useCallback(() => {
    setPersonalNotify(false);
  }, []);

  const goBack = useCallback(() => {
    navigation?.goBack();
  }, [navigation]);

  const onSave = useCallback(() => {
    const isValid = isPersonalNotify ? validateForm() : true;

    if (!isValid) {
      return;
    }

    const action = task.Id ? updateTask : createTask;

    action({
      ...state,
      ContactId: state.ContactId, // TODO: contact test
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

  const onSelectContact = useCallback(
    (modalContact: ContactProp) => {
      updateState({
        ...state,
        Name: `${modalContact.FirstName} ${modalContact.MiddleName} ${modalContact.LastName}`,
        Email: modalContact.Email,
        ContactId: modalContact.Id,
        Mobile: modalContact.Mobile,
        Phone: modalContact.Phone,
      });
    },
    [state, updateState],
  );

  const onCancelPicker = useCallback(() => {
    setOpenPicker(false);
  }, []);

  const onSaveContact = useCallback(
    (item: ContactProp) => {
      createOrUpdateContact({
        ...item,
        AccountId: String(store.accountDetails?.Id),
      });
    },
    [createOrUpdateContact, store.accountDetails?.Id],
  );

  useEffect(() => {
    if (createTaskError) {
      resetCreteService();

      Toast.show({
        type: 'error',
        text1: '!!Upps¡¡ Ocurrió un problema a guardar la tarea.',
      });
    }
  }, [createTaskError, resetCreteService]);

  useEffect(() => {
    if (!contactCreated?.Id) {
      return;
    }

    setShowNewContact(false);
    updateState({
      ...state,
      Name: `${contactCreated.FirstName} ${contactCreated.MiddleName} ${contactCreated.LastName}`,
      Email: contactCreated.Email,
      ContactId: contactCreated.Id,
      Mobile: contactCreated.Mobile,
      Phone: contactCreated.Phone,
    });
    dispatch(addContact(contactCreated));
    resetAccountService();
  }, [
    contactCreated,
    dispatch,
    resetAccountService,
    resetCreteService,
    state,
    updateState,
  ]);

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
                data={contactsMemo}
                onChange={onSelectContact}
                title="Contactos"
                value=""
              />

              <PrimaryButton borderLess onPress={() => setShowNewContact(true)}>
                Agregar nuevo contacto
              </PrimaryButton>

              {state.Mobile && (
                <>
                  {/* <InputForm
                    label="Nombre de contacto"
                    nativeID="Name"
                    onChange={onChangeInput}
                    required
                    returnKeyType="next"
                    value={state.Name}
                    editable={false}
                  /> */}

                  <InputForm
                    editable={false}
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
                    editable={false}
                    label="Correo electrónico"
                    nativeID="Email"
                    onChange={onChangeInput}
                    placeholder="correo@gmail.com"
                    required
                    returnKeyType="next"
                    value={state.Email}
                  />
                </>
              )}

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

      <ContactModal
        visible={showNewContact}
        onDismiss={() => setShowNewContact(false)}
        item={newContact}
        isNewContact
        onSave={onSaveContact}
        isLoading={isLoading}
        errors={errors}
      />
    </Container>
  );
};
