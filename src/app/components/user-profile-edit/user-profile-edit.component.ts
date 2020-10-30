import {Component, OnDestroy, OnInit} from '@angular/core';
import {InstrumentsService} from '../../services/instruments.service';
import {IInstrument} from '../../models/iinstrument';
import {ISkillLevels} from '../../models/ISkillLevels';
import {SkillService} from '../../services/skill.service';
import {UserProviderService} from '../../services/user-provider.service';
import {Subscription} from 'rxjs';
import {IUser} from '../../models/IUser';
import {BandService} from '../../services/band.service';
import {IUpdateUser} from '../../models/IUpdateUser';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
  message: string;
  userData = {
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    userId: null,
    skillLevelId: null,
    instrumentId: null
  };
  instruments: IInstrument[] = [];
  skillLevels: ISkillLevels[] = [];
  userDataSubscribtion: Subscription = Subscription.EMPTY;
  user: IUser;
  userUpdate = {
    id: null,
    email: '',
    password: ''
  };
  checkPassword = {
    id: null,
    password: ''
  };

  constructor(private instrumentService: InstrumentsService, private skillLevelService: SkillService,
              private userProviderService: UserProviderService,
              private userService: BandService) {
  }

  ngOnInit(): void {
    this.userProviderService.loadUser();
    this.userDataSubscribtion = this.userProviderService.getData().subscribe(data => {
      this.user = data;
    });
    this.userData.userId = this.user.id;


    this.instrumentService.getAllInstruments().subscribe(data => {
      this.instruments = data;
    });
    this.skillLevelService.getSkillLevels().subscribe(data => {
      this.skillLevels = data;
    });
    this.message = null;


  }

  ngOnDestroy(): void {
    this.userDataSubscribtion.unsubscribe();
  }

  submit(): void {
    console.log('something submitted');
  }

  createSkill(): void {
    this.skillLevelService.createSkill(this.userData.instrumentId, this.userData.userId, this.userData.skillLevelId);
    console.log(this.userData);
    window.location.reload();
    this.message = 'Instrument added';
  }

  deleteSkill(skillId: number): void {
    this.skillLevelService.deleteSkill(skillId);
    this.message = 'Skill Deleted';
  }

  updateData(): void {
    this.checkPassword.id = this.userData.userId;
    this.checkPassword.password = this.userData.currentPassword.trim();
    this.userUpdate.id = this.userData.userId;
    this.userService.checkPassword(this.checkPassword).subscribe(data => {
      if (!data) {
        this.message = 'the current password is wrong';
      } else {
        if ((this.userData.currentPassword === '') || (this.userData.newPassword === '') || (this.userData.confirmNewPassword === '')) {
          this.message = ' please fill out all the Password forms';
        } else if (this.userData.currentPassword === this.userData.newPassword) {
          this.message = 'the current and the new password should not be the same';
          console.log(this.userData.currentPassword, this.userData.newPassword);
        } else if (this.userData.newPassword !== this.userData.confirmNewPassword) {
          this.message = 'please make sure that new password and the confirmation-password are spelled the same';
        } else if (this.userData.email !== '') {
          this.userUpdate.email = this.userData.email;
          this.userUpdate.password = this.userData.newPassword;
          this.userService.updateUser(this.userUpdate);
          this.message = 'User Updated';
        } else {
          this.userUpdate.email = this.user.email;
          this.userUpdate.password = this.userData.newPassword;
          this.userService.updateUser(this.userUpdate);
          this.message = 'User Updated';
        }
      }
    });
  }

}
