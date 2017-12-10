import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { UserService } from '../../users/user.service';
import { ToolbarService } from '../../core/toolbar/toolbar.service';
import { ToolbarItem } from '../../core/toolbar/toolbar-item.class';
import { MdcDialogComponent } from '@angular-mdc/web';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/user.model';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['user-edit.component.scss']
})
export class UserEditComponent extends BaseComponent implements OnInit, AfterViewInit {

  /**
   * The edit dialog component
   */
  @ViewChild(MdcDialogComponent)
  public editDialog: MdcDialogComponent;

  /**
   * The user form
   */
  public userForm: FormGroup;

  /**
   * The user we are editing
   */
  public user: User;

  /**
   * Determines if a submit is in progress
   */
  public submitInProgress: boolean;

  /**
   * Determines if we are creating a new one
   */
  public isNew = false;

  /**
   * The id of the user if editing
   */
  private id: string;

  constructor(private userService: UserService,
    private toolbarService: ToolbarService, private route: ActivatedRoute, private location: Location) {
    super();

    this.user = new User();
  }

  ngOnInit(): void {
    this.initForm();

    this.subscription = this.route.params.subscribe(params => {
      this.id = params.id;
      this.isNew = params.id == null;

      if (!this.isNew) {
        this.loadUser();
      } else {
        this.userForm.get('password').setValidators(Validators.required);
      }
    });

    this.subscription = this.editDialog._cancel.subscribe(() => {
      this.discardChanges();
    });
  }

  ngAfterViewInit(): void {
    this.editDialog.show();
  }

  /**
   * Saves the changes
   */
  public onSubmit(): void {
    this.submitInProgress = true;

    if (!this.userForm.valid) {
      this.submitInProgress = false;
      return;
    }

    let userObservable: Observable<User>;

    if (this.isNew) {
      userObservable = this.userService.create(this.user);
    } else {
      userObservable = this.userService.update(this.id, this.user);
    }

    userObservable = userObservable.finally(() => this.user.password = '');

    this.subscription = userObservable.subscribe(() => {
      this.submitInProgress = false;
      this.location.back();
    }, error => {
      this.submitInProgress = false;
      console.error(error);
    });
  }

  /**
   * Discards the made changes
   */
  public discardChanges(): void {
    this.location.back();
  }

  /**
   * Loads the user
   */
  private loadUser() {
    this.userService.get(this.id).subscribe((user) => {
      this.user = user;

      this.userForm.setValue({
        nickname: this.user.nickname,
        email: this.user.email,
        password: ''
      });
    });
  }

  /**
   * Initializes the form
   */
  private initForm() {
    this.userForm = new FormGroup({
      nickname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
    });
  }
}
