import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  host: {
    class: 'row align-items-center'
  }
})
export class ToolbarComponent {
  @Output() toggleDisplayModeChild = new EventEmitter<'list' | 'grid'>();
  @Output() resetDatabase = new EventEmitter();

  emitDisplayMode( view: 'list' | 'grid') { this.toggleDisplayModeChild.emit(view); }
  emitResetDatabase() { this.resetDatabase.emit(); }
}
