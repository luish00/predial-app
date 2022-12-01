import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import colors from '../../../../colors';

import { Label } from '../../grids';

export type DropdownItemType = { label: string; value: string };

interface Props {
  data: DropdownItemType[];
  onChange: (item: DropdownItemType) => void;
  title: string;
  value: string | null | undefined;
  placeholder?: string;
}

const styles = StyleSheet.create({
  dropdownContainer: {
    paddingTop: 8,
  },
  dropdown: {
    paddingTop: 8,
    marginBottom: 16,
    borderBottomColor: colors.secondaryDark,
    borderBottomWidth: 2.5,
  },
});

const DropdownForm: React.FC<Props> = ({
  data,
  onChange,
  placeholder = 'Selecciona...',
  title,
  value,
}) => {
  return (
    <>
      <Label style={styles.dropdownContainer}>{title}</Label>

      <Dropdown
        style={styles.dropdown}
        data={data}
        maxHeight={400}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export { DropdownForm };
