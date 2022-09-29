import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Groups } from 'src/app/models/groups.model';
import { GroupsService } from 'src/app/services/groups.service';
import { SharedService } from 'src/app/services/shared.service';

type NewType = SharedService;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  myForm!: FormGroup;
  teamSize!: number;
  maxTeamSize: number = 3;
  groupInAnOrg!: Groups[];
  @Output() controlDisplayForm: EventEmitter<boolean> = new EventEmitter();
  @Output() reloadMenuComponent: EventEmitter<boolean> = new EventEmitter();


  @Input() displayRegisterGroupForm: boolean = false;
  @Input() currentSelectedGroup!: Groups;


  constructor(private formBuilder: FormBuilder,
    private groupsService: GroupsService,
    private router: Router,
    private sharedService: SharedService,
    private messageService: MessageService) {

  }

  ngOnInit(): void {

    this.teamSize = 0;

    console.log(this.currentSelectedGroup);
    if (this.currentSelectedGroup) {
      this.myForm = this.formBuilder.group({
        teamName: [{ value: this.currentSelectedGroup.GroupName, disabled: true }, [Validators.required]],
        phoneNumber: [this.currentSelectedGroup.SponsorPhone, Validators.compose([Validators.required, Validators.pattern('[- +()0-9]+')])],
        sponsorName: [this.currentSelectedGroup.SponsorName, [Validators.required]],
        sponsorEmail: [this.currentSelectedGroup.SponsorEmail, Validators.compose([Validators.required, Validators.email])],
        maxGroupSize: [this.currentSelectedGroup.MaxGroupSize, [Validators.required]]
      });
      this.teamSize = this.currentSelectedGroup.MaxGroupSize;
    } else {
      this.myForm = this.formBuilder.group({
        teamName: [null, [Validators.required]],
        phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern('[- +()0-9]+')])],
        sponsorName: [null, [Validators.required]],
        sponsorEmail: [null, Validators.compose([Validators.required, Validators.email])],
        maxGroupSize: [0, [Validators.required]]
      });
    }

    this.groupsService.getGroups$().subscribe(groups => {
      this.groupInAnOrg = groups;
    });
  }

  onSubmit(formValue: any): void {
    console.log('Form submitted ... ', this.myForm.valid);
    if (this.myForm.valid) {
      console.log('updating group');
      if (this.currentSelectedGroup) {
        const group: Groups = this.frameFormToGroup(formValue);
        this.groupsService.updateGroup(group).subscribe({
          next: (value: Groups) => {
            this.messageService.add({ severity: 'info', summary: 'Sucess', detail: `${group.GroupName} update sucess !` });
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error });
          },
          complete: () => {
            this.displayRegisterGroupForm = false;
            this.reloadMenuComponent.emit(true)
          }
        });
      } else {
        console.log('Adding group');
        const group: Groups = this.frameFormToGroup(formValue);
        this.groupsService.addGroup(group).subscribe({
          next: (value: Groups) => {
            this.messageService.add({ severity: 'info', summary: 'Sucess', detail: `${group.GroupName} added successfully !` });
          },
          error: (err: any) => console.error(err),
          complete: () => {
            this.displayRegisterGroupForm = false;
            this.reloadMenuComponent.emit(true)
          }
        });
      }
    }
  }

  onCancel() {
    this.myForm.reset();
    this.controlDisplayForm.emit(false);
  }

  frameFormToGroup(formValue: any): Groups {

    let groupToAdd!: Groups;
    let maxGroupID = 0;

    if (this.currentSelectedGroup) {
      maxGroupID = this.currentSelectedGroup.GroupId;
    } else {
      const max = Math.max(...this.groupInAnOrg.map(function (group: Groups) { return group.GroupId }));
      maxGroupID = max + 1;
    }

    groupToAdd = {
      "GroupId": maxGroupID,
      "GroupName": formValue.teamName ?? this.currentSelectedGroup.GroupName,
      "OrganizationName": this.sharedService.getOrgNameByRouterURL(this.router.url),
      "SponsorName": formValue.sponsorName,
      "SponsorPhone": formValue.phoneNumber,
      "SponsorEmail": formValue.sponsorEmail,
      "MaxGroupSize": formValue.maxGroupSize,
      "Members": this.currentSelectedGroup?.Members ?? []
    }

    return groupToAdd;
  }

}
