import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent {
 

  form = this.fb.group({
    title: ['', [Validators.required]],
    type: ['', Validators.required],
    location: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    rating: [null, [Validators.required]],
    description: ['', [Validators.required]]
  })


  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}
 
  addPlace() {
   if(this.form.invalid) {
    return;
   }
    const {title, type, location, imageUrl, rating, description} = this.form.value;
    debugger
    this.apiService.createPost(title!, type!, location!, imageUrl!, rating!, description!).subscribe(() =>
      this.router.navigate(['/mom-approved'])
    )
    console.log(this.form.value)
  }
}
