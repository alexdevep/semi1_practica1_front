import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, User3 } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  userLog: User; //Logueado actualmente
  users: User[]; //Arreglo inicial
  logUsers: User[]; //User login
  photoB64: string;

  readonly URL_API = 'http://3.17.139.50:5000';
  //readonly URL_API = 'http://localhost:5000';
  readonly dirBucket = 'https://practica1-g18-imagenes.s3.us-east-2.amazonaws.com/';

  constructor(private http: HttpClient, private router: Router) {
    this.selectedUser = new User();
    this.userLog = new User();
  }

  login(user: User3){
    return this.http.post(this.URL_API + `/login`, user);
  }

  getUser(id: String){
    return this.http.get(this.URL_API + `/getUser/${id}`);
  }

  loginFace(user: User){
    return this.http.post(this.URL_API + `/loginFace`, user);
  }

  postUser(user: User) {
    return this.http.post(this.URL_API + `/users`, user);
  }

  postUserComplete(user: User3) {
    return this.http.post(this.URL_API + `/saveImageInfoDDB`, user);
  }

  getUsers() {
    return this.http.get<User[]>(this.URL_API + `/users`);
  }

  putUser(user: User) {
    return this.http.put(this.URL_API + `/users/${user.id_}`, user);
  }

  putUserCompleto(user: User3) {
    return this.http.put(this.URL_API + `/editUserInfo/${user.id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.URL_API + `/users/${_id}`);
  }

  logout() {
    localStorage.removeItem("id");
    this.router.navigate(['/login']); //Perfil
  }

  getAlbums(id: string){
    return this.http.get(this.URL_API + `/getAlbums/${id}`);
  }

  getPhotosAlbum(idAlbum: Number){
    return this.http.post(this.URL_API + `/getPhotosAlbum`,{idAlbum});
  }

  createAlbum(name: string, idUser: string){
    return this.http.post(this.URL_API + `/createAlbum`,{name,idUser});
  }

  insertPhotoAlbum(idUser: string, description: string, extension: string, name: string, foto: string){
    return this.http.post(this.URL_API + `/insertPhotoAlbum`,{idUser, description, extension, name, foto});
  }

  translate(language: string, text: string){
    return this.http.post(this.URL_API + `/translate`,{language, text});
  }

  detectText(imagen: string){
    return this.http.post(this.URL_API + `/detectText`,{imagen});
  }
  
  profileAnalysis(foto: string){
    return this.http.post(this.URL_API + `/profileAnalysis`,{foto});
  }
}
