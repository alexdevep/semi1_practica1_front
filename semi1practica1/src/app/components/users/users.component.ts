import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from "@angular/forms";
import { User, User2, User3 } from "../../models/user";
import * as _ from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  previewImagePath: string;
  editarFoto: boolean;
  perfil: string; //Muestra perfil actual a editar

  constructor(public userService: UserService) {
  }
  
  ngOnInit(): void {
    this.getUsers();
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
              this.getUsers();
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
            this.getUsers();
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
            this.getUsers();
          });

        }else{

          console.log('Insertando usuario sin foto...');
          var user = new User(id_, usuario, nombre, password, "");
          console.log(user);
          this.userService.putUser(user)
          .subscribe(res => {
            console.log(res);
            this.resetForm(form);
            this.getUsers();
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
          this.getUsers();
        });
    }else{
      console.log('Insertando usuario...')

      this.userService.postUser(form.value)
      .subscribe(res => {
        
        console.log(res);
        this.resetForm(form);
        this.getUsers();

      });
    }
  }

  getUsers(){
    this.userService.getUsers()
      .subscribe(res => {
        this.userService.users = res as User[];
        console.log(res);
      });
  }

  editUser(user: User2){
    console.log(user);

    //Asignando de un modelo a otro
    this.userService.selectedUser.id_ = user.id;
    this.userService.selectedUser.username = user.usuario;
    this.userService.selectedUser.name = user.nombre;
    this.userService.selectedUser.password = user.password;
    this.userService.selectedUser.foto = user.foto;
    console.log(this.userService.selectedUser);

    this.perfil = 'https://practica1-g18-imagenes.s3.us-east-2.amazonaws.com/' + user.foto;
    console.log(this.perfil);
  }

  deleteUser(id: string){
    if(confirm('Esta seguro de eliminar este usuario?')){

      this.userService.deleteUser(id)
      .subscribe(res => {
        console.log(res);
        this.getUsers();
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
