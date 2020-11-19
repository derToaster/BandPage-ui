import {ISkills} from './ISkills';
import {Band} from './Band';
import {Notifications} from './Notifications';
import {BandMembership} from './band-membership';
import {Role} from './Role';


export class User {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  enabled: boolean;
  role: Role[];
  userSkills: ISkills[];
  ownership: Band[];
  memberships: BandMembership[];
  sent: Notifications [];
  received: Notifications [];
  securityQuestion: string;
  securityAnswer: string;
  approved: boolean;
}
