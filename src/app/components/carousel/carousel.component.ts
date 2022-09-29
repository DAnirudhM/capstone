import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from 'src/app/services/organizations.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  imagesPath!: string[];
  imagesInfo!: { imagePath: string, routeLink: string }[];
  responsiveOptions: any;

  constructor(private organizationsService: OrganizationsService) {
  }

  ngOnInit(): void { 
    this.setResponsiveness();
    this.setImagesPaths();
  }

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

  setImagesPaths(): void {
    this.imagesPath = [
      'assets/pictures/mainPage/logo_f1.jpg',
      'assets/pictures/mainPage/logo_f2.jpeg',
      'assets/pictures/mainPage/logo_f3.jpeg',
      'assets/pictures/mainPage/logo_fe.png',
      'assets/pictures/mainPage/logo_mgp.jpeg',
    ];

    this.imagesInfo = [
      {
        imagePath: 'assets/pictures/mainPage/logo_f1.jpg',
        routeLink: 'f-1'
      },
      {
        imagePath: 'assets/pictures/mainPage/logo_f2.jpeg',
        routeLink: 'f-2'
      }, {
        imagePath: 'assets/pictures/mainPage/logo_f3.jpeg',
        routeLink: 'f-3'
      },
      {
        imagePath: 'assets/pictures/mainPage/logo_fe.png',
        routeLink: 'f-e'
      },
      {
        imagePath: 'assets/pictures/mainPage/logo_mgp.jpeg',
        routeLink: 'motogp'
      }
    ];
  }
}
