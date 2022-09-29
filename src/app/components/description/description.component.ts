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
        break
      case '/f-2':
        this.setF2();
        break;
      case '/f-3':
        this.setF3();
        break;
      case '/f-e':
        this.setFE();
        break;
      case '/motogp':
        this.setMotoGP();
        break;
      default:
        this.setHome();
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
    A Formula One season consists of a series of races, known as Grands Prix, which take place worldwide on both purpose-built circuits and closed public roads.`;
    this.imgPath = '/assets/pictures/image-12.jpeg';
  }

  setF2(): void {
    this.title = `Formula - 2`;
    this.description = `The FIA Formula 2 Championship is a second-tier single-seater championship organised by the Fédération Internationale de l'Automobile (FIA).
     Held on racing circuits, the championship was introduced in 2017, following the rebranding of the long-term Formula One feeder series GP2.
     The series' original founders were Flavio Briatore and current managing director Bruno Michel.`;
    this.imgPath = '/assets/pictures/Formula-2.jpeg';
  }

  setF3(): void {
    this.title = `Formula - 3`;
    this.description = `Formula Three (adopted by the FIA in 1950) evolved from postwar auto racing,
     with lightweight tube-frame chassis powered by 500 cc motorcycle engines (notably Nortons and JAP speedway).
     The 500 cc formula originally evolved in 1946 from low-cost "special" racing organised by enthusiasts in Bristol, England, just before the Second World War; British motorsport after the war picked up slowly,
    partly due to petrol rationing which continued for a number of years and home-built 500 cc cars engines were intended to be accessible to the "impecunious enthusiast". The second post-war motor race in Britain was organised by the VSCC in July 1947 at RAF Gransden Lodge, 500cc cars being the only post-war class to run that day. 
    Three of the seven entrants were non-starters, and, of the four runners, all but one retired on the first lap, leaving Eric Brandon in his Cooper Prototype (T2) trailing round to a virtual walk-over at an average speed of 55.79 mph (89.79 km/h), though his best lap (which was the fastest recorded for any 500) was 65.38 mph (105.22 km/h)`;
    this.imgPath = '/assets/pictures/Formula-3.jpeg';
  }

  setFE(): void {
    this.title = `Formula - E`;
    this.description = `Formula E, officially the ABB FIA Formula E World Championship, is a single-seater motorsport championship for electric cars.
     The series was conceived in 2011 in Paris by FIA president Jean Todt and Spanish businessman Alejandro Agag, who is also the current chairman of Formula E Holdings. The inaugural championship race was held in Beijing in September 2014. Since 2020, the series has FIA world championship status.`;
    this.imgPath = '/assets/pictures/Formula-e.jpeg';
  }

  setMotoGP(): void {
    this.title = `Moto GP`;
    this.description = `Grand Prix motorcycle racing is the premier class of motorcycle road racing events held on road circuits sanctioned by the Fédération Internationale de Motocyclisme (FIM).
     Independent motorcycle racing events have been held since the start of the twentieth century and large national events were often given the title Grand Prix.
     The foundation of the Fédération Internationale de Motocyclisme as the international governing body for motorcycle sport in 1949 provided the opportunity to coordinate rules and regulations in order that selected events could count towards official World Championships.
     It is the oldest established motorsport world championship.`;
    this.imgPath = '/assets/pictures/Moto-GP.jpeg';
  }

}
