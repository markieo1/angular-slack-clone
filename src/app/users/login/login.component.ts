import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/shared/basecomponent.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() {
    super()
  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Handles the onsubmit of the form
   */
  public onSubmit() {
    this.submitInProgress = true;
    debugger;
  }

  /**
   * Initializes the form
   */
  private initForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', Validators.required)
    });
  }
}
