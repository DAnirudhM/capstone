import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'capstone-f1';
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
        {label:'RedBull'},
        {label:'Ferrari'},
        {label:'Mercedes'},
        {label:'Alpine'},
        {label:'McLaren'},
        {label:'Alpha Romeo'},
        {label:'Haas'},
        {label:'Alpha Tauri'},
        {label:'Aston Martin'},
        {label:'Williams'}
    ];
}
}
