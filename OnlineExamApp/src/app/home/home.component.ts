import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { Question } from '../model/question';

import { QuestionsService } from '../service/questions.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private activatedRoute: ActivatedRoute, private questionsService: QuestionsService, private router: Router) { }

	ngOnInit(): void {
		this.questionsService.allQuestions = this.activatedRoute.snapshot.data.questions[0] ? this.activatedRoute.snapshot.data.questions[0] : [];
		var qstns = this.questionsService.allQuestions;
	}

}
