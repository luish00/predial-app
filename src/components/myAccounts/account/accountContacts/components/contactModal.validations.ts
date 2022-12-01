import { ValidationsProps } from '../../../../common/form/hooks/useValidateInput';

export const InputFormKeysFocus = [
  'FirstName',
  'MiddleName',
  'LastName',
  'Relationship',
  'Mobile',
  'Phone',
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
    key: 'Relationship',
    keyName: 'Parentesco',
    requerid: true,
  },
  {
    key: 'Mobile',
    keyName: 'Celular',
    requerid: true,
    onlyNumber: true,
    minLength: 10,
  },
  {
    key: 'Phone',
    keyName: 'Teléfono',
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
