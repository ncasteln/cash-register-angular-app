import { AfterViewInit, Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disableControl]',
  standalone: true,
})
export class DisableControlDirective implements AfterViewInit {
  condition!: boolean;
  @Input('disableControl') set _(value: boolean) {
    this.condition = value;
    this.checkControl();
  }
  constructor(private ngControl: NgControl) {}
  checkControl() {
    if (this.ngControl && this.ngControl.control)
      this.ngControl.control[this.condition ? 'disable' : 'enable']();
  }
  ngAfterViewInit() {
    this.checkControl();
  }
}
