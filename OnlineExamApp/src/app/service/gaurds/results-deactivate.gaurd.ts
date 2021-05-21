import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";

export interface ResultsDeactivateInterface {
	canResultsRouteDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
	providedIn: "root"
})
export class ResultsDeactivateGaurd implements CanDeactivate<ResultsDeactivateInterface> {
	canDeactivate(component: ResultsDeactivateInterface) {
		return component.canResultsRouteDeactivate();
	};
}