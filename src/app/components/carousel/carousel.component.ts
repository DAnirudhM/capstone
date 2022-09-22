import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from 'src/app/services/organizations.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  imagesPath!: string[];
  responsiveOptions: any;

  constructor(private organizationsService: OrganizationsService) {
    this.setResponsiveness();
    this.setImagesPaths();
  }

  ngOnInit(): void {}

  setResponsiveness(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  setImagesPaths() {
    this.imagesPath = [
      'assets/pictures/mainPage/logo_f1.jpg',
      'assets/pictures/mainPage/logo_f2.jpeg',
      'assets/pictures/mainPage/logo_f3.jpeg',
      'assets/pictures/mainPage/logo_fe.png',
      'assets/pictures/mainPage/logo_mgp.jpeg',
    ];
  }
}
