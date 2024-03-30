import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './header/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule, AppRoutingModule
  ],
  exports: [NavigationComponent, FooterComponent]
})
export class HeaderModule { }
