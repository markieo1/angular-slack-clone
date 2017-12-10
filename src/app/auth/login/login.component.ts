import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';
import { AUTH_SERVICE } from '../../shared/auth/auth-service.token';
import { IAuthService } from '../../shared/auth/iauth-service.interface';

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

  constructor( @Inject(AUTH_SERVICE) private authService: IAuthService, private router: Router) {
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
      this.router.navigate(['/']);
    }, error => {
      this.submitInProgress = false;
      console.error(error);
    });
  }

  /**
   * Handles the button click for register
   */
  public onRegister() {
    this.router.navigate(['/', 'register']);
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
