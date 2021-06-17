import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Question } from "src/app/model/question";
import { QuestionsService } from "../questions.service";

@Injectable({
    providedIn: 'root'
})
export class QuestionsResolver implements Resolve<Question[]> {
    allQuestions: Question[] = [];

    constructor (private questionsService: QuestionsService) {}

    resolve(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<Question[]> | Promise<Question[]> | Question[] {
        var forkJoinList = [];
        var res1 =  this.questionsService.getAllQuestions().pipe(
            tap((data) => {
                /* if (data.questionsDetails.length > 3) {
                    throw new TypeError(`Value ${data.questionsDetails.length} is greater than 3`)
                } */
            }),
            map((data) => {
                for (let ind = 0; ind < data.length; ind++) {
                    let question = data[ind];
                    for (let ind2 = 0; ind2 < question.options.length; ind2++) {
                        question.options[ind2].isSelected = false;
                    }
                }
                return data;
        }))
        forkJoinList.push(res1);
        var res2 = this.questionsService.getAllQuestions()
        return forkJoin(forkJoinList);
    }
}