import { Component, Input, OnInit } from '@angular/core';
import { Groups } from 'src/app/models/groups.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  displaySearch: boolean = true;
  displayModal: boolean = true;
  loading: boolean = false;

  groups!:Groups[];

  @Input()  searchKey!:string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.searchKey);
  }

}
