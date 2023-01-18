import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { useAccountUtils } from '../../../../hooks/account/useAccountUtils';
import { toCurrency } from '../../../../utilities/utils';
import {
  useAppDispatch,
  useAppSelector,
  useInputReducerState,
} from '../../../../hooks';
import { AccountDetailsProp } from '../../../../types';
import { loadAccount } from '../../../../redux/slices/accountDetailsSlice';

import { Col, Container, Label } from '../../../common/grids';
import { StaticMapImage } from '../../../common/images';
import { InputForm, InputWithImage } from '../../../common/inputs';
import { Row } from '../../../common/grids';
import { PrimaryButton } from '../../../common/buttons/PrimaryButton';
import { FormNextFocus } from '../../../common/form/FormNextFocus';

import { editIcon, saveIcon } from '../../../../assets/icons';
import { useValidateInput } from '../../../common/form/hooks/useValidateInput';
import colors from '../../../../colors';
import { InputFormKeys, InputValidations } from './accountDetails.validation';
import { ModalLoading } from '../../../common/modals';
import { useUpdateAccount } from '../../../../services';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  editButton: {
    paddingVertical: 16,
  },
  cancelButton: {
    marginRight: 16,
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

  const { fullAccountName, fullAccountAddress } =
    useAccountUtils(accountDetails);

  const { formErrors, validateForm } = useValidateInput(
    InputValidations,
    accountReducer,
  );

  const { updateAccount } = useUpdateAccount(accountReducer?.Id);

  const account = useMemo(() => {
    return editMode ? accountReducer : accountDetails;
  }, [accountDetails, editMode, accountReducer]);

  const onEditMode = useCallback(() => {
    setEditMode((prev: boolean) => !prev);
  }, []);

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
              <InputWithImage
                editable={false}
                label="Dirección"
                nativeID="Street"
                returnKeyType="next"
                value={account?.Street}
              />

              <InputWithImage
                editable={false}
                label="Dirección de notificación"
                nativeID="NotificationLocation"
                returnKeyType="next"
                value={account?.NotificationLocation}
              />
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
          <StaticMapImage
            latitude={account?.Latitud}
            longitude={account?.Longitud}
          />
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
