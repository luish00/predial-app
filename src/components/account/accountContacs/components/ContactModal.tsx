import React, { useState } from 'react';
import { useInputReducerState } from '../../../../hooks/useReducerState';
import { ContactProp } from '../../../../types';
import { Container } from '../../../common/grids';
import { InputWithImage } from '../../../common/inputs/InputWithImage';
import { ModalBase } from '../../../common/modals/ModalBase';

interface Props {
  item: ContactProp;
  onDismiss: () => void;
  onSave: () => void;
  visible: boolean;
}

export const ContactModal: React.FC<Props> = ({
  item,
  visible,
  onDismiss,
  onSave,
}) => {
  const [contact, setContact] = useState<ContactProp>(item);

  const { state, onChangeInput } = useInputReducerState<ContactProp>(contact);

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    setContact(item);
  }, [item, visible]);

  console.log('state', item)

  return (
    <ModalBase
      primaryText="Guardar"
      secondaryText="Cancelar"
      title="Contacto"
      handleSecondaryButtonPress={onDismiss}
      handlePrimaryButtonPress={onSave}
      visible={visible}>
      <Container>
        <InputWithImage
          label="Apellido Paterno"
          nativeID="FirstName"
          onChange={onChangeInput}
          returnKeyType="next"
          value={state.FirstName}
        />

        <InputWithImage
          label="Apellido materno"
          nativeID="MiddleName"
          onChange={onChangeInput}
          returnKeyType="next"
          value={state.MiddleName}
        />

        <InputWithImage
          label="Propietario"
          nativeID="LastName"
          onChange={onChangeInput}
          returnKeyType="next"
          value={state.LastName}
        />

        <InputWithImage
          keyboardType="number-pad"
          label="Celular"
          maxLength={10}
          minLength={10}
          nativeID="Mobile"
          onChange={onChangeInput}
          returnKeyType="next"
          value={state.Mobile}
        />

        <InputWithImage
          keyboardType="email-address"
          label="Correo"
          nativeID="Email"
          onChange={onChangeInput}
          returnKeyType="done"
          value={state.Email}
        />
      </Container>
    </ModalBase>
  );
};
