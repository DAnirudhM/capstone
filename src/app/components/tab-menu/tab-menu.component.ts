import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { takeUntil } from 'rxjs';
import { Groups } from 'src/app/models/groups.model';
import { Organizations } from 'src/app/models/organizations.model';
import { GroupsService } from 'src/app/services/groups.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {

  groups: MenuItem[] = [];
  groupInAnOrg!: Groups[];
  tabActiveIndex!: number;
  orgId!: string;
  searchedGroup!: Groups;

  displayRegisterGroupForm: boolean = false;

  @Output() selectedGroup: EventEmitter<MenuItem> = new EventEmitter();


  constructor(private router: Router,
    private groupsService: GroupsService,
    private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.tabActiveIndex = 0;
    this.orgId = this.sharedService.lookUpOrgID(this.router.url);
    this.getMenuItems();

    setTimeout(() => {
      this.sharedService.viewSearchList$.subscribe({
        next: (value: Groups) => {
          if (value) {
            this.tabActiveIndex = this.findTeamIndex(value.GroupName);
            this.setupLayoutPanel();
          }
        },
        error: (error: any) => this.handleError(error),
        complete: () => { }
      });

    }, 200);

  }

  initializeGroups(groups: Groups[]): void {
    this.groups = [];
    groups.forEach((group, index) => this.groups.push({
      label: group.GroupName,
      tabindex: index.toString(),
      command: event => this.tabMenuClicked(event)
    }));
    this.setupLayoutPanel();
  }

  tabMenuClicked(event: any): void {
    this.tabActiveIndex = event.item.tabindex;

    this.setupLayoutPanel();
  }

  setupLayoutPanel(): void {

    if (this.groups[this.tabActiveIndex]) {
      this.selectedGroup.emit(this.groups[this.tabActiveIndex]);
    } else {
      this.tabActiveIndex = 0;
      this.selectedGroup.emit(this.groups[0]);
    }
  }

  onRegisterGroupClick() {
    this.displayRegisterGroupForm = true;
  }

  controlDisplayForm(e: boolean): void {
    this.displayRegisterGroupForm = e;
  }

  handleError(error: any): void {
    console.error(error);
    throw new Error('Function not implemented.');
  }

  reloadMenuComponent($event: boolean) {
    if ($event) {
      this.displayRegisterGroupForm = false;
      this.getMenuItems();
      this.tabActiveIndex = this.groups.length;
    }
  }

  getMenuItems(): void {
    this.groupsService.getGroupsByOrganization(this.orgId)
      .subscribe({
        next: (value: Groups[]) => {
          this.groupInAnOrg = value;
          this.initializeGroups(value);
        },
        error: (error: any) => this.handleError(error),
        complete: () => void (0)
      });
  }

  findTeamIndex(groupName: string): number {
    return this.groups.findIndex(g => groupName === g.label);
  }


}



