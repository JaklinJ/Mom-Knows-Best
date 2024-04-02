import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    passGroup: this.fb.group({ password: ['', [Validators.required, ]], rePassword: ['', [Validators.required]] }, {
      validators: [matchPasswordsValidator('password', 'rePassword')]
    }),
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  register(): void {
   
    if (this.form.invalid) {
      return;
    }


    const {username,  passGroup: {password, rePassword} = {}} = this.form.value;
    
    this.userService.register(username!, password!, rePassword!).subscribe(() => {
        this.router.navigate(['/home'])
    });
    console.log(this.form.value);
  }
}
