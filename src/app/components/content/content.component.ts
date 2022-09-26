import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmEventType, MenuItem } from 'primeng/api';
import { Groups } from 'src/app/models/groups.model';
import { Members } from 'src/app/models/members';
import { GroupsService } from 'src/app/services/groups.service';
import { MembersService } from 'src/app/services/members.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ContentComponent implements OnInit {
  availableGroups!: Groups[];
  selectedGroup!: Groups[];
  selectedTeamMember!: Members;
  availableMembers!: Members[];
  displayRegisterGroupForm: boolean = false;
  displayTeamRegistrationForm: boolean = false;


  @Output() currentSelectGroupEmitter: EventEmitter<Groups> = new EventEmitter();


  constructor(private groupsService: GroupsService,
    private memberService: MembersService,
    private confrimationService: ConfirmationService,
    private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.groupsService.getGroups$().subscribe(groups => {
      this.availableGroups = groups;
    });
  }

  onGroupSelect(event: MenuItem) {
    const groupName = event.label ?? "";
    this.getSelectedGroup(groupName);

  }

  getSelectedGroup(groupName: string): void {

    const selectGrp = this.availableGroups.find(group => group.GroupName === groupName) ?? {
      "GroupId": 0,
      "GroupName": "Unavailable",
      "OrganizationName": "Unavailable",
      "SponsorName": "Unavailable",
      "SponsorPhone": "Unavailable",
      "SponsorEmail": "Unavailable",
      "MaxGroupSize": 0,
      "Members": []
    };

    this.selectedGroup = [selectGrp];
    this.availableMembers = selectGrp.Members;

  }

  onTeamDetailsEdit() {
    this.displayRegisterGroupForm = true;
  }

  reloadMenuComponent($event: boolean) {
    if ($event) {
      console.log('reloading...');
      this.displayRegisterGroupForm = false;
      window.location.reload();
    }
  }

  controlDisplayGroupForm($event: boolean) {
    this.displayRegisterGroupForm = false;
  }

  controlDisplayTeamForm($event: boolean){
    this.displayTeamRegistrationForm = false;
  }

  updateGroup(): void {
    this.currentSelectGroupEmitter.emit(this.selectedGroup[0]);
  }


  editTeamMember(teamMember: Members) {
    this.displayTeamRegistrationForm = true;
    this.selectedTeamMember = teamMember;
  }


  onAddNewTeamMember() {
    this.displayTeamRegistrationForm = true;
  }

  reloadTeamMembersComponent($event: boolean) {
    if ($event) {
      this.displayTeamRegistrationForm = false;
      window.location.reload();
      //this.ngOnInit();
    }
  }

  onTeamDelete() {
    this.confrimationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.groupsService.deleteGroup(this.selectedGroup[0].GroupId)
          .subscribe({
            next: (value: Groups) => {
              console.log('Deleted', value);
            },
            error: (err: any) => console.error(err),
            complete: () => window.location.reload()
          });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });

  }

  removeTeamMember(teamMember: Members) {
    this.confrimationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.memberService.removeTeamMember(this.selectedGroup[0].GroupId, teamMember.MemberId)
          .subscribe({
            next: (value: Members) => {
              console.log('Removed', value);
            },
            error: (err: any) => console.error(err),
            complete: () => this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' })
          });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }

}


