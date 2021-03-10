import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, User3 } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  users: User[]; //Arreglo inicial
  //readonly URL_API = 'http://ec2-18-223-119-231.us-east-2.compute.amazonaws.com:5000';
  readonly URL_API = 'http://localhost:5000';

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
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
