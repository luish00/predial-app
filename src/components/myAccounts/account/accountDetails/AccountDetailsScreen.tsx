import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';

import { useAccountUtils } from '../../../../hooks/account/useAccountUtils';
import { toCurrency } from '../../../../utilities/utils';
import {
  useAppDispatch,
  useAppSelector,
  useInputReducerState,
  useOpenMap,
} from '../../../../hooks';
import { AccountDetailsProp } from '../../../../types';
import { loadAccount } from '../../../../redux/slices/accountDetailsSlice';

import { Col, Container, Label } from '../../../common/grids';
import { StaticMapImage } from '../../../common/images';
import { InputForm, InputWithImage } from '../../../common/inputs';
import { Row } from '../../../common/grids';
// import { PrimaryButton } from '../../../common/buttons/PrimaryButton';
import { FormNextFocus } from '../../../common/form/FormNextFocus';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { editIcon, mapIcon, saveIcon } from '../../../../assets/icons';
import { useValidateInput } from '../../../common/form/hooks/useValidateInput';
import colors from '../../../../colors';
import { InputFormKeys, InputValidations } from './accountDetails.validation';
import { ModalLoading } from '../../../common/modals';
import { useUpdateAccount } from '../../../../services';
import { ButtonImage } from '../../../common/buttons/ButtonImage';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  direcion: {
    marginBottom: 16,
  },
  editButton: {
    paddingVertical: 16,
  },
  flex1: {
    flex: 1,
  },
  cancelButton: {
    marginRight: 16,
  },
  mapButton: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.secondary,
    borderRadius: 8,
    borderWidth: 2,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
});

const AccountDetailsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector(state => state.accountDetails);
  const { accountDetails } = store;

  const [editMode, setEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { state: accountReducer, onChangeInput } =
    useInputReducerState<AccountDetailsProp>(accountDetails);

  const { fullAccountName } = useAccountUtils(accountDetails);

  const { formErrors, validateForm } = useValidateInput(
    InputValidations,
    accountReducer,
  );

  const { updateAccount } = useUpdateAccount(accountReducer?.Id);

  const { onOpenNavigationMap } = useOpenMap();

  const account = useMemo(() => {
    return editMode ? accountReducer : accountDetails;
  }, [accountDetails, editMode, accountReducer]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onEditMode = useCallback(() => {
    setEditMode((prev: boolean) => !prev);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSave = useCallback(async () => {
    if (!accountReducer) {
      return;
    }

    const isValidForm = validateForm();

    if (!isValidForm) {
      return;
    }

    setModalVisible(true);

    const accountUpdated = await updateAccount(accountReducer);

    setModalVisible(false);
    dispatch(loadAccount(accountReducer));
    setEditMode(false);

    const type = accountUpdated ? 'success' : 'error';
    const text1 = accountUpdated
      ? 'Cuenta actualizada'
      : '¡¡Upss!! Ocurrió un error al actualizar';

    Toast.show({
      type,
      text1,
    });
  }, [accountReducer, validateForm, updateAccount, dispatch]);

  const onCopyDirirection = useCallback((direction: string | undefined) => {
    if (!direction) {
      return;
    }

    Clipboard.setString(direction);

    Toast.show({
      type: 'info',
      text1: 'Se copió la dirección',
      text2: direction,
    });
  }, []);

  return (
    <>
      <Container style={styles.container}>
        <FormNextFocus inputKeys={InputFormKeys}>
          <InputWithImage
            editable={false}
            label="Número de cuenta"
            nativeID="AccountNumber"
            returnKeyType="next"
            value={account?.AccountNumber}
          />

          {editMode ? (
            <>
              <InputForm
                editable={editMode}
                label="Nombre/s"
                nativeID="FirstName"
                onChange={onChangeInput}
                required
                returnKeyType="next"
                value={account?.FirstName}
              />

              <InputForm
                editable={editMode}
                label="Apellido materno"
                nativeID="MiddleName"
                onChange={onChangeInput}
                returnKeyType="next"
                value={account?.MiddleName}
              />

              <InputForm
                editable={editMode}
                label="Apellido paterno"
                nativeID="LastName"
                onChange={onChangeInput}
                returnKeyType="next"
                value={account?.LastName}
              />
            </>
          ) : (
            <InputWithImage
              editable={false}
              label="Propietario"
              nativeID="fullAccountName"
              returnKeyType="next"
              value={fullAccountName}
            />
          )}

          {editMode ? (
            <>
              <InputForm
                editable={editMode}
                label="Ciudad"
                nativeID="City"
                onChange={onChangeInput}
                returnKeyType="next"
                value={account?.City}
              />

              <InputForm
                editable={editMode}
                label="Estado"
                nativeID="State"
                onChange={onChangeInput}
                returnKeyType="next"
                value={account?.State}
              />

              <InputForm
                editable={editMode}
                label="Calle"
                nativeID="Street"
                onChange={onChangeInput}
                returnKeyType="next"
                value={account?.Street}
              />

              <InputForm
                editable={editMode}
                keyboardType="decimal-pad"
                label="C.P."
                maxLength={5}
                nativeID="PostalCode"
                onChange={onChangeInput}
                returnKeyType="next"
                value={account?.PostalCode}
              />
            </>
          ) : (
            // <InputWithImage
            //   editable={false}
            //   label="Domicilio"
            //   nativeID="fullAccountAddress"
            //   returnKeyType="next"
            //   value={fullAccountAddress}
            // />
            <>
              <Row>
                <Pressable
                  onPress={() => onCopyDirirection(account?.Street)}
                  style={styles.flex1}>
                  <View>
                    <InputWithImage
                      editable={false}
                      label="Dirección del predio"
                      nativeID="Street"
                      returnKeyType="next"
                      value={account?.Street}
                    />
                  </View>
                </Pressable>

                <ButtonImage
                  image={mapIcon}
                  tintColor={colors.textPrimary}
                  onPress={() => onOpenNavigationMap(account?.Street || '')}
                  buttonStyle={styles.mapButton}
                />
              </Row>

              <Row>
                <Pressable
                  onPress={() =>
                    onCopyDirirection(account?.NotificationLocation)
                  }
                  style={styles.flex1}>
                  <View>
                    <InputWithImage
                      editable={false}
                      label="Dirección de notificación"
                      nativeID="NotificationLocation"
                      returnKeyType="next"
                      value={account?.NotificationLocation}
                    />
                  </View>
                </Pressable>

                <ButtonImage
                  image={mapIcon}
                  tintColor={colors.textPrimary}
                  onPress={() =>
                    onOpenNavigationMap(account?.NotificationLocation || '')
                  }
                  buttonStyle={styles.mapButton}
                />
              </Row>
            </>
          )}

          <InputWithImage
            editable={false}
            label="Monto de adeudo"
            nativeID="Amount"
            onChange={onChangeInput}
            returnKeyType="next"
            value={`$ ${toCurrency(account?.Amount)}`}
          />

          <InputForm
            editable={editMode}
            keyboardType="name-phone-pad"
            label="Celular"
            nativeID="Mobile"
            onChange={onChangeInput}
            returnKeyType="next"
            value={account?.Mobile}
          />

          <InputForm
            editable={editMode}
            keyboardType="email-address"
            label="Correo"
            nativeID="Email"
            onChange={onChangeInput}
            returnKeyType="done"
            value={account?.Email}
          />
        </FormNextFocus>

        {!editMode && (
          <>
            <Col>
              <Label fontSize={30} textAlign="center">
                Dirección del predio
              </Label>

              <Label style={styles.direcion} fontSize={20} selectable>
                {account?.Street}
              </Label>
            </Col>

            <StaticMapImage
              direction={account?.NotificationLocation}
              latitude={account?.Latitud}
              longitude={account?.Longitud}
            />
          </>
        )}

        <Col>
          {formErrors.map(error => (
            <Label color={colors.inputError}>{error}</Label>
          ))}
        </Col>

        {/* TODO */}
        {/* <Row style={styles.editButton} justifyContent="flex-end">
          {editMode ? (
            <>
              <PrimaryButton
                style={styles.cancelButton}
                borderLess
                onPress={onEditMode}
                textColor="#222">
                Cancelar
              </PrimaryButton>

              <PrimaryButton minWidth={160} icon={saveIcon} onPress={onSave}>
                Guardar
              </PrimaryButton>
            </>
          ) : (
            <PrimaryButton minWidth={160} icon={editIcon} onPress={onEditMode}>
              Editar
            </PrimaryButton>
          )}
        </Row> */}
      </Container>

      <ModalLoading visible={modalVisible} />
    </>
  );
};

export { AccountDetailsScreen };
