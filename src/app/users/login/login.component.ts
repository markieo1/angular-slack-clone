import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/shared/basecomponent.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { User } from 'app/users/user.model';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent extends BaseComponent implements OnInit {
  /**
   * The login form
   */
  public loginForm: FormGroup;

  /**
   * Determines if a submit is in progress
   */
  public submitInProgress: boolean;

  /**
   * The user model to use for login
   */
  public user: User;

  constructor(private authService: AuthService) {
    super();
    this.user = new User();
  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Handles the onsubmit of the form
   */
  public onSubmit() {
    this.submitInProgress = true;

    if (!this.loginForm.valid) {
      this.submitInProgress = false;
      return;
    }

    this.authService.login(this.user).subscribe((token) => {
      this.submitInProgress = false;
      debugger;
    }, error => {
      this.submitInProgress = false;
      console.error(error);
    });
  }

  /**
   * Initializes the form
   */
  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }
}
