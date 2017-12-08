import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { GroupService } from '../../groups/group.service';
import { ToolbarService } from '../../core/toolbar/toolbar.service';
import { ToolbarItem } from '../../core/toolbar/toolbar-item.class';
import { MdcDialogComponent } from '@angular-mdc/web';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../group.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['group-edit.component.scss']
})
export class GroupEditComponent extends BaseComponent implements OnInit, AfterViewInit {

  /**
   * The edit dialog component
   */
  @ViewChild(MdcDialogComponent)
  public editDialog: MdcDialogComponent;

  /**
   * The group form
   */
  public groupForm: FormGroup;

  /**
   * The group we are editing
   */
  public group: Group;

  /**
   * Determines if a submit is in progress
   */
  public submitInProgress: boolean;

  /**
   * Determines if we are creating a new one
   */
  public isNew = false;

  /**
   * The id of the group if editing
   */
  private id: string;

  constructor(private groupService: GroupService,
    private toolbarService: ToolbarService, private route: ActivatedRoute, private location: Location) {
    super();

    this.group = new Group();
  }

  ngOnInit(): void {
    this.initForm();

    this.subscription = this.route.params.subscribe(params => {
      this.id = params.id;
      this.isNew = params.id == null;

      if (!this.isNew) {
        this.loadGroup();
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

    if (!this.groupForm.valid) {
      this.submitInProgress = false;
      return;
    }

    let groupObservable = null;

    if (this.isNew) {
      groupObservable = this.groupService.create(this.group);
    } else {
      groupObservable = this.groupService.update(this.id, this.group);
    }

    this.subscription = groupObservable.subscribe(() => {
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
   * Loads the group
   */
  private loadGroup() {
    this.groupService.get(this.id).subscribe((group) => {
      this.group = group;
    });
  }

  /**
   * Initializes the form
   */
  private initForm() {
    this.groupForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }
}
