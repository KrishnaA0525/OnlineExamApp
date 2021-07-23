import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./questions.reducer";

export const questions = (state: State) => { return state.questions };
export const qqq = createFeatureSelector<State>("questions");
export const selectQuestions = createSelector(
	qqq,
	questionss => { return questionss }
);

