

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

// Services
import { AppHelperService } from './shared/services/app-helper.services';
import { UserService } from './shared/services/user.services';
import { PagerService } from './shared/services/pager.services';

// Components
import { AppComponent } from './app.component';
import { UserComponent } from './components/user.component';

 import { AppRouterModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpModule,
    FormsModule,
  ],
  providers: [
    AppHelperService,
  PagerService,
  UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
