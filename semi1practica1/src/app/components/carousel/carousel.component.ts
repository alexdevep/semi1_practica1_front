import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  /*
  Para hacer funcionar el carousel hay que instalar
    + ng add @ng-bootstrap/ng-bootstrap
  Luego importarlo en ap.module.ts
    + import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
    + @NgModule({
        declarations: [
          ...
        ],
        imports: [
          ...,
          NgbModule
        ]
  */


  @Input() photos: any[];

  /* Arreglo de fotos quemada */
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private _config: NgbCarouselConfig) {
    //_config.interval = 2000;
    //_config.pauseOnHover = true; //Se pause cuando ponga el mouse encima
  }

  ngOnInit(): void {

    console.log("Photos[]: ", this.photos);

  }

}
