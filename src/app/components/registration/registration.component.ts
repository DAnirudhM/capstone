import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  maxTeamSize: number = 10;
  groupInAnOrg!: Groups[];
  @Output() controlDisplayFromForm: EventEmitter<boolean> = new EventEmitter();
  @Output() reloadMenuComponent: EventEmitter<boolean> = new EventEmitter();


  @Input() displayRegisterGroupForm: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private groupsService: GroupsService,
    private router: Router,
    private sharedService: SharedService) {

    this.myForm = formBuilder.group({
      teamName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      sponsorName: [null, [Validators.required]],
      sponsorEmail: [null, Validators.compose([Validators.required, Validators.email])],
      maxGroupSize: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.teamSize = 0;
    this.groupsService.getGroups$().subscribe(groups => {
      console.log(groups);
      this.groupInAnOrg = groups;
    });
  }

  onSubmit(formValue: any): void {
    if (this.myForm.valid) {
      const group: Groups = this.frameFormToGroup(formValue);
      this.groupsService.addGroup(group).subscribe({
        next: (value: Groups) => {
          console.log('Added', value);
        },
        error: (err: any) => console.error(err),
        complete: () => this.reloadMenuComponent.emit(true)
      });
    }
  }

  onCancel() {
    this.myForm.reset();
    this.controlDisplayFromForm.emit(false);
  }

  frameFormToGroup(formValue: any): Groups {

    let groupToAdd!: Groups;
    const maxGroupID = Math.max(...this.groupInAnOrg.map(function (group: Groups) { return group.GroupId }));

    groupToAdd = {
      "GroupId": maxGroupID + 1,
      "GroupName": formValue.teamName,
      "OrganizationName": this.sharedService.getOrgNameByRouterURL(this.router.url),
      "SponsorName": formValue.sponsorName,
      "SponsorPhone": formValue.phoneNumber,
      "SponsorEmail": formValue.sponsorEmail,
      "MaxGroupSize": formValue.maxGroupSize,
      "Members": []
    }

    return groupToAdd;


  }

}
