import {User} from './User';
import {BandMembership} from './band-membership';
import {Notifications} from './Notifications';

export class Band {

  id: number;
  name: string;
  genre: string;
  bandSize: number;
  owner: User;
  memberships: BandMembership[];
  bandInvites: Notifications;
  soeren: boolean;
  constructor() {
  }
}
