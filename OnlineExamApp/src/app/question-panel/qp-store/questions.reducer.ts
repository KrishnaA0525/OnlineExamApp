import { Action, createReducer, on } from "@ngrx/store";
import { Question } from "src/app/model/question";

import * as QuestionsActions from "./questions.actions"

export interface State {
	questions: Question[],
	abc: number
}

const initialState: State = {
	questions: [],
	abc: 0
};

/* export function questionsReducer(state: State = initialState, action: Action) {
	switch(action.type) {
		case QuestionsActions.UPDATE_ANSWER:
			return {
				...state,
				questions: [...state.questions, action]
			};
		default:
			return state;
	}
} */

const questionsReducer = createReducer(
	initialState,
	on(QuestionsActions.initializeQuestions, (state, payload) => {
		return {
			...state,
			questions: payload.questions
		};
	}),
	on(QuestionsActions.updateAnswer, (state, payload) => {
		const questionIndex = state.questions.findIndex(q => {
			return q.id === payload.question.id;
		});
		const question = state.questions[questionIndex];
		const updatedQuestion = {
			...question,
			...payload.question
		};
		const updatedQuestions = [...state.questions];
		updatedQuestions[questionIndex] = updatedQuestion;
		return {
			...state,
			questions: updatedQuestions
		};
	}));

export function reducer(state: State = initialState, action: Action) {
	return questionsReducer(state, action);
}