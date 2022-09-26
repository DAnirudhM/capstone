import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Groups } from 'src/app/models/groups.model';
import { Members } from 'src/app/models/members';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-team-registration',
  templateUrl: './team-registration.component.html',
  styleUrls: ['./team-registration.component.scss']
})
export class TeamRegistrationComponent implements OnInit {

  teamRegistrationForm!: FormGroup;

  @Input() displayTeamRegisterForm: boolean = true;
  @Input() displayEditTeamForm: boolean = false;
  @Input() currentSelectedGroup!: Groups;
  @Input() selectedTeamMember!: Members;

  @Output() reloadTeamMembersComponent: EventEmitter<boolean> = new EventEmitter();
  @Output() controlDisplayForm: EventEmitter<boolean> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private membersService: MembersService) { }

  ngOnInit(): void {

    if (this.selectedTeamMember) {
      this.teamRegistrationForm = this.formBuilder.group({
        memberName: [this.selectedTeamMember.MemberName, [Validators.required]],
        memberEmail: [this.selectedTeamMember.MemberEmail, Validators.compose([Validators.required, Validators.email])],
        memberPhone: [this.selectedTeamMember.MemberPhone, Validators.compose([Validators.required, Validators.pattern('[- +()0-9]+')])]
      });
    } else {
      this.teamRegistrationForm = this.formBuilder.group({
        memberName: [null, [Validators.required]],
        memberEmail: [null, Validators.compose([Validators.required, Validators.email])],
        memberPhone: [null, Validators.compose([Validators.required, Validators.pattern('[- +()0-9]+')])]
      });
    }


  }

  onCancel() {
    this.controlDisplayForm.emit(false);
  }

  onSubmit(formValue: any) {
    console.log('Form submitted ... ', this.teamRegistrationForm.valid);

    if (this.teamRegistrationForm.valid) {
      const groupID = this.currentSelectedGroup.GroupId;

      if (this.selectedTeamMember) {
        console.log('Updating member !!', formValue);
        this.membersService.updateMemeberInGroup(groupID, this.frameFormToMember(formValue))
          .subscribe({
            next: (value: Members) => {
              console.log(`updated existing memeber of id ${value.MemberId}`);
            },
            error: (err: any) => console.error(err),
            complete: () => {
              this.displayTeamRegisterForm = false;
              this.reloadTeamMembersComponent.emit(true)
            }
          });

      } else {
        console.log('adding member !!', formValue);
        this.membersService.addMemberToGroup(groupID, this.frameFormToMember(formValue))
          .subscribe({
            next: (value: Members) => {
              console.log(`added new memeber with id ${value.MemberId}`);
            },
            error: (err: any) => console.error(err),
            complete: () => {
              this.displayTeamRegisterForm = false;
              this.reloadTeamMembersComponent.emit(true)
            }
          });
      }

    }

  }

  frameFormToMember(formValue: any): Members {
    let members!: Members;
    let maxId = Math.max(...(this.currentSelectedGroup.Members ?? []).map(function (member: Members) { return member.MemberId }))+1;
    
    if(this.selectedTeamMember){
      maxId = this.selectedTeamMember.MemberId
    }

    members = {
      MemberId: maxId,
      MemberEmail: formValue.memberEmail,
      MemberName: formValue.memberName,
      MemberPhone: formValue.memberPhone
    }
    return members;
  }


}
