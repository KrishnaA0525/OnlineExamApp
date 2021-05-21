import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Answer } from '../model/answer';

import { Question } from '../model/question';
import { AnswerService } from '../service/answer.service';
import { ResultsDeactivateInterface } from '../service/gaurds/results-deactivate.gaurd';
import { QuestionsService } from '../service/questions.service';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy, ResultsDeactivateInterface {

	allQuestions: Question[] = [];
	answers: Answer[] = [];
	canRedirectAway = false;
	showGrid = false;
	columnDefs = [
		{ field: 'question', headerName: "Question", width: 500 },
		{ field: 'actualAnswer', headerName: "Actual Answer(s)" },
		{ field: 'yourAnswer', headerName: "Your Answer(s)" },
		{ field: 'marks', headerName: "Marks" }
	];
	rowData: any = [];
	gridApi: any;
	gridColumnApi: any;
	defaultColDefs: any = {
		resizable: true,
		wrapText: true,
		autoHeight: true
	};

	constructor(private questionsService: QuestionsService, private router: Router, private answerService: AnswerService) { }

	ngOnInit(): void {
		console.log(1);
		this.allQuestions = this.questionsService.allQuestions;
		this.answerService.getAnswers().subscribe((data: Answer[]) => {
			this.answers = data;
			console.log(2);
			console.log(this.allQuestions.length);
			this.allQuestions.forEach(question => {
				console.log(3);
				let row = {
					question: question.num + " " + question.question,
					actualAnswer: "",
					yourAnswer: "",
					marks: ""
				};
				this.rowData.push(row);
			});
			this.showGrid = true;
		});
	}

	onGridReady(params: any) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
	}

	continue() {
		this.canRedirectAway = true;
		this.router.navigate(["home"]);
	}

	canResultsRouteDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.canRedirectAway) {
			alert("Cannot go back!");
		}
		return this.canRedirectAway;
	}

	ngOnDestroy() {
		this.canRedirectAway = false;
		this.showGrid = false;
	}

}
