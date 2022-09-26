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

  displayRegisterGroupForm: boolean = false;

  @Output() selectedGroup: EventEmitter<MenuItem> = new EventEmitter();


  constructor(private router: Router, private groupsService: GroupsService, private sharedService: SharedService) {

  }

  ngOnInit(): void {
    //console.log('Initializing tab menu component ');
    this.tabActiveIndex = 0;
    const orgId = this.sharedService.lookUpOrgID(this.router.url);
    this.getMenuItems(orgId);
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

  onRegisterGroupClick() {
    //console.log('Clicked', this.displayRegisterGroupForm);
    this.displayRegisterGroupForm = true;
  }

  controlDisplayFromForm(e: boolean): void {
    this.displayRegisterGroupForm = e;
    //console.log(e);
  }

  handleError(error: any): void {
    console.error(error);
    throw new Error('Function not implemented.');
  }

  reloadMenuComponent($event: boolean) {
    if ($event) {
      //console.log('reloading...');
      this.displayRegisterGroupForm = false;
      window.location.reload();
      //this.ngOnInit();
    }
  }

  getMenuItems(orgId: string): void {
    console.log(orgId)
    this.groupsService.getGroupsByOrganization(orgId)
      .subscribe({
        next: (value: Groups[]) => {
          //console.log(value);
          this.groupInAnOrg = value;
          this.initializeGroups(value);
        },
        error: (error: any) => this.handleError(error),
        complete: () => void (0)
      });
  }

}



