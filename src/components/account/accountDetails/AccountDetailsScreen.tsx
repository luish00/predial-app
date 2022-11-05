import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { useAccountContext } from '../../../contexts/useAccountContext';
import { useAccountUtils } from '../../../hooks/account/useAccountUtils';
import { toCurrency } from '../../../utilities/utils';

import { Container } from '../../common/grids';
import { StaticMapImage } from '../../common/images';
import { InputWithImage } from '../../common/inputs/InputWithImage';
import { Row } from '../../common/grids';
import { PrimaryButton } from '../../common/buttons/PrimaryButton';

import { editIcon, saveIcon } from '../../../assets/icons';
import { useAccountState } from './hoks/useAccountState';
import { useMemo } from 'react';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  editButton: {
    paddingVertical: 16,
  },
});

const AccountDetailsScreen: React.FC = () => {
  const {
    accountFunctions: { loadAccount },
    accountState,
  } = useAccountContext();
  const [editMode, setEditMode] = useState(false);

  const { accountReducer, onChangeTextAccount, initAccountReducer } =
    useAccountState(accountState.account);
  const { fullAccountName, fullAccountAddress } = useAccountUtils(
    accountState.account,
  );

  const account = useMemo(() => {
    return editMode ? accountReducer : accountState.account;
  }, [accountState.account, editMode, accountReducer]);

  const onEditMode = useCallback(() => {
    setEditMode((prev: boolean) => !prev);
  }, []);

  const onSave = useCallback(() => {
    if (!accountReducer) {
      return;
    }

    loadAccount(accountReducer);
    setEditMode(false);
  }, [accountReducer, loadAccount]);

  return (
    <Container style={styles.container}>
      <InputWithImage
        editable={false}
        label="Número de cuenta"
        returnKeyType="next"
        value={account?.AccountNumber}
      />

      {editMode ? (
        <>
          <InputWithImage
            editable={editMode}
            label="Nombre/s"
            nativeID="FirstName"
            onChange={onChangeTextAccount}
            required
            returnKeyType="next"
            value={account?.FirstName}
          />

          <InputWithImage
            editable={editMode}
            label="Apellido materno"
            nativeID="MiddleName"
            onChange={onChangeTextAccount}
            returnKeyType="next"
            value={account?.MiddleName}
          />

          <InputWithImage
            editable={editMode}
            label="Apellido paterno"
            nativeID="LastName"
            onChange={onChangeTextAccount}
            returnKeyType="next"
            value={account?.LastName}
          />
        </>
      ) : (
        <InputWithImage
          editable={false}
          label="Propietario"
          returnKeyType="next"
          value={fullAccountName}
        />
      )}

      {editMode ? (
        <>
          <InputWithImage
            editable={editMode}
            label="Ciudad"
            nativeID="City"
            onChange={onChangeTextAccount}
            returnKeyType="next"
            value={account?.City}
          />

          <InputWithImage
            editable={editMode}
            label="Estado"
            nativeID="State"
            onChange={onChangeTextAccount}
            returnKeyType="next"
            value={account?.State}
          />

          <InputWithImage
            editable={editMode}
            label="Calle"
            nativeID="Street"
            onChange={onChangeTextAccount}
            returnKeyType="next"
            value={account?.Street}
          />

          <InputWithImage
            editable={editMode}
            keyboardType="decimal-pad"
            label="C.P."
            maxLength={5}
            nativeID="PostalCode"
            onChange={onChangeTextAccount}
            returnKeyType="next"
            value={account?.PostalCode}
          />
        </>
      ) : (
        <InputWithImage
          editable={false}
          label="Domicilio"
          returnKeyType="next"
          value={fullAccountAddress}
        />
      )}

      <InputWithImage
        editable={false}
        label="Monto de adeudo"
        nativeID="Amount"
        onChange={onChangeTextAccount}
        returnKeyType="next"
        value={`$ ${toCurrency(account?.Amount)}`}
      />

      <InputWithImage
        editable={editMode}
        keyboardType="name-phone-pad"
        label="Celular"
        nativeID="Mobile"
        onChange={onChangeTextAccount}
        returnKeyType="next"
        value={account?.Mobile}
      />

      <InputWithImage
        editable={editMode}
        keyboardType="email-address"
        label="Correo"
        nativeID="Email"
        onChange={onChangeTextAccount}
        returnKeyType="done"
        value={account?.Email}
      />

      <StaticMapImage
        latitude={account?.Latitud}
        longitude={account?.Longitud}
      />

      <Row style={styles.editButton} justifyContent="flex-end">
        {editMode ? (
          <>
            <PrimaryButton borderLess onPress={onEditMode}>
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
      </Row>
    </Container>
  );
};

export { AccountDetailsScreen };
