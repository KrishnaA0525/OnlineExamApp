import { Action, createReducer, on } from "@ngrx/store";
import { Answer } from "src/app/model/answer";
import { Question } from "src/app/model/question";

import * as QuestionsActions from "./questions.actions"

export interface State {
	questions: Question[]
}

const initialState: State = {
	questions: []
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
		const question = state.questions[payload.questionIndex];
		const updatedQuestion = {
			...question,
			...payload.question
		};
		const updatedQuestions = [...state.questions];
		updatedQuestions[payload.questionIndex] = updatedQuestion;
		return {
			...state,
			questions: updatedQuestions
		};
	}));

export function reducer(state: State = initialState, action: Action) {
	return questionsReducer(state, action);
}