import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Observer, Subscription } from 'rxjs';
import { QuestionsService } from '../service/questions.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

	examTime: number = 0;
	hours: number = 0;
	minutes: number = 0;
	seconds: number = 0;
	intervalSubscription: Subscription = new Subscription;

	constructor(private questionsService: QuestionsService, private router: Router) { }

	ngOnInit(): void {
		this.examTime = 10;
		this.hours = Math.floor(this.examTime / (60 * 60));
		this.minutes = Math.floor(this.examTime / 60);
		this.seconds = this.examTime % 60;
		this.intervalSubscription = interval(1000).subscribe(() => {
			if (this.hours === 0 && this.minutes === 0 && this.seconds === 0) {
				console.log("Time up!");
				this.intervalSubscription.unsubscribe();
				this.questionsService.isAutoSubmit = true;
				/* this.router.navigate(["results"]); */
			} else {
				if (this.seconds === 0) {
					this.seconds = 59;
					if (this.minutes === 0) {
						this.minutes = 59;
						if (this.hours !== 0) {
							this.hours--;
						}
					} else {
						this.minutes--;
					}
				} else {
					this.seconds--;
				}
			}
		});
	}

	ngOnDestroy() {
		this.intervalSubscription.unsubscribe();
	}
}
