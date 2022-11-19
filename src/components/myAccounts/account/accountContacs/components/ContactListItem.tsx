import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Col, Label } from '../../../../common/grids';

import { ContactProp } from '../../../../../types';
import { useAccountContactUtils } from '../../../../../hooks/account/useAccountUtils';

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});

interface Props {
  item: ContactProp;
  onItemPress: (item: ContactProp) => void;
}

export const ContactListItem: React.FC<Props> = ({ item, onItemPress }) => {
  const { fullContactsName } = useAccountContactUtils(item);

  return (
    <TouchableOpacity onPress={() => onItemPress(item)}>
      <Col style={styles.container}>
        <Label fontSize={22}>{fullContactsName}</Label>
        <Label fontSize={18}>
          {item.IsOwner ? 'Propietario' : item.Relationship}
        </Label>
        <Label fontSize={18}>{item.Phone}</Label>
      </Col>
    </TouchableOpacity>
  );
};
