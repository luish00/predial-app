import React, { useState } from 'react';
import colors from '../../../../../colors';

import { useInputReducerState } from '../../../../../hooks';
import { ContactProp } from '../../../../../types';

import { FormNextFocus } from '../../../../common/form/FormNextFocus';
import { Col, Label } from '../../../../common/grids';
import { InputForm } from '../../../../common/inputs';
import { DropdownForm } from '../../../../common/inputs/Dropdown/DropdownForm';
import { ModalScreen } from '../../../../common/modals/ModalBase';

interface Props {
  errors: string[];
  isLoading: boolean;
  isNewContact: boolean;
  item: ContactProp;
  onDismiss: () => void;
  onSave: (item: ContactProp) => void;
  visible: boolean;
}

const InputFormKeysFocus = [
  'FirstName',
  'MiddleName',
  'LastName',
  'Relationship',
  'Mobile',
  'Phone',
  'Email',
];

const dataRelationship = [
  { label: 'Propietario(a)', value: 'Propietario(a)' },
  { label: 'Esposo(a)', value: 'Esposo(a)' },
  { label: 'Hijo(a)', value: 'Hijo(a)' },
  { label: 'Padre', value: 'Padre' },
  { label: 'Abuelo(a)', value: 'Abuelo(a)' },
  { label: 'Tío(a)', value: 'Tío(a)' },
  { label: 'Sobrino(a)', value: 'Sobrino(a)' },
  { label: 'Otro', value: 'Otro' },
];

export const ContactModal: React.FC<Props> = ({
  errors,
  isLoading,
  isNewContact,
  item,
  onDismiss,
  onSave,
  visible,
}) => {
  const [contact, setContact] = useState<ContactProp>(item);
  const { state, onChangeInput, setItemState } =
    useInputReducerState<ContactProp>(contact);

  const handleSave = React.useCallback(() => {
    if (isLoading) {
      return;
    }

    const newState: ContactProp = {
      ...state,
      IsOwner: state.Relationship === 'Propietario(a)',
    };

    onSave(newState);
  }, [isLoading, onSave, state]);

  const handleDismiss = React.useCallback(() => {
    if (isLoading) {
      return;
    }

    onDismiss();
  }, [isLoading, onDismiss]);

  React.useEffect(() => {
    if (visible) {
      setContact(item);
    }
  }, [item, visible]);

  return (
    <ModalScreen
      primaryText="Guardar"
      secondaryText="Cancelar"
      title={isNewContact ? 'Agregar contacto' : 'Editar contacto'}
      handleSecondaryButtonPress={handleDismiss}
      handlePrimaryButtonPress={handleSave}
      visible={visible}>
      <FormNextFocus inputKeys={InputFormKeysFocus}>
        <InputForm
          autoFocus={true}
          disabled={isLoading}
          label="Nombre/s"
          nativeID="FirstName"
          onChange={onChangeInput}
          required
          returnKeyType="next"
          value={state.FirstName}
        />

        <InputForm
          disabled={isLoading}
          label="Apellido materno"
          nativeID="MiddleName"
          onChange={onChangeInput}
          returnKeyType="next"
          value={state.MiddleName}
        />

        <InputForm
          blurOnSubmit={true}
          disabled={isLoading}
          label="Apellido paterno"
          nativeID="LastName"
          onChange={onChangeInput}
          returnKeyType="next"
          value={state.LastName}
        />

        <DropdownForm
          title="Parentesco"
          data={dataRelationship}
          onChange={itemRelationship => {
            setItemState('Relationship', itemRelationship.value);
          }}
          value={state.Relationship}
        />

        <InputForm
          disabled={isLoading}
          keyboardType="number-pad"
          label="Celular"
          maxLength={10}
          minLength={10}
          nativeID="Mobile"
          onChange={onChangeInput}
          required
          returnKeyType="next"
          value={state.Mobile}
        />

        <InputForm
          disabled={isLoading}
          keyboardType="number-pad"
          label="Teléfono"
          maxLength={10}
          minLength={10}
          nativeID="Phone"
          onChange={onChangeInput}
          required
          returnKeyType="next"
          value={state.Phone}
        />

        <InputForm
          disabled={isLoading}
          keyboardType="email-address"
          label="Correo"
          nativeID="Email"
          onChange={onChangeInput}
          returnKeyType="done"
          value={state.Email}
        />
      </FormNextFocus>

      <Col>
        {errors.map((error, index) => (
          <Label key={String(index)} color={colors.inputError}>
            {`* ${error}`}
          </Label>
        ))}
      </Col>
    </ModalScreen>
  );
};
