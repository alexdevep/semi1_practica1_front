import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { UsersComponent } from '../components/users/users.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  users: User[]; //Arreglo inicial
  //readonly URL_API = 'http://ec2-18-223-119-231.us-east-2.compute.amazonaws.com:3000/users';
  readonly URL_API = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { 
    this.selectedUser = new User();
  }

  getUsers(){
    return this.http.get(this.URL_API);
  }

  postUser(User: User){
    return this.http.post(this.URL_API, User);
  }

  putUser(user: User){
    return this.http.put(this.URL_API + `/${user._id}`, user);
  }

  deleteUser(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
