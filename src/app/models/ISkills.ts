import {IUser} from './IUser';
import {ISkillLevels} from './ISkillLevels';
import {IInstrument} from './iinstrument';

export interface ISkills{
  id: number;
  user: IUser;
  skillLevels: ISkillLevels;
  instruments: IInstrument;
}
