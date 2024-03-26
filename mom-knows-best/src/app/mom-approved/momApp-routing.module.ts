import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllPlacesComponent } from "./all-places/all-places.component";
import { AddPlaceComponent } from "./add-place/add-place.component";
import { PlaceDetailsComponent } from "./place-details/place-details.component";


const routes: Routes = [
    {path: 'mom-approved', children: [
       { path: '', pathMatch: 'full', component: AllPlacesComponent},
       { path: ':placeId', component: PlaceDetailsComponent}
    ]},
    {path: 'add-place', component: AddPlaceComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MomRoutingModule {}