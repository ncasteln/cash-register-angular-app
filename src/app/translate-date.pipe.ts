import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateDate',
  standalone: true
})
export class TranslateDatePipe implements PipeTransform {
  private readonly englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private readonly englishMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  private readonly italianDays = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  private readonly italanMonth = ['Gennaio',  'Febbraio',  'Marzo',  'Aprile',  'Maggio',  'Giugno',  'Luglio',  'Agosto',  'Settembre',  'Ottobre',  'Novembre',  'Dicembre']

  transform( en_date: string | null, replacer: any ): string {
    if (!en_date || en_date === 'undefined')
      return (replacer);

    let dateParts = en_date.split(' ');
    dateParts = dateParts.map(item => item.replace(',',''));

    const [day, month, date, year] = dateParts;

    const dayIndex = this.englishDays.indexOf(day);
    const monthIndex = this.englishMonths.indexOf(month);

    const it_day = this.italianDays[dayIndex];
    const it_month = this.italanMonth[monthIndex];

    return (`${it_day} ${date} ${it_month} ${year}`);
  }
}
