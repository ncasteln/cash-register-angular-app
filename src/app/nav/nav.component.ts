import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateDatePipe } from '../pipes/translate-date.pipe';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    TranslateDatePipe
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  id_date: string | null = null;
  fullDate: string | null = null;

  ngOnInit(): void {
    const today = Date.now();
    this.fullDate = formatDate(today, 'fullDate', 'en-US');
    this.id_date = formatDate(today, 'dd-MM-yyyy', 'en-US');
  }
}
