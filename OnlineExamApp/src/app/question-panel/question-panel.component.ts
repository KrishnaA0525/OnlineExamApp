import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Question } from '../model/question';
import { QuestionsService } from '../service/questions.service';

@Component({
	selector: 'app-question-panel',
	templateUrl: './question-panel.component.html',
	styleUrls: ['./question-panel.component.css'],
	animations: [
		trigger('questionTrigger', [
			state('start', style({
				opacity: 1,
				transform: 'translateX(0px)'
			})),
			transition('void => *', [
				style({
					opacity: 0,
					transform: 'translateX(-20px)'
				}),
				animate(500)
			])
		]),
		trigger('optionTrigger', [
			state('start', style({
				opacity: 1,
				transform: 'translateX(0px)'
			})),
			transition('void => *', [
				style({
					opacity: 0,
					transform: 'translateX(-70px)'
				}),
				animate(500)
			])
		])
	]
})
export class QuestionPanelComponent implements OnInit, OnDestroy {

	question!: Question;
	questionSubscription = new Subscription;
	questionLoaded = false;
	isLastQuestion = false;

	constructor(private questionsService: QuestionsService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit(): void {
		this.route.params.pipe(delay(800)).subscribe(
			(params: Params) => {
				var questionId = +params['id'];
				var allQuestions = this.questionsService.allQuestions;
				allQuestions.forEach((element: Question) => {
					if (element.id === questionId) {
						this.question = element;
					}
				});
				if (this.question.id === allQuestions[allQuestions.length - 1]?.id) {
					this.isLastQuestion = true;
				} else {
					this.isLastQuestion = false;
				}
				this.questionLoaded = true;
				/* this.questionSubscription = this.questionsService.getQuestion(questionId).subscribe(
				  data => {
					data.questionsDetails.forEach((element: Question) => {
					  if (element.id === questionId) {
						//this.questionsService.questionSubject.next(element);
						this.question = element;
					  }
					  this.questionLoaded = true;
					});
				  }
				); */
			}
		);
		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				this.questionLoaded = false;
			}
		});
	}

	isOptionEmpty(val: any): boolean {
		return typeof val !== "undefined" ? true : false;
	}

	updateAnswer(inputType: string, questionId: number, optionId: number, answer: string): void {
		var allQuestions = this.questionsService.allQuestions;
		allQuestions.forEach((question: Question) => {
			if (question && (question.id === questionId) && question.options) {
				if (inputType === "text") {
					question?.options ? question.options[optionId].answer = answer : "";
				} else {
					for (let j = 0; j < question.options.length; j++) {
						const option = question.options[j];
						if (option.id === optionId) {
							option.isSelected = !option.isSelected;
						} else if (inputType === "radio") {
							option.isSelected = false;
						}
					}
				}
			}
		});
	}

	onGetNextOrPrevious(id: number, isNext: boolean) {
		var allQuestions = this.questionsService.allQuestions;
		var curQuestionIndex = allQuestions.findIndex(question => {
			return id === question.id;
		})

		var nextOrPreviousIndex = isNext ? curQuestionIndex + 1 : curQuestionIndex - 1;
		var nextOrPreviousId = allQuestions[nextOrPreviousIndex]?.id;
		this.questionsService.questionIdSubject.next(nextOrPreviousId);
	}

	onSubmit(): void {
		this.router.navigate(["results"]);
	}

	ngOnDestroy(): void {
		this.questionSubscription.unsubscribe();
	}

}
