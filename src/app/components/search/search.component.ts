import { Component, Input, OnInit } from '@angular/core';
import { Groups } from 'src/app/models/groups.model';
import { GroupsService } from 'src/app/services/groups.service';

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

  @Input() searchKey!: string;

  constructor(private groupsService: GroupsService) { }

  ngOnInit(): void {
    console.log(this.searchKey);
    this.groupsService.getAllGroups().subscribe({
      next: (value: Groups[]) => {
        this.groups = value;
      },
      error: (err: any) => console.error(err),
      complete: () => { console.log(this.groups) }
    });
    
  }

  emitWordChange(event: { target: HTMLInputElement }): void {
    console.log(event.target.value);
  }

}
