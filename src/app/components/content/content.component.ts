import { Component, OnInit } from '@angular/core';
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
  


  constructor(private groupsService: GroupsService) {

  }

  ngOnInit(): void {
    this.groupsService.getGroups$().subscribe(groups => {
      console.log(groups);
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

    console.log(selectGrp);

    this.selectedGroup = [selectGrp];
    this.availableMembers = selectGrp.Members;

  }
}


