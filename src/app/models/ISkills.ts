import {User} from './User';
import {ISkillLevels} from './ISkillLevels';
import {IInstrument} from './iinstrument';

export interface ISkills{
  id: number;
  user: User;
  skillLevels: ISkillLevels;
  instruments: IInstrument;
}
