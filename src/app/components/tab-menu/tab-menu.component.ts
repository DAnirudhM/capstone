import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
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
  orgId!:string;

  displayRegisterGroupForm: boolean = false;

  @Output() selectedGroup: EventEmitter<MenuItem> = new EventEmitter();


  constructor(private router: Router, private groupsService: GroupsService, private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.tabActiveIndex = 0;
    this.orgId = this.sharedService.lookUpOrgID(this.router.url);
    this.getMenuItems();
  }

  initializeGroups(groups: Groups[]): void {
    this.groups = [];
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
    this.selectedGroup.emit(this.groups[this.tabActiveIndex]);
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
    console.log('Group Update here ?? ');
    if ($event) {
      this.displayRegisterGroupForm = false;
      this.getMenuItems();
      this.tabActiveIndex=this.groups.length;  
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


}



