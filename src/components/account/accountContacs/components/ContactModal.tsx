import React, { useState } from 'react';

import { useInputReducerState } from '../../../../hooks';
import { ContactProp } from '../../../../types';

import { FormNextFocus } from '../../../common/form/FormNextFocus';
import { Container } from '../../../common/grids';
import { InputForm } from '../../../common/inputs';
import { ModalBase } from '../../../common/modals/ModalBase';

interface Props {
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

export const ContactModal: React.FC<Props> = ({
  item,
  visible,
  onDismiss,
  onSave,
}) => {
  const [contact, setContact] = useState<ContactProp>(item);

  const { state, onChangeInput } = useInputReducerState<ContactProp>(contact);

  React.useEffect(() => {
    if (visible) {
      setContact(item);
    }
  }, [item, visible]);

  return (
    <ModalBase
      primaryText="Guardar"
      secondaryText="Cancelar"
      title="Contacto"
      handleSecondaryButtonPress={onDismiss}
      handlePrimaryButtonPress={() => onSave(state)}
      visible={visible}>
      <Container>
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
            label="Apellido paterno"
            nativeID="LastName"
            onChange={onChangeInput}
            returnKeyType="next"
            value={state.LastName}
          />

          <InputForm
            label="Parentesco"
            nativeID="Relationship"
            onChange={onChangeInput}
            required
            returnKeyType="next"
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
      </Container>
    </ModalBase>
  );
};
