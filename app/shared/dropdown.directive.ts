import {Directive, HostListener, HostBinding} from '@angular/core';

@Directive({
  selector: '[tsdropdown]'
})
export class DropdownDirective {

    valueFor: boolean = false;

    @HostListener('click') activate(){
      this.valueFor = true;
    }

    @HostListener('mouseleave') deactivate(){
      this.valueFor = false;
    }

    @HostBinding('class.open') get open(){
      return this.valueFor;
    }

}
