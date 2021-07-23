import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Question } from '../model/question';
import { State } from '../question-panel/qp-store/questions.reducer';
import { selectQuestions } from '../question-panel/qp-store/questions.selectors';
import { QuestionsService } from '../service/questions.service';

@Component({
	selector: 'app-question-numbers',
	templateUrl: './question-numbers.component.html',
	styleUrls: ['./question-numbers.component.css'],
	animations: [
		trigger('questionNumTrigger', [
			/* state('start', style({
				opacity: 1,
				transform: 'translateY(0px)'
			})), */
			transition('void => *', [
				style({
					opacity: 0,
					transform: 'translateY(-20px)'
				}),
				animate(1000)
			])
		])
	]
})
export class QuestionNumbersComponent implements OnInit, OnDestroy {
	currentQuestion!: Question;
	questions: Question[] = [];
	questionIdSubscription: Subscription = new Subscription();
	storeSubscription!: Subscription;

	constructor(private questionsService: QuestionsService, private router: Router, private route: ActivatedRoute, private store: Store<State>) { }

	ngOnInit(): void {
		/* this.questions = this.questionsService.allQuestions;
		this.currentQuestion = this.questions[0];
		this.showQuestion(this.questions[0].id);
		this.questionIdSubscription = this.questionsService.questionIdSubject.subscribe((questionId: number) => {
			this.showQuestion(questionId);
		}); */

		this.storeSubscription = this.store.select(selectQuestions).pipe(take(1)).subscribe(
			store => {
				this.questions = store.questions;
				this.currentQuestion = this.questions[0];
				this.showQuestion(this.questions[0].id);
				this.questionIdSubscription = this.questionsService.questionIdSubject.subscribe((questionId: number) => {
					this.showQuestion(questionId);
				});
			}
		);
	}

	showQuestion(questionId: number): void {
		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				this.questions.forEach((question: Question) => {
					if (question.id === questionId) {
						this.currentQuestion = question;
					}
				})
			}
		});
		/* this.questions.forEach((question: Question) => {
			if (question.id === questionId) {
				this.currentQuestion = question;
			}
		}) */
		this.router.navigate([questionId], { relativeTo: this.route, queryParamsHandling: "merge" });
	}

	isActive(questionId: number): boolean {
		return questionId === this.currentQuestion.id;
	}

	isAnswered(question: Question): boolean {
		let answered = false;
		this.storeSubscription = this.store.select(selectQuestions).pipe().subscribe(
			store => {
				let questions = store.questions;
				const qInd = questions.findIndex(q => {
					return q.id === question.id;
				});
				let currentQuestion = questions[qInd];

				if (currentQuestion.inputType === "text") {
					answered = currentQuestion.options && currentQuestion.options[0] && currentQuestion.options[0].answer && currentQuestion.options[0].answer.trim().length > 0 ? true : false;
				} else {
					if (currentQuestion.options) {
						for (let i = 0; i < currentQuestion.options.length; i++) {
							const option = currentQuestion.options[i];
							if (option.isSelected) {
								answered = option.isSelected;
								break;
							}
						}
					}
				}
			}
		);

		return answered;
	}

	isReviewLater(question: Question): boolean {
		let reviewLater = false;
		this.storeSubscription = this.store.select(selectQuestions).pipe().subscribe(
			store => {
				let questions = store.questions;
				const qInd = questions.findIndex(q => {
					return q.id === question.id;
				});
				let currentQuestion = questions[qInd];
				reviewLater = currentQuestion.reviewlater;
			}
		);

		return reviewLater;
	}

	ngOnDestroy() {
		this.questionIdSubscription.unsubscribe();
	}

}
