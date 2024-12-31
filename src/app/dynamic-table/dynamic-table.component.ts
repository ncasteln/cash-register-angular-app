import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dynamic-table',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent {
  @Input() title = '';
  @Input() headers: string[] = [];
}
