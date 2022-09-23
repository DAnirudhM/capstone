import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  description!: string;
  imgPath!: string;
  title!: string;


  constructor(private router: Router) {
    this.setHome();
    this.setOrgData();

  }

  ngOnInit(): void {

  }

  setOrgData(): void {
    switch (this.router.url) {
      case '/f-1':
        this.setF1();
    }
  }

  setHome(): void {
    this.title = `Racing is in DNA`;
    this.description = `Four- (or more) wheeled motorsport competition is globally governed by the Fédération Internationale de
    l'Automobile (FIA); and the Fédération Internationale de Motocyclisme (FIM) governs two-wheeled competition.
    Likewise, the Union Internationale Motonautique (UIM) governs powerboat racing while the Fédération Aéronautique
    Internationale (FAI) governs air sports, including aeroplane racing. All vehicles that participate in motorsports
    must adhere to the regulations that are set out by the respective global governing body.`;
    this.imgPath = '/assets/pictures/image-13.jpeg';
  }

  setF1(): void {
    this.title = `Formula - 1`;
    this.description = `Formula One (also known as Formula 1 or F1) is the highest class of international racing for open-wheel single-seater formula racing cars sanctioned by the Fédération Internationale de l'Automobile (FIA). 
    The World Drivers' Championship, which became the FIA Formula One World Championship in 1981, has been one of the premier forms of racing around the world since its inaugural season in 1950. The word formula in the name refers to the set of rules to which all participants' cars must conform.
    [1] A Formula One season consists of a series of races, known as Grands Prix, which take place worldwide on both purpose-built circuits and closed public roads.`;
    this.imgPath = '/assets/pictures/image-12.jpeg';
  }

}
