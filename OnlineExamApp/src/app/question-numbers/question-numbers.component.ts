import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { Question } from '../model/question';
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

	constructor(private questionsService: QuestionsService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.questions = this.questionsService.allQuestions;
		this.currentQuestion = this.questions[0];
		this.showQuestion(this.questions[0].id);
		this.questionIdSubscription = this.questionsService.questionIdSubject.subscribe((questionId: number) => {
			this.showQuestion(questionId);
		});
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
		if (question.inputType === "text") {
			answered = question.options && question.options[0] && question.options[0].answer && question.options[0].answer.trim().length > 0 ? true : false;
		} else {
			if (question.options) {
				for (let i = 0; i < question.options.length; i++) {
					const option = question.options[i];
					if (option.isSelected) {
						answered = option.isSelected;
						break;
					}
				}				
			}
		}

		return answered;
	}

	ngOnDestroy() {
		this.questionIdSubscription.unsubscribe();
	}

}
