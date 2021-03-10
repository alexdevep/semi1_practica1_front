import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, User3 } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  userLog: User; //Logueado actualmente
  users: User[]; //Arreglo inicial
  logUsers: User[]; //User loguin
  readonly URL_API = 'http://Balanceador-practica1-semi1-257155305.us-east-2.elb.amazonaws.com';

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
    this.userLog = new User();
  }

  login(user: User3){
    return this.http.post(this.URL_API + `/login`, user);
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

}
