import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User2 } from 'src/app/models/user';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

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

  /* Arreglo de fotos quemada */
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  idiomas: any[] = [
    {
      "id": "es",
      "name": "Español"
    },
    {
      "id": "en",
      "name": "Ingles"
    },
    {
      "id": "fr",
      "name": "Frances"
    },
    {
      "id": "it",
      "name": "Italiano"
    },
    {
      "id": "zh",
      "name": "Chino"
    }
  ];

  traduccion: string;
  textoATraducir: string;

  usser: User2;
  albums: any[] = [];
  photos: any[] = [];

  closeResult = '';

  constructor(public userService: UserService, private router: Router, private _config: NgbCarouselConfig, private modalService: NgbModal) {
    //_config.interval = 2000;
    //_config.pauseOnHover = true; //Se pause cuando ponga el mouse encima
   }

  ngOnInit(): void {

    this.userService.getUser(localStorage.getItem("id")).subscribe(res => {
      //console.log("Resultado: ",res);
      this.usser = res[0] as User2;
      //console.log("Resultado: ", this.usser);

      if (this.usser != undefined) {
        //console.log(this.usser);
        this.getAlbums();
      }
      else {
        this.router.navigate(['/login']);
      }

    });
  }

  verFotos(id: string) {
    console.log("Album: ", id);
    this.userService.getPhotosAlbum(Number(id)).subscribe((res: any) => {
      console.log("Resultado: ", res);
      this.photos = res;
    });
  }

  getAlbums(){
    this.userService.getAlbums(localStorage.getItem("id")).subscribe((res: any) => {
      //console.log("Resultado: ",res);
      this.albums = res;
      console.log("Albums: ", this.albums);
      /*
      if (this.usser != undefined) {
        console.log(this.usser);
        
        this.perfil = this.userService.dirBucket + this.usser.foto;
      }
      else {
        this.router.navigate(['/login']);
      }*/

    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.crearAlbum(result);

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  crearAlbum(name: string){
    //console.log("Nuevo Album: ", name);
    this.userService.createAlbum(name,localStorage.getItem("id")).subscribe((res: any) => {
      console.log("Resultado: ",res);
      this.getAlbums();
    });
  }
  
  salida(){
    //console.log("saliendo papus!");
  }

  modalUpload(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.userService.photoB64 = ""; //Limpiando foto subida
    });;
  }

  subirPhotoAlbum(nombref: string, descrip: string){
    //console.log("Album Seleccionado: ", album);
    if(this.userService.photoB64 != "")
    {
      this.userService.insertPhotoAlbum(localStorage.getItem("id"),descrip,"jpg",nombref,this.userService.photoB64).subscribe((res: any) => {
        console.log("Resultado: ",res);
        this.getAlbums();
        this.userService.photoB64 = ""; //Limpiando foto subida
      });
    }
  }

  traducirDescrip(content){
    this.modalService.open(content, { windowClass: 'dark-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.userService.photoB64 = ""; //Limpiando foto subida
    });;
  }

  translate(idioma: string){
    
    this.userService.translate(idioma,this.textoATraducir).subscribe((res: any) => {
        console.log("Resultado: ",res);
        this.traduccion = res.mensaje;
      });
  }
}
