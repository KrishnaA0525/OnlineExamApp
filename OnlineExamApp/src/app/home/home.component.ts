import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Question } from '../model/question';
import { initializeQuestions } from '../question-panel/qp-store/questions.actions';

import { QuestionsService } from '../service/questions.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private activatedRoute: ActivatedRoute, private questionsService: QuestionsService, private router: Router, private store: Store) { }

	ngOnInit(): void {
		this.questionsService.allQuestions = this.activatedRoute.snapshot.data.questions[0] ? this.activatedRoute.snapshot.data.questions[0] : [];
		this.store.dispatch(initializeQuestions({ questions: [...this.activatedRoute.snapshot.data.questions[0] ]}));
	}

}
