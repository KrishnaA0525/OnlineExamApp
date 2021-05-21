import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Question } from "../model/question";

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {
    allQuestions: Question[] = [];
    allQuestionsSub = new Subject<Question[]>();
    questionSubject = new Subject<Question>();
    updateAnsSubject = new Subject<any>();
    questionIdSubject = new Subject<number>();

    constructor (private httpClient: HttpClient) {}

    getAllQuestions() {
        //return this.httpClient.get<any>('assets/mocks/mockGetAllQuestionsDetails.json');
        return this.httpClient.get<any>('http://localhost:8082/questionsservice/allquestions');
    }

    getQuestion(id: number): Observable<any> {
        return this.getAllQuestions();
    }
}