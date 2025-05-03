import { Directive, OnDestroy, OnInit } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[trim]',
  standalone: true
})
export class TrimDirective implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  constructor( private _formControl: FormControlName ) {
  }

  ngOnInit() {
    if (this._formControl.valueChanges) {
      this._formControl.valueChanges
        .pipe(takeUntil(this.destroy$), distinctUntilChanged())
        .subscribe((x) => {
          this._formControl.control.setValue(x.trim());
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
