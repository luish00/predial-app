import { AttachmentProp, AttachmentType } from '../types.d';

export enum AttachmentModelStatus {
  Pending,
  Uploaded,
}

export class AttachmentModel implements AttachmentProp {
  Name = '';
  Type = AttachmentType.Evidencia;
  ParentId? = '';
  AccountId = '';
  Body = '';
  Status: AttachmentModelStatus = AttachmentModelStatus.Pending;

  constructor(props: AttachmentProp) {
    this.Name = `${props.ParentId}-${props.AccountId}-${
      props.Type
    }-${Date.now()}`;
    this.AccountId = props.AccountId;
    this.Body = props.Body;
    this.Type = props.Type;
    this.ParentId = props.ParentId;
  }
}
