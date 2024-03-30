import { ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {

  const regExp = new RegExp(`[A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z]+`);

  return (control) => {
    const isEmailInValid = control.value === '' || regExp.test(control.value);
    return isEmailInValid ? null : { emailValidator: true };
  };
}
