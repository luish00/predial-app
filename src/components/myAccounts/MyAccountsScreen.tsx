import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { searchIcon } from '../../assets/icons';

import { AccountDetailsProp } from '../../types';
import { isNumber } from '../../utilities/utils';
import { Col, Label } from '../common/grids';

import { InputWithImage } from '../common/inputs';
import { HomeTabNavigationProp } from '../home/homeTab';
import { MyAccountItem } from './components/MyAccountItem';
import { MyAccountListEmpty } from './components/MyAccountListEmpty';

const MyAccountsScreen: React.FC<HomeTabNavigationProp> = ({
  accounts,
  isLoadingAccount,
  navigation,
  refreshAccounts,
}) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<AccountDetailsProp[]>([]);
  const [dataFilter, setDataFilter] = useState<AccountDetailsProp[]>([]);

  useEffect(() => {
    if (isLoadingAccount || data.length > 0) {
      return;
    }

    setData(accounts);
    setDataFilter(accounts);
  }, [isLoadingAccount, data, accounts]);

  const handleChangeSearch = useCallback(
    (value: string) => {
      setSearch(value);

      if (value.length === 0) {
        setDataFilter(data);
        return;
      }

      const newData = data.filter(
        ({ AccountNumber, FirstName, MiddleName, LastName }) => {
          const isNum = isNumber(value[0]);
          const fullName = `${FirstName} ${MiddleName} ${LastName}`;

          return isNum
            ? AccountNumber.includes(value)
            : fullName.toLowerCase().includes(value.toLowerCase());
        },
      );

      setDataFilter(newData);
    },
    [data],
  );

  const onRefresh = useCallback(() => {
    if (isLoadingAccount) {
      return;
    }

    refreshAccounts();
  }, [refreshAccounts, isLoadingAccount]);

  return (
    <View>
      <InputWithImage
        label=""
        nativeID="search"
        placeholder="buscar"
        returnKeyType="search"
        value={search}
        onChangeText={handleChangeSearch}
        image={searchIcon}
      />

      <Col>
        <Label textAlign="center" fontSize={20}>
          {`${dataFilter.length} de ${data.length}`}
        </Label>
      </Col>

      <FlatList
        data={dataFilter}
        renderItem={({ item }) => {
          return <MyAccountItem account={item} navigation={navigation} />;
        }}
        refreshControl={
          <RefreshControl refreshing={isLoadingAccount} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => String(`${index}-${item.AccountNumber}`)}
        ListEmptyComponent={MyAccountListEmpty}
      />
    </View>
  );
};

export { MyAccountsScreen };
