import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './header/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent
  ],
  imports: [
    CommonModule, AppRoutingModule
  ],
  exports: [NavigationComponent, FooterComponent]
})
export class HeaderModule { }
