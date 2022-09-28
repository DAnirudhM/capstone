import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Groups } from 'src/app/models/groups.model';
import { GroupsService } from 'src/app/services/groups.service';
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

  constructor(private groupsService: GroupsService,private router:Router) { }

  ngOnInit(): void {
    this.groupsService.getAllGroups().subscribe({
      next: (value: Groups[]) => {
        this.groups = value;
      },
      error: (err: any) => console.error(err),
      complete: () => { console.log(this.groups) }
    });
  }
  controlSearchDialog() {
    this.controlSearchDialogEmitter.emit(false);
  }

  onSearchSelectionClick(group: Groups) {
    console.log(group);
    this.router.navigate(['/f-1']);
    this.controlSearchDialog();
    


    // GroupId
    // :
    // 39
    // GroupName
    // :
    // "Sand"
    // MaxGroupSize
    // :
    // 2
    // Members
    // :
    // []
    // OrganizationName
    // :
    // "F-2"
    // SponsorEmail
    // :
    // "sand@gnad"
    // SponsorName
    // :
    // "Sand"
    // SponsorPhone
    // :
    // "8943579485"
  }

}
