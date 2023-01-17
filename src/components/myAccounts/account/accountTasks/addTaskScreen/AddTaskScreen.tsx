import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import DatePicker from 'react-native-date-picker';

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
  useTaskLocalStorage,
} from '../../../../../hooks';
import {
  ContactProp,
  NavigationPropBase,
  TaskProp,
} from '../../../../../types.d';
import { useCreateTaskService } from '../../../../../services';
import { useValidateInput } from '../../../../common/form/hooks/useValidateInput';

import { AlertModal, ModalLoading } from '../../../../common/modals';
import {
  DropdownForm,
  DropdownItemType,
} from '../../../../common/inputs/Dropdown/DropdownForm';
import { ContactNewModal } from '../../accountContacts/components/ContactNewModal';
import { ContactModel } from '../../../../../models/ContactModel';
import { useCreateContact } from '../../../../../services';
import { addContact } from '../../../../../redux/slices/accountDetailsSlice';

import { FORM_NOTIFICATION, InputFormValidations } from './addTask.validations';
import { PhotoTaskButtons } from '../components/PhotoTaskButtons';
import {
  AttachmentModel,
  AttachmentTaskStorage,
} from '../../../../../models/AttachmentModel';
import {
  useCreateAttachmentService,
  useGetAttachmentService,
} from '../../../../../services/useAttachmentService';
import { removeStorePhotoTask } from '../../../../../utilities/store';

const newContact = new ContactModel();

export const TaskScreen: React.FC<NavigationPropBase> = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { task } = route?.params || {};
  const store = useAppSelector(state => state.accountDetails);
  const { accountDetails, contacts } = store;

  const [taskId, setTaskId] = useState<number>(task?.Id || 0);
  const [isPersonalNotify, setPersonalNotify] = useState(true);
  const [openPicker, setOpenPicker] = useState(false);
  const [showNewContact, setShowNewContact] = useState(false);
  const [showUploadAttch, setShowUpploadAttch] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [photos, setPhotos] = useState<AttachmentModel[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<AttachmentModel[]>([]);
  const [savingAttch, setSavaingAttch] = useState(false);

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
    createdTask,
    createTask,
    createTaskError,
    createTaskLoading,
    isTaskCreated,
    updateTask,
    resetCreteService,
  } = useCreateTaskService();

  const {
    createAttachments,
    finishUploadedAttach,
    index: indexAttch,
    isLoading: isAttchLoading,
  } = useCreateAttachmentService();

  const { getAttachments, isGetAttchLoading, taskAttachements } =
    useGetAttachmentService();

  const { storePhotoTask } = useTaskLocalStorage(
    (data: AttachmentTaskStorage[]) => {
      if (!data || !task?.Id) {
        return;
      }

      const findTask = data.find(item => item.taskId === task.Id);

      if (!findTask) {
        return;
      }

      removeStorePhotoTask(task.Id);
      setPhotos(findTask.photos);
    },
  );

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
      ContactId: state.ContactId,
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

  const onDismissCreateTask = useCallback(() => {
    if (photos.length === 0 || finishUploadedAttach) {
      goBack();
    }

    setShowFinishModal(false);
    setShowUpploadAttch(true);
  }, [finishUploadedAttach, goBack, photos.length]);

  const onModalUploadAttch = useCallback(() => {
    const data = photos.map(
      (item: AttachmentModel) =>
        new AttachmentModel({ ...item, ParentId: task?.Id || createdTask?.Id }),
    );

    createAttachments(data);
    setSavaingAttch(true);
    setShowUpploadAttch(false);
  }, [createAttachments, createdTask?.Id, photos, task?.Id]);

  const onModalUploadAttchCancel = useCallback(() => {
    // TODO: save photos
    setPhotos([]);
    setSavaingAttch(false);
    goBack();
  }, [goBack]);

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

  useEffect(() => {
    setShowFinishModal(isTaskCreated);
  }, [isTaskCreated]);

  useEffect(() => {
    if (!task?.Id) {
      return;
    }

    const parentId: number = task.Id;
    getAttachments(parentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (taskAttachements?.data) {
      setUploadedPhotos(taskAttachements.data);
    }
  }, [taskAttachements]);

  useEffect(
    () => () => {
      if (photos.length && taskId && !finishUploadedAttach) {
        storePhotoTask({
          taskId: taskId,
          photos,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accountDetails, taskId, photos],
  );

  useEffect(() => {
    if (!createdTask?.Id) {
      return;
    }

    setTaskId(createdTask.Id);
  }, [createdTask]);

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

        <PhotoTaskButtons
          accountDetailsId={accountDetails?.Id}
          isLoading={isGetAttchLoading}
          isPersonalNotify={isPersonalNotify}
          photos={photos}
          setPhotos={setPhotos}
          taskId={task?.Id}
          uploadedPhotos={uploadedPhotos}
        />

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
        body={`Tarea ${task?.Id ? 'actualizada' : 'creada'} con éxito`}
        visible={isTaskCreated}
        title="Tarea"
        primaryText="Aceptar"
        handlePrimaryButtonPress={onDismissCreateTask}
      />

      <AlertModal
        body="¿Deseas subir las fotografias?"
        visible={showUploadAttch}
        title={`Existen ${photos.length} fotos sin guardar`}
        primaryText="Aceptar"
        secondaryText="Después"
        handleSecondaryButtonPress={onModalUploadAttchCancel}
        handlePrimaryButtonPress={onModalUploadAttch}
      />

      <AlertModal
        body={`Cargadas ${indexAttch} de ${photos.length}`}
        visible={isAttchLoading}
        title="Subiendo fotografias.."
        primaryText={`${finishUploadedAttach ? 'Aceptar' : ''}`}
        handlePrimaryButtonPress={goBack}
      />

      <ContactNewModal
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
