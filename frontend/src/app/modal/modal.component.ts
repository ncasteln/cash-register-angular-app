import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() id = '';
  @Input() ariaLabel = '';
  @Input() title = '';
}
