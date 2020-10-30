import {IInstrument} from './IInstrument';
import {ISkills} from './ISkills';


export interface IUser {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  userSkills: ISkills[];
}
