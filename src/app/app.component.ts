import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'capstone-f1';
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
        {label:'Categories'},
        {label:'Sports'},
        {label:'Football'},
        {label:'Countries'},
        {label:'Spain'},
        {label:'F.C. Barcelona'},
        {label:'Squad'},
        {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'}
    ];
}
}
