import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './core/error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserRoutingModule } from './user/user-routing.module';
import { MomRoutingModule } from './mom-approved/momApp-routing.module';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent }, 
  {path: 'error', component: ErrorComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', redirectTo: '/404'},
  {path: '404', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserRoutingModule, MomRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
