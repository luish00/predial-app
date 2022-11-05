import { ContactProp } from '../types';

export const CONTACTS_DUMMY: ContactProp[] = [
  {
    AccountId: '1',
    IsOwner: true,
    FirstName: 'Contact 1',
    MiddleName: 'midle',
    LastName: '',
    Relationship: 'propietario',
    Phone: '6677112233',
  },
  {
    AccountId: '2',
    IsOwner: false,
    FirstName: 'Contact 2',
    MiddleName: '',
    LastName: 'last',
    Relationship: 'hija',
    Phone: '6677223344',
  },
  {
    AccountId: '3',
    IsOwner: false,
    FirstName: 'Contact 3',
    MiddleName: '',
    LastName: '',
    Relationship: 'hijo',
    Phone: '6677334455',
  },
];