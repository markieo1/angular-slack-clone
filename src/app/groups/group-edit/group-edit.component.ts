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
import { TagService } from '../../tags/tag.service';
import { Observable } from 'rxjs/Observable';
import { Select2OptionData } from 'ng2-select2/ng2-select2.interface';
import { Select2Component } from 'ng2-select2';

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
   * The tags selector
   */
  @ViewChild(Select2Component)
  public tagsSelector: Select2Component;

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
   * The available tags
   */
  public tags: Array<Select2OptionData>;

  /**
   * The options for the select2
   */
  public options: Select2Options;

  /**
   * The current value for the tags
   */
  public tagsValue: string[];

  /**
   * The id of the group if editing
   */
  private id: string;

  constructor(private groupService: GroupService,
    private tagService: TagService,
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

    this.initSelect2Options();

    this.loadTags();
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

    this.group.tags = this.tagsValue;

    let groupObservable = null;

    if (this.isNew) {
      groupObservable = this.groupService.create(this.group);
    } else {
      groupObservable = this.groupService.update(this.id, this.group);
    }

    this.subscription = groupObservable.subscribe(() => {
      this.tagService.resetCache();

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
   * Occurres when the tags are changed
   */
  public tagsChanged(event): void {
    this.tagsValue = event.value;
  }

  /**
   * Loads the group
   */
  private loadGroup() {
    this.groupService.get(this.id).subscribe((group) => {
      this.group = group;

      this.groupForm.setValue({
        name: this.group.name
      });

      this.assignTagsValue();
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

  /**
   * Loads the tags
   */
  private loadTags(): void {
    this.subscription = this.tagService.getAll()
      .map((tags) => tags.map((tag) => {
        return {
          id: tag,
          text: tag
        };
      }))
      .subscribe(tags => {
        this.tags = tags;
        this.assignTagsValue();
      });
  }

  /**
   * Assigns the tags value
   */
  private assignTagsValue() {
    const newValue = (this.group && this.group.tags) ? [...this.group.tags] : [];
    this.tagsValue = newValue;
  }

  /**
   * Initializes the select2 options
   */
  private initSelect2Options(): void {
    this.options = {
      tags: true,
      multiple: true,
      tokenSeparators: [',', ' '],
      placeholder: 'Select tags'
    };
  }
}
