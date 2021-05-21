import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Data } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Answer } from "../model/answer";

@Injectable({
	providedIn: "root"
})
export class AnswerService {
	constructor (private http: HttpClient) {}

	getAnswers(): Observable<any> {
		let answers: Answer[] = [];
		return this.http.get("http://localhost:8082/answerservice/getallanswers").pipe(
			map((data: Data) => {
				if (data) {
					for (let index = 0; index < data.length; index++) {
						const ans = data[index];
						let res = data.filter((obj: { questionId: any; }) => {
							return ans.questionId === obj.questionId;
						});
						let ansList: string[] = [];
						for (let ind = 0; ind < res.length; ind++) {
							ansList.push(res[ind].answer);
						}
						
						answers.push({
							id: ans.id,
							questionId: ans.questionId,
							answers: ansList
						});
					}
				}
				return answers;
			})
		);
	}
}