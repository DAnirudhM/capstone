import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmEventType, MenuItem } from 'primeng/api';
import { Groups } from 'src/app/models/groups.model';
import { Members } from 'src/app/models/members';
import { GroupsService } from 'src/app/services/groups.service';
import { MembersService } from 'src/app/services/members.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

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
  maxGroupSize: number = 0;
  currentMemberSize: number = 0;
  selectedGroupName!: string;

  @Output() currentSelectGroupEmitter: EventEmitter<Groups> = new EventEmitter();


  constructor(private groupsService: GroupsService,
    private memberService: MembersService,
    private confrimationService: ConfirmationService,
    private messageService: MessageService,
    private sharedService: SharedService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getGroups(false, false);
  }

  onGroupSelect(event: MenuItem) {
    const groupName = event.label ?? "";
    this.selectedGroupName = groupName;
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
    this.maxGroupSize = this.selectedGroup?.[0].MaxGroupSize;
    this.currentMemberSize = this.availableMembers?.length;
  }

  onTeamDetailsEdit() {
    this.displayRegisterGroupForm = true;
  }

  reloadMenuComponent($event: boolean) {
    if ($event) {
      console.log('reloading...');
      this.displayRegisterGroupForm = false;
      this.groupsService.refreshGroups(this.sharedService.lookUpOrgID(this.router.url));
      this.getGroups(true, false);
    }
  }

  controlDisplayGroupForm($event: boolean) {
    this.displayRegisterGroupForm = false;
  }

  controlDisplayTeamForm($event: boolean) {
    this.displayTeamRegistrationForm = false;
  }

  updateGroup(): void {
    this.currentSelectGroupEmitter.emit(this.selectedGroup[0]);
  }


  editTeamMember(teamMember: Members) {
    this.selectedTeamMember = teamMember;
    this.displayTeamRegistrationForm = true;
  }


  onAddNewTeamMember() {
    this.selectedTeamMember = {
      MemberId: 0,
      MemberEmail: '',
      MemberName: '',
      MemberPhone: ''
    };
    this.displayTeamRegistrationForm = true;
  }

  reloadTeamMembersComponent($event: boolean) {
    if ($event) {
      this.displayTeamRegistrationForm = false;
      this.groupsService.refreshGroups(this.sharedService.lookUpOrgID(this.router.url));
      this.getGroups(false, true);
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
              this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Group deleted successdully !' });
            },
            error: (err: any) => console.error(err),
            complete: () => {
              window.location.reload();
            }
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
            complete: () => {
              this.reloadTeamMembersComponent(true);
              this.messageService.add({ severity: 'info', summary: 'Success ', detail: 'Member delete success!' })
            }
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

  getGroups(isGroup: boolean, isMember: boolean): void {
    this.groupsService.getGroups$().subscribe(groups => {
      this.availableGroups = groups;
      if (isGroup) {
        this.selectedGroup = [this.availableGroups.find(g => this.selectedGroupName === g.GroupName)!];
      }
      if (isMember) {
        this.selectedGroup = [this.availableGroups.find(g => this.selectedGroupName === g.GroupName)!];
        this.availableMembers = this.availableGroups.find(g => this.selectedGroupName === g.GroupName)?.Members!;
        this.maxGroupSize = this.selectedGroup[0].MaxGroupSize;
        this.currentMemberSize = this.availableMembers.length;
      }
    });
  }

}


