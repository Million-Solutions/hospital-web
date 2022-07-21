import { AbstractControl } from '@angular/forms';

export class MyValidations {
  static sameVal(id) {
    return (control: AbstractControl) => {
      const value = control.value;
      id.on('keyup', function() {
        if( value != ''){
          control.updateValueAndValidity()
        }
        return {sameVal: true};
      })
      if (value != id.val()) {
        return {sameVal: true};
      }
      return null;
    };
  }
}
