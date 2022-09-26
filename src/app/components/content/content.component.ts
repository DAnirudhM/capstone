import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Groups } from 'src/app/models/groups.model';
import { Members } from 'src/app/models/members';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {

  availableGroups!: Groups[];
  selectedGroup!: Groups[];
  availableMembers!: Members[];
  displayEditGroupForm: boolean = false;
  @Output() currentSelectGroupEmitter: EventEmitter<Groups> = new EventEmitter();

  constructor(private groupsService: GroupsService) {

  }

  ngOnInit(): void {
    this.groupsService.getGroups$().subscribe(groups => {
      this.availableGroups = groups;
    });
  }

  onGroupSelect(event: MenuItem) {
    //console.log('------->', event);
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
    //console.log('Team details edit !!');
    //console.log('Clicked', this.displayEditGroupForm);
    this.displayEditGroupForm = true;
    //console.log(this.selectedGroup);
  }

  reloadMenuComponent($event: boolean) {
    if ($event) {
      console.log('reloading...');
      this.displayEditGroupForm = false;
      window.location.reload();
      //this.ngOnInit();
    }
  }

  controlDisplayFromForm($event: boolean) {
    this.displayEditGroupForm = false;
  }

  updateGroup(): void {
    this.currentSelectGroupEmitter.emit(this.selectedGroup[0]);
  }

  onTeamDelete() {

    console.log(this.selectedGroup[0].GroupId);
    console.log(this.selectedGroup[0].OrganizationName);
    console.log(this.selectedGroup[0]);

    this.groupsService.deleteGroup(this.selectedGroup[0].GroupId)
    .subscribe({
      next: (value: Groups) => {
        console.log('Deleted', value);
      },
      error: (err: any) => console.error(err),
      complete: () =>  window.location.reload()
    });

  }

}


