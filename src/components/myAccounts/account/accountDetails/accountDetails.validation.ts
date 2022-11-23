import { ValidationsProps } from '../../../common/form/hooks/useValidateInput';

export const InputFormKeys = [
  'FirstName',
  'MiddleName',
  'LastName',
  'City',
  'State',
  'Street',
  'PostalCode',
  'Mobile',
  'Email',
];

export const InputValidations: ValidationsProps[] = [
  {
    key: 'FirstName',
    keyName: 'Nombre',
    requerid: true,
  },
  {
    key: 'MiddleName',
    keyName: 'Apellido materno',
    requerid: true,
  },
  {
    key: 'LastName',
    keyName: 'Apellido paterno',
    requerid: true,
  },
  {
    key: 'City',
    keyName: 'Ciudad',
    requerid: true,
  },
  {
    key: 'State',
    keyName: 'Estado',
    requerid: true,
  },
  {
    key: 'Street',
    keyName: 'Calle',
    requerid: true,
  },
  {
    key: 'PostalCode',
    keyName: 'Código postal',
    requerid: true,
    onlyNumber: true,
    minLength: 5,
  },
  {
    key: 'Mobile',
    keyName: 'Celular',
    requerid: true,
    onlyNumber: true,
    minLength: 10,
  },
  {
    key: 'Email',
    keyName: 'Correo',
    isEmail: true,
  },
];
