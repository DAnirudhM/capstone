import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationStart, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { map, Observable, of } from 'rxjs';
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
  selectedOrganization!: Organizations;

  constructor(private router: Router, private groupsService: GroupsService) {


    this.selectedOrganization = history.state.currentOrganization;
    this.groupsService.getGroupsByOrganization(this.selectedOrganization.OrganizationId)
      .subscribe({
        next: (value: Groups[]) => {
          this.initializeGroups(value);
        },
        error: (error: any) => handleError(error),
        complete: () => void (0)
      });




  }

  initializeGroups(groups: Groups[]): void {
    groups.forEach(group => this.groups.push({label: group.GroupName}));
  }

  ngOnInit(): void {
    console.log(this.router.url);
    
 
    // this.groups = [
    //   { label: 'RedBull' },
    //   { label: 'Ferrari' },
    //   { label: 'Mercedes' },
    //   { label: 'Alpine' },
    //   { label: 'McLaren' },
    //   { label: 'Alpha Romeo' },
    //   { label: 'Haas' },
    //   { label: 'Alpha Tauri' },
    //   { label: 'Aston Martin' },
    //   { label: 'Williams' }
    // ];
  }

}
function handleError(error: any): void {
  console.error(error);
  throw new Error('Function not implemented.');
}



