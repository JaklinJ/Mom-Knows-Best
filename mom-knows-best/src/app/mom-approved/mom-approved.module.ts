import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPlacesComponent } from './all-places/all-places.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { RouterModule } from '@angular/router';
import { MomRoutingModule } from './momApp-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AllPlacesComponent,
    AddPlaceComponent,
    PlaceDetailsComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    MomRoutingModule,
    ReactiveFormsModule
  ]
})
export class MomApprovedModule { }
