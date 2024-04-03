import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './core/core.module';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MomApprovedModule } from './mom-approved/mom-approved.module';
import { AppInterceptor, appInterceptorProvider } from './app.interceptor';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    AuthenticateComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    UserModule,
    MomApprovedModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
