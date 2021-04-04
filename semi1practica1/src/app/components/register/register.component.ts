import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from "@angular/forms";
import { User, User2, User3 } from "../../models/user";
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  previewImagePath: string;
  editarFoto: boolean;
  perfil: string; //Muestra perfil actual a editar

  isLog: boolean;
  usser: User2;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
    this.userService.getUser(localStorage.getItem("id")).subscribe(res => {
      //console.log("RESULTADO: ",res);
      this.usser = res[0] as User2;
      //console.log("RESULTADO: ", this.usser);

      if (this.usser != undefined) {
        console.log(this.usser);

        //Asignando de un modelo a otro
        this.userService.selectedUser.id_ = this.usser.id;
        this.userService.selectedUser.username = this.usser.usuario;
        this.userService.selectedUser.name = this.usser.nombre;
        this.userService.selectedUser.password = this.usser.password;
        this.userService.selectedUser.foto = this.usser.foto;

        this.isLog = true;
        this.perfil = this.userService.dirBucket + this.usser.foto;
        
      }
      else {
        this.router.navigate(['/login']);
        this.isLog = false;
      }

    });
  }

  
  addUserComplete(form: NgForm ,id_: string, usuario: string, nombre: string, password: string, foto: string){
    //console.log(this.previewImagePath); //Imprime el codigo de image64
    if(usuario){
      if(id_){
        if (this.editarFoto){
          if(this.previewImagePath)
          {
            console.log('Editando usuario con foto...');
            //username, name, password, foto, extension, image
            var user3 = new User3(usuario, nombre, password, "", "jpg", this.previewImagePath);
            user3.id = id_; //Agregando id
            console.log(user3);

            this.userService.putUserCompleto(user3)
            .subscribe(res => {
              console.log(res);
              this.resetForm(form);
              this.router.navigate(['/perfil']);
            });
          }
          else{
            console.log('Editando usuario con foto (No ha seleccionado foto)...');
          }
        }
        else{
          console.log('Editando usuario sin foto...');
          var user = new User(id_, usuario, nombre, password, foto);
          console.log(user);

          this.userService.putUser(user)
          .subscribe(res => {
            console.log(res);
            this.resetForm(form);
            this.router.navigate(['/perfil']);
          });
        }
      }
      else{
        if(this.previewImagePath){

          console.log('Insertando usuario con foto...');
          var user3 = new User3(usuario, nombre, password, "", "jpg", this.previewImagePath);
          console.log(user3);
          this.userService.postUserComplete(user3)
          .subscribe(res => {
            console.log(res);
            this.resetForm(form);
            this.router.navigate(['/dashboard']);
          });

        }else{

          console.log('Insertando usuario sin foto...');
          var user = new User(id_, usuario, nombre, password, "");
          console.log(user);
          this.userService.postUser(user)
            .subscribe(res => {
              
              console.log(res);
              this.resetForm(form);
              this.router.navigate(['/dashboard']);
            });
        }
      }
    }
  }

  addUser(form: NgForm) {
    console.log(form.value);
    //Si ya existe un id actualizo, caso contrario guardo usuario nuevo
    if(form.value._id) {
      console.log('Editando usuario...')

      this.userService.putUser(form.value)
        .subscribe(res => {
          console.log(res);
          this.resetForm(form);
        });
    }else{
      console.log('Insertando usuario...')

      this.userService.postUser(form.value)
      .subscribe(res => {
        
        console.log(res);
        this.resetForm(form);

      });
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
      this.perfil = null;
      this.removeImage();
    }
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
          }
      };
    };
    reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
      this.cardImageBase64 = null;
      this.previewImagePath = null;
      this.isImageSaved = false;
  }

  checkOnClick(check: boolean) {
    console.log('Editar foto: ' + check );
    this.editarFoto = check;
  }

}
