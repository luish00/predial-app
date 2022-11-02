import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { searchIcon } from '../../assets/icons';

import { AccountDetailsProp } from '../../types';
import { isNumber } from '../../utilities/utils';

import { InputWithImage } from '../common/inputs/InputWithImage';
import { MyAccountItem } from './components/MyAccountItem';
import { MyAccountListEmpty } from './components/MyAccountListEmpty';
import { HomeTabChildernProps } from '../home/homeTab';

// eslint-disable-next-line prettier/prettier
interface Props extends HomeTabChildernProps { }

const MyAccountsScreen: React.FC<Props> = ({ accounts, homeNavigation }) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<AccountDetailsProp[]>([]);
  const [dataFilter, setDataFilter] = useState<AccountDetailsProp[]>([]);

  useEffect(() => {
    if (accounts.length > 0) {
      setData(accounts);
      setDataFilter(accounts);
    }
  }, [accounts]);

  const handleChangeSarch = useCallback(
    (value: string) => {
      setSearch(value);

      if (value.length === 0) {
        setDataFilter(data);
        return;
      }

      const newData = data.filter(
        ({ AccountNumber, FirstName, MiddleName, LastName }) => {
          const isNum = isNumber(value[0]);
          const fullNmae = `${FirstName} ${MiddleName} ${LastName}`;

          return isNum
            ? AccountNumber.includes(value)
            : fullNmae.toLowerCase().includes(value.toLowerCase());
        });

      setDataFilter(newData);
    },
    [data],
  );

  return (
    <View>
      <InputWithImage
        label=""
        placeholder="buscar"
        returnKeyType="search"
        value={search}
        onChangeText={handleChangeSarch}
        image={searchIcon}
      />

      <FlatList
        data={dataFilter}
        renderItem={({ item }) => (
          <MyAccountItem item={item} navigation={homeNavigation} />
        )}
        keyExtractor={item => item.AccountNumber}
        ListEmptyComponent={MyAccountListEmpty}
      />
    </View>
  );
};

export { MyAccountsScreen };
