import { ValidationsProps } from '../../../../common/form/hooks/useValidateInput';

export const FORM_NOTIFICATION = ['Name', 'Mobile', 'Email', 'PaymentPromise'];

export const InputFormValidations: ValidationsProps[] = [
  // {
  //   key: 'Name',
  //   keyName: 'Nombre del contacto',
  //   requerid: true,
  // },
  {
    key: 'Mobile',
    keyName: 'Teléfono',
    minLength: 10,
    onlyNumber: true,
    requerid: true,
  },
  {
    key: 'Email',
    isEmail: true,
    keyName: 'Correo',
  },
  {
    key: 'PaymentPromise',
    keyName: 'Promesa de pago',
    requerid: true,
  },
];
