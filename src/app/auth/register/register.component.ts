import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent extends BaseComponent implements OnInit {
  /**
   * The register form
   */
  public registerForm: FormGroup;

  /**
   * Determines if a submit is in progress
   */
  public submitInProgress: boolean;

  /**
   * The user model to use for register
   */
  public user: User;

  constructor(private authService: AuthService, private router: Router) {
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

    if (!this.registerForm.valid) {
      this.submitInProgress = false;
      return;
    }

    this.authService.register(this.user).subscribe((token) => {
      this.submitInProgress = false;
      this.router.navigate(['/']);
    }, error => {
      this.submitInProgress = false;
      console.error(error);
    });
  }

  /**
   * Handles the button click for login
   */
  public onLogin() {
    this.router.navigate(['/', 'login']);
  }

  /**
   * Initializes the form
   */
  private initForm() {
    this.registerForm = new FormGroup({
      nickname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }
}
