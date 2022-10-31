import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AccountType } from '../../../types';
import { Col } from '../../common/grids/Col';
import { Label } from '../../common/grids/Label';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 4,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
});

interface Props {
  item: AccountType;
  navigation: NavigationProp<any>;
}

const MyAccountItem: React.FC<Props> = ({ item, navigation }) => {
  const onItemPress = React.useCallback(() => {
    console.log('click', item);
  }, [item]);

  return (
    <TouchableOpacity onPress={onItemPress}>
      <Col style={styles.container}>
        <Label fontSize={20} fontWeight="bold">
          {item.id}
        </Label>
        <Label fontSize={15}>{item.name}</Label>
        <Label fontSize={15}>{item.address}</Label>
      </Col>
    </TouchableOpacity>
  );
};

export { MyAccountItem };
