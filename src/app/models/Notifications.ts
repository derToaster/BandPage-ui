import {Band} from './Band';
import {User} from './User';

export class Notifications {
  id: number;
  message: string;
  isDeny: boolean;
  band: Band;
  sender: User;
  receiver: User;
}
