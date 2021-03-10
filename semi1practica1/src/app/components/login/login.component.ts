import { Component, NgZone, OnInit } from '@angular/core';
import { User, User3 } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService, private zone: NgZone) { }

  ngOnInit(): void {
  }

  login(form: NgForm,usuario: string, password: string){
    var user3 = new User3(usuario,"",password,"","","");
    console.log(user3);

    if(user3.username && user3.password){
      this.userService.login(user3)
          .subscribe(res => {
            this.userService.logUsers = res as User[];
            if(this.userService.logUsers[0])
            {
              this.userService.userLog = this.userService.logUsers[0];
              console.log(this.userService.userLog);
              this.resetForm(form);
              this.zone.runOutsideAngular(() => {
                window.location.href = '/users';
              });
            }
            else{
              console.log('Usuario no existe...');
            }
          });
    }
  }
  
  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
  }

}
