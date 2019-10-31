import { IMember } from 'app/shared/model/member.model';
import { MemberType } from 'app/shared/model/enumerations/member-type.model';

export interface IMember {
  id?: number;
  type?: MemberType;
  userName?: string;
  name?: string;
  user?: IMember;
}

export class Member implements IMember {
  constructor(public id?: number, public type?: MemberType, public userName?: string, public name?: string, public user?: IMember) {}
}
