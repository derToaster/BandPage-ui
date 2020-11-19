import {User} from './User';
import {Band} from './Band';

export class BandMembership {
  id: number;
  members: User;
  band: Band;
}
