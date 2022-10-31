import React from 'react';
import { View } from 'react-native';
import { Label } from '../../common/grids/Label';

const MyAccountListEmpty: React.FC = () => (
  <Label fontSize={30} fontWeight="bold" textAlign="center">
    Sin resultados
  </Label>
);

export { MyAccountListEmpty };
