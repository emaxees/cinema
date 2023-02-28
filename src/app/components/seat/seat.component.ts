import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core'; // First, import Input


@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss'],
})
export class SeatComponent {
    @Input() rows: number = 0;
    @Input() cols: number = 0;
    @Output() onSelectionChage: EventEmitter<any> = new EventEmitter();
    seats: string[] = [];

    onSeatSelected(row: number, col: number) {
        if (!this.seats.length) this.seats.push(`${row}, ${col}`);
        else {
            const isAlreadyTaken: any = [...this.seats].find((seat) => seat === `${row}, ${col}`)
            if (isAlreadyTaken) this.seats = this.seats.filter((seat) => !seat.includes(isAlreadyTaken));
            else {
                if (this.seats.length <= 9) this.seats.push(`${row}, ${col}`);
            }
        }
        this.onSelectionChage.emit(this.seats);
    }

    isReserverd(row:number, col:number):boolean { return Boolean([...this.seats].find((seat) => seat === `${row}, ${col}`)) }
}
