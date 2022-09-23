import { Component, OnInit } from '@angular/core';
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
  groupsObject!: Groups[];

  constructor(private router: Router, private groupsService: GroupsService) {

    const orgId = this.lookUpOrgID(this.router.url);
    this.groupsService.getGroupsByOrganization(orgId)
      .subscribe({
        next: (value: Groups[]) => {
          this.initializeGroups(value);
        },
        error: (error: any) => handleError(error),
        complete: () => void (0)
      });
  }

  initializeGroups(groups: Groups[]): void {
    groups.forEach(group => this.groups.push({ label: group.GroupName }));
  }

  ngOnInit(): void {
    console.log(this.router.url);

    this.groups = [
      { label: 'RedBull' },
      { label: 'Ferrari' },
      { label: 'Mercedes' },
      { label: 'Alpine' },
      { label: 'McLaren' },
      { label: 'Alpha Romeo' },
      { label: 'Haas' },
      { label: 'Alpha Tauri' },
      { label: 'Aston Martin' },
      { label: 'Williams' },
      { label: 'Alpha Tauri' },
      { label: 'Aston Martin' },
      { label: 'Williams' }
    ];
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



