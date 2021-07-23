import { trigger, style, transition, animate, query, stagger } from '@angular/animations';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Event, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';
import { delay, take } from 'rxjs/operators';

import { Question } from '../model/question';
import { QuestionsService } from '../service/questions.service';
import * as questionActions from './qp-store/questions.actions';
import { State } from './qp-store/questions.reducer';
import { questions, selectQuestions } from './qp-store/questions.selectors';

@Component({
	selector: 'app-question-panel',
	templateUrl: './question-panel.component.html',
	styleUrls: ['./question-panel.component.css'],
	animations: [
		trigger('questionTrigger', [
			/* state('start', style({
				opacity: 1,
				transform: 'translateX(0px)'
			})), */
			transition('void => *', [
				style({
					opacity: 0,
					transform: 'translateX(-20px)'
				}),
				animate(500)
			])
		]),
		trigger('optionTrigger', [
			/* state('start', style({
				opacity: 1,
				transform: 'translateX(0px)'
			})), */
			/* transition('void => *', [
				style({
					opacity: 0,
					transform: 'translateX(-70px)'
				}),
				animate(500)
			]) */
			transition('void => *', [
				query(':enter', [
					style({ opacity: 0 }),
					stagger('100ms', [
						style({ opacity: 0, transform: 'translateX(-50px)' }),
						//animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0px)' }))
						animate('500ms ease-out')
					])
				],
				{ optional: true })
			])
		])
	]
})
export class QuestionPanelComponent implements OnInit, OnDestroy {

	question!: Question;
	questionSubscription = new Subscription;
	questionLoaded = false;
	isLastQuestion = false;
	textAnswer: string = "";


	constructor(private questionsService: QuestionsService, private injector: Injector, private route: ActivatedRoute, private router: Router, private store: Store<State>) {
	}

	ngOnInit(): void {
		this.route.params.pipe(delay(500)).subscribe(
			(params: Params) => {
				var questionId = +params['id'];
				this.questionSubscription = this.store.select(selectQuestions).pipe(take(1)).subscribe(
					store => {
						let allQuestions = cloneDeep(store.questions);
						/* allQuestions.forEach((element: Question) => {
							if (element.id === questionId) {
								this.question = element;
							}
						}); */
						const qInd = allQuestions.findIndex(q => {
							return q.id === questionId;
						});
						this.question = allQuestions[qInd];
						if (this.question && this.question.id === allQuestions[allQuestions.length - 1]?.id) {
							this.isLastQuestion = true;
						} else {
							this.isLastQuestion = false;
						}
						this.questionLoaded = true;
					}
				);
				/* var allQuestions = this.questionsService.allQuestions;
				allQuestions.forEach((element: Question) => {
					if (element.id === questionId) {
						this.question = element;
					}
				});
				if (this.question && this.question.id === allQuestions[allQuestions.length - 1]?.id) {
					this.isLastQuestion = true;
				} else {
					this.isLastQuestion = false;
				}
				this.questionLoaded = true; */
			}
		);
		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				this.questionLoaded = false;
			}
		});
	}

	updateAnswer(inputType: string, questionId: number, optionId: number, answer: string): void {
		// let allQuestions = this.questionsService.allQuestions;

		if (inputType === "text") {
			this.question.options[0].answer = answer;
			this.store.dispatch(questionActions.updateAnswer({ question: cloneDeep(this.question) }));
		} else {
			for (let j = 0; j < this.question.options.length; j++) {
				const option = this.question.options[j];
				if (option.id === optionId) {
					option.isSelected = !option.isSelected;
				} else if (inputType === "radio") {
					option.isSelected = false;
				}
			}
			this.store.dispatch(questionActions.updateAnswer({ question: cloneDeep(this.question) }));
		}
	}

	onGetNextOrPrevious(id: number, isNext: boolean) {
		var allQuestions = this.questionsService.allQuestions;
		var curQuestionIndex = allQuestions.findIndex((question: Question) => {
			return id === question.id;
		})

		var nextOrPreviousIndex = isNext ? curQuestionIndex + 1 : curQuestionIndex - 1;
		var nextOrPreviousId = allQuestions[nextOrPreviousIndex]?.id;
		this.questionsService.questionIdSubject.next(nextOrPreviousId);
	}

	onReviewLater(question: Question) {
		if (question.reviewlater) {
			this.questionsService.inReviewCount--;
		} else {
			this.questionsService.inReviewCount++;
		}
		question.reviewlater = !question.reviewlater;
		this.store.dispatch(questionActions.updateAnswer({ question: cloneDeep(this.question) }));
	}

	onSubmit(): void {
		this.router.navigate(["results"]);
	}

	ngOnDestroy(): void {
		this.questionSubscription.unsubscribe();
	}

}
