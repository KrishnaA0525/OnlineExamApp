import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
  animations: [
    trigger('cancelTrigger', [
      state('left', style({
        backgroundColor: 'red',
        width: '1px',
        margin: 0,
        padding: 0,
        transform: 'translateX(0px)'
      })),
      state('right', style({
        backgroundColor: 'red',
        width: '100%',
        margin: 0,
        padding: 0,
        transform: 'translateX(0px)'
      })),
      transition('left => right', animate(5000))
    ])
  ]
})
export class ConfirmationModalComponent implements OnInit {

  state = "left";
  timer = 5;

  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private matDialogRef: MatDialogRef<ConfirmationModalComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.state = "right";
    }, 10)
    let sub = interval(1000).subscribe(count => {
      this.timer--;
      if (count >= 4) {
        sub.unsubscribe();
        this.close();
      }
    });
  }

  close() {
    this.matDialogRef.close();
  }

  redirect() {
    this.modalData.redirect();
    this.close();
  }

}
