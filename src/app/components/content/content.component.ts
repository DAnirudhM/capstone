import { Component, OnInit } from '@angular/core';
import { Groups } from 'src/app/models/groups.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  groups!: Groups[];

  constructor() {}

  ngOnInit(): void {
    this.groups = [
      {
        GroupName: 'string',
        SponsorName: 'string',
        SponsorPhone: 'string',
        SponsorEmail: 'string',
      },
    ];
  }
}
