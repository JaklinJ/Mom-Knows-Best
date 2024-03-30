import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmailDirective } from './validators/email.directive';



@NgModule({
  declarations: [
    EmailDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [EmailDirective]
})
export class SharedModule { }
