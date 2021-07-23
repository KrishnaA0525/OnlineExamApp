import { createAction, props } from "@ngrx/store";

import { Question } from "src/app/model/question";

const INIT_QUESTIONS = "INIT_QUESTIONS";
const UPDATE_ANSWER = "UPDATE_ANSWER";

/* export class UpdateAnswer implements Action {
	readonly type = UPDATE_ANSWER;
	payload: Answer = {
		id: 0,
		questionId: 0,
		answers: []
	}
} */

export const initializeQuestions = createAction(INIT_QUESTIONS, props<{questions: Question[]}>());
export const updateAnswer = createAction(UPDATE_ANSWER, props<{ question: Question }>());