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
            else this.seats.push(`${row}, ${col}`);
        }
        this.onSelectionChage.emit(this.seats);
    }

    isReserverd(row:number, col:number):boolean { return Boolean([...this.seats].find((seat) => seat === `${row}, ${col}`)) }
}




// //Component decorator
// @Component({
//     selector: 'seat-list',
//     templateUrl: './seat.component.html',
//     styleUrls: ['./seat.component.scss']
// })
// export class SeatComponent {
//     //variable declarations
//     movieTitle:string = "Captain America: The Winter Soldier";
//     screen: string = "LUXE CINEMAS";
//     time: string = "FRI, 6:45PM"

//     rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
//     cols: number[]  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//     reserved: string[] = ['A2', 'A3', 'F5', 'F1', 'F2','F6', 'F7', 'F8', 'H1', 'H2', 'H3', 'H4'];
//     selected: string[] = [];

//     ticketPrice: number = 120;
//     convFee: number = 30;
//     totalPrice: number = 0;
//     currency: string = "Rs";

//     //return status of each seat
//     getStatus(seatPos: string) {
//         if(this.reserved.indexOf(seatPos) !== -1) {
//             return 'reserved';
//         } else if(this.selected.indexOf(seatPos) !== -1) {
//             return 'selected';
//         }
//         return 'selected';
//     }
//     //clear handler
//     clearSelected() {
//         this.selected = [];
//     }
//     //click handler
//     seatClicked(seatPos: string) {
//         var index = this.selected.indexOf(seatPos);

//         if(index !== -1) {
//             // seat already selected, remove
//             this.selected.splice(index, 1)
//         } else {
//             //push to selected array only if it is not reserved
//             if(this.reserved.indexOf(seatPos) === -1)
//                 this.selected.push(seatPos);
//         }
//     }
//     //Buy button handler
//     showSelected() {
//         if(this.selected.length > 0) {
//             alert("Selected Seats: " + this.selected + "\nTotal: "+(this.ticketPrice * this.selected.length + this.convFee));
//         } else {
//             alert("No seats selected!");
//         }
//     }
// }
