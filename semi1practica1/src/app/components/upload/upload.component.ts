import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User, User2 } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  previewImagePath: string;
  editarFoto: boolean;
  perfil: string; //Muestra perfil actual a editar

  usser: User2;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem("id")).subscribe(res => {
      //console.log("RESULTADO: ",res);
      this.usser = res[0] as User2;
      //console.log("RESULTADO: ", this.usser);

      if (this.usser != undefined) {
        console.log(this.usser);        
      }
      else {
        this.router.navigate(['/login']);
      }

    });
  }


  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
          this.imageError =
              'Tamaña maximo permitido ' + max_size / 1000 + 'Mb';

          return false;
      }

    if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      this.imageError = 'Formatos de imagenes permitidos ( JPG | PNG )';
      return false;
    }
    const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          //console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
              this.imageError =
                'Dimensiones maximas permitidas ' +
                max_height +
                '*' +
                max_width +
                'px';
              return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            var splitted = this.cardImageBase64.split(',',2);
            this.previewImagePath = splitted[1];
            this.userService.photoB64 = this.previewImagePath;        
          }
      };
    };
    reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
      this.cardImageBase64 = null;
      this.previewImagePath = null;
      this.userService.photoB64 = "";
      this.isImageSaved = false;
  }

}
