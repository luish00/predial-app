import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AccountDetailsProp } from '../../../types';
import { Col } from '../../common/grids/Col';
import { Label } from '../../common/grids/Label';
import { useAccountUtils } from '../../../hooks/account/useAccountUtils';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 4,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
});

interface Props {
  account: AccountDetailsProp;
  navigation: NavigationProp<any>;
}

const MyAccountItem: React.FC<Props> = ({ account, navigation }) => {
  const { fullAccountName, fullAccountAddress } = useAccountUtils(account);

  const onItemPress = React.useCallback(() => {
    navigation.navigate('accountDetailsTab', { account });
  }, [account, navigation]);

  return (
    <TouchableOpacity onPress={onItemPress}>
      <Col style={styles.container}>
        <Label fontSize={20} fontWeight="bold">
          {account.AccountNumber}
        </Label>
        <Label fontSize={15}>{fullAccountName}</Label>
        <Label fontSize={15}>{fullAccountAddress}</Label>
      </Col>
    </TouchableOpacity>
  );
};

export { MyAccountItem };
