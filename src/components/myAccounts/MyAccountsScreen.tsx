import React, { useCallback, useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { searchIcon } from '../../assets/icons';
import { AccountType } from '../../types';
import { InputWithImage } from '../common/inputs/InputWithImage';
import { MyAccountItem } from './compoents/MyAccountItem';
import { isNumber } from '../../utilities/utils';
import { MyAccountListEmpty } from './compoents/MyAccountListEmpty';

interface Props {
  navigation: NavigationProp<any>;
}

const DATA_DUMMY: AccountType[] = [
  {
    id: '013',
    name: 'Juanito peres',
    address: 'addres 1',
  },
  {
    id: '02',
    name: 'María la del barrio',
    address: 'addres 2',
  },
  {
    id: '03',
    name: 'Checo peres',
    address: 'addres 3',
  },
  {
    id: '042',
    name: 'Don juan',
    address: 'addres 4',
  },
];

const MyAccountsScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<AccountType[]>([]);
  const [dataFilter, setDataFilter] = useState<AccountType[]>([]);

  useEffect(() => {
    setData(DATA_DUMMY);
    setDataFilter(DATA_DUMMY);
  }, []);

  const handleChangeSarch = useCallback(
    (value: string) => {
      setSearch(value);

      if (value.length === 0) {
        setDataFilter(data);
        return;
      }

      const newData = data.filter(({ id, name }) => {
        const isNum = isNumber(value[0]);

        return isNum
          ? id.includes(value)
          : name.toLowerCase().includes(value.toLowerCase());
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
          <MyAccountItem item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={MyAccountListEmpty}
      />
    </View>
  );
};

export { MyAccountsScreen };
