import React from 'react';
import { StyleSheet } from 'react-native';
import { useAppSelector } from '../../../../hooks';
import { useAccountUtils } from '../../../../hooks/account/useAccountUtils';
import { Col, Label } from '../../../common/grids';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    borderBottomColor: '#222',
    borderBottomWidth: 1,
    padding: 16,
  },
});

export const AccountListHeader: React.FC = () => {
  const account = useAppSelector(state => state.accountDetails.accountDetails);
  const { fullAccountAddress, fullAccountName } = useAccountUtils(account);

  return (
    <Col style={styles.container}>
      <Label fontSize={30} fontWeight="bold">
        {account?.AccountNumber}
      </Label>

      <Label fontSize={20}>{fullAccountName}</Label>

      <Label fontSize={16}>{fullAccountAddress}</Label>
    </Col>
  );
};
