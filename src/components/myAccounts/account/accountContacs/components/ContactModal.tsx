import React, { useState } from 'react';

import { useInputReducerState } from '../../../../../hooks';
import { ContactProp } from '../../../../../types';

import { FormNextFocus } from '../../../../common/form/FormNextFocus';
import { InputForm } from '../../../../common/inputs';
import { DropdownForm } from '../../../../common/inputs/Dropdown/DropdownForm';
import { ModalScreen } from '../../../../common/modals/ModalBase';

interface Props {
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
  'Email',
];

const dataRelationship = [
  { label: 'Propietario', value: 'Propietario' },
  { label: 'Hijo', value: 'Hijo' },
  { label: 'Hija', value: 'Hija' },
  { label: 'Esposo', value: 'Esposo' },
  { label: 'Esposa', value: 'Esposa' },
  { label: 'Hermano', value: 'Hermano' },
  { label: 'Hermana', value: 'Hermana' },
];

export const ContactModal: React.FC<Props> = ({
  isNewContact,
  item,
  visible,
  onDismiss,
  onSave,
}) => {
  const [contact, setContact] = useState<ContactProp>(item);
  const { state, onChangeInput, setItemState } =
    useInputReducerState<ContactProp>(contact);

  const handleSave = React.useCallback(() => {
    const newState: ContactProp = {
      ...state,
      IsOwner: state.Relationship === 'Propietario',
    };

    onSave(newState);
  }, [onSave, state]);

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
      handleSecondaryButtonPress={onDismiss}
      handlePrimaryButtonPress={handleSave}
      visible={visible}>
      <FormNextFocus inputKeys={InputFormKeysFocus}>
        <InputForm
          autoFocus={true}
          label="Nombre/s"
          nativeID="FirstName"
          onChange={onChangeInput}
          required
          returnKeyType="next"
          value={state.FirstName}
        />

        <InputForm
          label="Apellido materno"
          nativeID="MiddleName"
          onChange={onChangeInput}
          returnKeyType="next"
          value={state.MiddleName}
        />

        <InputForm
          blurOnSubmit={true}
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
          keyboardType="email-address"
          label="Correo"
          nativeID="Email"
          onChange={onChangeInput}
          returnKeyType="done"
          value={state.Email}
        />
      </FormNextFocus>
    </ModalScreen>
  );
};
