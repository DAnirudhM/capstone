import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OrganizationsService } from './services/organizations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'capstone-f1';
  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: 'RedBull' },
      { label: 'Ferrari' },
      { label: 'Mercedes' },
      { label: 'Alpine' },
      { label: 'McLaren' },
      { label: 'Alpha Romeo' },
      { label: 'Haas' },
      { label: 'Alpha Tauri' },
      { label: 'Aston Martin' },
      { label: 'Williams' }
    ];
  }
}
