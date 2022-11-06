import React, { useState } from 'react';

import { useInputReducerState, useTextInputNext } from '../../../../hooks';
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

const InputFormFocus = [
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
  const { onSubmitEditing, focusPocus } = useTextInputNext(InputFormFocus);

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
          onSubmitEditing={onSubmitEditing}
          required
          returnKeyType="next"
          value={state.FirstName}
        />

        <InputWithImage
          focus={focusPocus['MiddleName']}
          label="Apellido materno"
          nativeID="MiddleName"
          onChange={onChangeInput}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="next"
          value={state.MiddleName}
        />

        <InputWithImage
          focus={focusPocus['LastName']}
          label="Apelligto paterno"
          nativeID="LastName"
          onChange={onChangeInput}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="next"
          value={state.LastName}
        />

        <InputWithImage
          focus={focusPocus['Relationship']}
          label="Parentesco"
          nativeID="Relationship"
          onChange={onChangeInput}
          onSubmitEditing={onSubmitEditing}
          required
          returnKeyType="next"
          value={state.Relationship}
        />

        <InputWithImage
          focus={focusPocus['Mobile']}
          keyboardType="number-pad"
          label="Celular"
          maxLength={10}
          minLength={10}
          nativeID="Mobile"
          onChange={onChangeInput}
          onSubmitEditing={onSubmitEditing}
          required
          returnKeyType="next"
          value={state.Mobile}
        />

        <InputWithImage
          focus={focusPocus['Email']}
          keyboardType="email-address"
          label="Correo"
          nativeID="Email"
          onChange={onChangeInput}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="done"
          value={state.Email}
        />
      </Container>
    </ModalBase>
  );
};
