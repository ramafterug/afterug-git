import {Component, Directive, Renderer, ElementRef, Self, forwardRef, Provider} from '@angular/core';

import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
//import {CONST_EXPR} from '@angular/src/facade/lang';



/**
 * The accessor for writing a value and listening to changes on a radio input element.
 *
 *  ### Example
 *  ```
 *  <input type="radio" ngModel="radioModel">
 *  ```
 */
@Directive({
    selector:
        'input[type=radio][ngControl],input[type=radio][ngFormControl],input[type=radio][ngModel]',
    host: {'(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()'},
    
})
@Component({
  
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioControlValueAccessor),
      multi: true
    }
  ]
})
export class RadioControlValueAccessor implements ControlValueAccessor {
    onChange = (_) => {};
    onTouched = () => {};

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) {}

    writeValue(value: any): void {
        this._renderer.setElementProperty(this._elementRef, 'checked', value == this._elementRef.nativeElement.value);
    }
    registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
    registerOnTouched(fn: () => {}): void { this.onTouched = fn; }
}
