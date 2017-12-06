import { Component } from '@angular/core';
import { BaseComponent } from 'app/shared/basecomponent.class';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent extends BaseComponent {
  constructor() {
    super()
  }
}
