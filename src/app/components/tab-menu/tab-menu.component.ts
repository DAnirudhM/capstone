import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { Groups } from 'src/app/models/groups.model';
import { Organizations } from 'src/app/models/organizations.model';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {
  groups: MenuItem[] = [];
  groupInAnOrg!: Groups[];
  tabActiveIndex!: number;

  @Output() selectedGroup: EventEmitter<MenuItem> = new EventEmitter();


  constructor(private router: Router, private groupsService: GroupsService) {

  }

  ngOnInit(): void {
    this.tabActiveIndex = 0;
    const orgId = this.lookUpOrgID(this.router.url);
    this.groupsService.getGroupsByOrganization(orgId)
      .subscribe({
        next: (value: Groups[]) => {
          this.groupInAnOrg = value;
          this.initializeGroups(value);
        },
        error: (error: any) => handleError(error),
        complete: () => void (0)
      });

  }

  initializeGroups(groups: Groups[]): void {
    groups.forEach((group, index) => this.groups.push({
      label: group.GroupName,
      tabindex: index.toString(),
      command: event => this.tabMenuClicked(event)
    }));

    this.selectedGroup.emit(this.groups[this.tabActiveIndex]);
  }

  tabMenuClicked(event: any): void {
    this.tabActiveIndex = event.item.tabindex;
    this.setupLayoutPanel();
  }

  setupLayoutPanel(): void {
    //console.log('Clicked index', this.tabActiveIndex);

    this.selectedGroup.emit(this.groups[this.tabActiveIndex]);
  }

  lookUpOrgID(path: string): string {
    switch (path) {
      case '/f-1':
        return '1';
      case '/f-2':
        return '2';
      case '/f-3':
        return '3';
      case '/f-e':
        return '4';
      case '/motogp':
        return '5';
      default:
        return '/';
    }
  }

}
function handleError(error: any): void {
  console.error(error);
  throw new Error('Function not implemented.');
}



