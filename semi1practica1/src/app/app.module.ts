import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';

//Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoImage } from './components/images';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CameraComponent } from './components/camera/camera.component';
import { WebcamModule } from 'ngx-webcam';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AlbumComponent } from './components/album/album.component';
import { UploadComponent } from './components/upload/upload.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    DashboardComponent,
    CameraComponent,
    RegisterComponent,
    PerfilComponent,
    AlbumComponent,
    UploadComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    WebcamModule,
    NgbModule
  ],
  providers: [DemoImage],
  bootstrap: [AppComponent]
})
export class AppModule { }
