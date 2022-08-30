import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  imagesPath!: string[];

  constructor() { }

  ngOnInit(): void {

    this.imagesPath = [
      'assets/pictures/image-1.jpeg',
      'assets/pictures/image-3.jpeg',
      'assets/pictures/image-4.jpeg',
      'assets/pictures/image-5.jpeg',
      'assets/pictures/image-6.jpeg',
      'assets/pictures/image-7.jpeg',
      'assets/pictures/image-8.jpeg'];
  }

}
