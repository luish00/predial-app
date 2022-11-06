import React, { useState } from 'react';
import { useInputReducerState } from '../../../../hooks/useReducerState';
import { ContactProp } from '../../../../types';
import { Container } from '../../../common/grids';
import { InputWithImage } from '../../../common/inputs/InputWithImage';
import { ModalBase } from '../../../common/modals/ModalBase';

interface Props {
  item: ContactProp;
  onDismiss: () => void;
  onSave: (item: ContactProp) => void;
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
        <InputWithImage
          label="Nombre/s"
          nativeID="FirstName"
          onChange={onChangeInput}
          required
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
          label="Apelligto paterno"
          nativeID="LastName"
          onChange={onChangeInput}
          returnKeyType="next"
          value={state.LastName}
        />

        <InputWithImage
          label="Parentesco"
          nativeID="Relationship"
          onChange={onChangeInput}
          required
          returnKeyType="next"
          value={state.Relationship}
        />

        <InputWithImage
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
