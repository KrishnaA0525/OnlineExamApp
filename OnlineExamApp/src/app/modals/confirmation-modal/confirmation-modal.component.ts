import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';

const timer: number = 5;

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
      transition('left => right', animate(timer * 1000))
    ])
  ]
})
export class ConfirmationModalComponent implements OnInit {

  intervalSub: Subscription = new Subscription;
  state = "left";
  timer = timer;

  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private matDialogRef: MatDialogRef<ConfirmationModalComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.state = "right";
    }, 1)
    this.intervalSub = interval(1000).subscribe(count => {
      this.timer--;
      if (count >= 4) {
        this.intervalSub.unsubscribe();
        this.close();
      }
    });
  }

  close() {
    this.intervalSub.unsubscribe();
    this.matDialogRef.close();
  }

  redirect() {
    this.modalData.redirect();
    this.close();
  }

}
