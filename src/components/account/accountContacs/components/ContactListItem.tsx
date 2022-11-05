import React from 'react';
import { StyleSheet } from 'react-native';

import { Col, Label } from '../../../common/grids';

import { ContactProp } from '../../../../types';
import { useAccountContactUtils } from '../../../../hooks/account/useAccountUtils';

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});

interface Props {
  item: ContactProp;
}

export const ContactListItem: React.FC<Props> = ({ item }) => {
  const { fullContactsName } = useAccountContactUtils(item);

  return (
    <Col style={styles.container}>
      <Label fontSize={22}>{fullContactsName}</Label>
      <Label fontSize={18}>
        {item.IsOwner ? 'Propietario' : item.Relationship}
      </Label>
      <Label fontSize={18}>{item.Phone}</Label>
    </Col>
  );
};
