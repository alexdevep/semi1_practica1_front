import { Component, NgZone, OnInit } from '@angular/core';
import { User, User3 } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService, private zone: NgZone, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm,usuario: string, password: string){
    var user3 = new User3(usuario,"",password,"","","");
    console.log(user3);

    if(user3.username && user3.password){
      this.userService.login(user3)
          .subscribe(res => {
            console.log(res[0].id);
            localStorage.setItem('id', res[0].id.toString());
            this.router.navigate(['/dashboard']); //Perfil
          });
    }
  }
  
  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
  }

}
