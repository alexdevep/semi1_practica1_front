import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';

import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoImage } from './components/images';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DemoImage],
  bootstrap: [AppComponent]
})
export class AppModule { }
