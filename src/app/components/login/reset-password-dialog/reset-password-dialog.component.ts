import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../services/user.service';
import {VerifySecurityAnswer} from '../../../models/VerifySecurityAnswer';
import {User} from '../../../models/User';
import {Mail} from '../../../models/Mail';
import {MailService} from '../../../services/mail.service';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ResetPasswordDialogComponent implements OnInit {
  isUser = false;
  username: string;
  user: User = new User();
  message: string = null;
  answerVerification: VerifySecurityAnswer = new VerifySecurityAnswer();
  mail: Mail = new Mail();

  constructor(public dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
              private userService: UserService, private mailService: MailService) {
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.dialogRef.close();
  }

  checkUsername(): void {
    this.userService.getDataAsAdmin().subscribe(token => {
      this.userService.getUserByUsernameAsAdmin(this.username, token.access_token).subscribe(data => {
          this.user = data;
          this.isUser = true;
        },
        error => {
          this.message = 'the user with the username: ' + this.username + ' was not found';
          this.isUser = false;
        });
    });
  }

  resetPassword(): void {
    this.answerVerification.userId = this.user.id;
    this.userService.getDataAsAdmin().subscribe(token => {
      this.userService.verifyAnswer(this.answerVerification, token.access_token).subscribe(data => {
        if (!data) {
          this.message = 'the answer was incorrect';
        } else {
          this.mail.email = this.user.email;
          this.mail.name = this.user.username;
          this.mail.subject = 'BandPage Password Reset';
          this.mail.message = 'dear ' + this.mail.name + ' your new password is: ';
          this.mailService.resetPassword(this.mail, token.access_token).subscribe(response => {
            this.message = 'a mail with the new Password has been send to your email adress';
            setTimeout(() => this.onClick(), 3000);
            console.log(response);
          }, error => {
            console.log('something went horribly wrong');
          });
        }
      });
    });
  }

}
