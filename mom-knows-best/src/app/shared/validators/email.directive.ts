import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { emailValidator } from '../utils/email-validator';

@Directive({
  selector: '[appEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true,
    },
  ],
})
export class EmailDirective implements Validator{
  @Input()appEmail: string[] = [];
     constructor() { }
  
  // validator: ValidatorFn = () => null;
  
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
      
      const validatorFn = emailValidator();
      const result = validatorFn(control)
      
      // const result = emailValidator(control.value)
      
      // return this.validator(control);
      return result;
    }
  
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('changes ',changes['appEmail']);
  
  //   const {currentValue} = changes['appEmail'];
  //   if(currentValue?.length) {
  //    this.validator = emailValidator(currentValue)
  //   }
  }
