import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User2 } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usser: User2;
  perfil: string;

  profileAnalysis: any;
  profileEmotions: any;

  texts: any[];
  concatTxt: string;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.userService.getUser(localStorage.getItem("id")).subscribe(res => {
      //console.log("RESULTADO: ",res);
      this.usser = res[0] as User2;
      //console.log("RESULTADO: ", this.usser);

      if (this.usser != undefined) {
        console.log(this.usser);
        this.perfil = this.userService.dirBucket + this.usser.foto;

        if(this.usser.foto != "")
        {
          this.analizarPerfil(this.usser.foto);
        }
      }
      else {
        this.router.navigate(['/login']);
      }

    });
  }

  analizarPerfil(foto: string) {
    this.userService.profileAnalysis(foto).subscribe((res: any) => {
      console.log("Resultado Analysis: ",res);
      console.log("Resultado Analysis: ",res.Vars);
      console.log("Resultado Value: ",res.Vars[0]);
      console.log("Resultado Value: ",res.Vars[0].name);
      console.log("Resultado Value: ",res.Vars[0].index);
      console.log("Resultado Analysis: ",res.Emotions);
      this.profileAnalysis = res.Vars;
      if(res.Emotions != [])
      {
        this.profileEmotions = res.Emotions
      }
      else{
        this.profileEmotions = [];
      }
      
    });
  }

  extraer() {
    if(this.userService.photoB64 != "")
    {
      this.userService.detectText(this.userService.photoB64).subscribe((res: any) => {
        //console.log("Arreglo de textos: ",res.Texts);
        //console.log("Resultado 1: ",res.Texts[0]);
        
        if(res.Texts != [])
        {
          this.texts = res.Texts;
          //console.log(this.texts[0].Text);
          this.concatTxt = "";
          this.texts.forEach(item => this.concatTxt+= item.Text + " ");

          console.log("Concat: ", this.concatTxt);
        }
        this.userService.photoB64 = ""; //Limpiando foto subida
      });
    }
  }

}
