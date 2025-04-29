import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appSuperBtn]'
})
export class SuperBtnDirective {
  
  el=inject(ElementRef);

  @Input({alias: 'appSuperBtn'}) set backgroundColor(value: string){
    if(!value) return;
    this.el.nativeElement.style.backgroundColor = value;
  }

  @Input({alias: 'appSuperBtn'}) set fontColor(value: string){
    if(!value) return;
    this.el.nativeElement.style.color = value;
  }

}
