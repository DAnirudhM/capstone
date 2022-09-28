import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Groups } from 'src/app/models/groups.model';
import { GroupsService } from 'src/app/services/groups.service';
import { SharedService } from 'src/app/services/shared.service';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  displaySearch: boolean = true;
  displayModal: boolean = true;
  loading: boolean = false;
  groups: Groups[] = [];
  selectedGroup!: Groups;

  @Output() controlSearchDialogEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private groupsService: GroupsService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.groupsService.getAllGroups().subscribe({
      next: (value: Groups[]) => {
        this.groups = value;
      },
      error: (err: any) => console.error(err),
      complete: () => {  }
    });
  }
  controlSearchDialog() {
    this.controlSearchDialogEmitter.emit(false);
  }

  onSearchSelectionClick(group: Groups) {
    console.log(group);
    let extra: NavigationExtras = {
      queryParams: {
        "teamName": "a"
      }
    };
    this.router.navigate(['f-1']);
    // this.router.navigate(['f-1'], {
    //   queryParams: {
    //     teamName: 'a'
    //   },
    //   // queryParamsHandling: 'merge',
    //   // skipLocationChange: false
    //   // do not trigger navigation
    // });

    this.sharedService.viewSearchList$.next(group);
    this.controlSearchDialog();
  }

}
