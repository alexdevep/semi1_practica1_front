import { Component, OnInit } from '@angular/core';
import { User2 } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {

  usser : User2;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.getUser(localStorage.getItem("id")).subscribe(res => {
      //console.log("RESULTADO: ",res);
      this.usser = res[0] as User2;
      console.log("RESULTADO: ",this.usser);

      if (this.usser == undefined) {
        this.router.navigate(['/login']); 
      }

    });

  }

}
