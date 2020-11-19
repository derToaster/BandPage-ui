import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {ResetPasswordDialogComponent} from './reset-password-dialog/reset-password-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService,
              private router: Router, private dialogRef: MatDialog) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.authService.authenticate(this.loginUserData.username, this.loginUserData.password).then(() => {
      this.router.navigate(['/userprofile']);
    });
  }
  openDialog(): void {
    this.dialogRef.open(ResetPasswordDialogComponent);
  }
}
