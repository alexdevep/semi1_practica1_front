import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'semi1practica1';

  constructor(public userService: UserService){}

  ngOnInit(){
    
  }

  Logout() {
    console.log("Finalizar sesion");
    this.userService.logout()
  }
}
