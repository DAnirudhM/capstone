import { Component, OnInit } from '@angular/core';
import { Group } from '../model/group.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  group!: Group[];

  constructor() {}

  ngOnInit(): void {
    this.group = [
      {
        groupName: 'string',
        sponsorName: 'string',
        sponsorPhone: 'string',
        sponsorEmail: 'string',
      },
    ];
  }
}
