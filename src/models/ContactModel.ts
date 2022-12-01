import { ContactProp } from '../types';

export class ContactModel implements ContactProp {
  Id = 0;
  IsOwner = false;
  Name = '';
  Relationship = '';
  FirstName = '';
  MiddleName = '';
  LastName = '';
  Phone = '';
  Mobile = '';
  Email = '';
  AccountId = '';

  constructor(contact?: ContactModel | null | undefined) {
    if (!contact) {
      return;
    }

    this.Id = contact.Id;
    this.IsOwner = contact.IsOwner;
    this.Name = contact.Name;
    this.Relationship = contact.Relationship;
    this.FirstName = contact.FirstName;
    this.MiddleName = contact.MiddleName;
    this.LastName = contact.LastName;
    this.Phone = contact.Phone;
    this.Mobile = contact.Mobile;
    this.Email = contact.Email;
    this.AccountId = contact.AccountId;
  }
}
