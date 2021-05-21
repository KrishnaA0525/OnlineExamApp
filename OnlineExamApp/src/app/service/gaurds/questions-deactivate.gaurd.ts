import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { of } from "rxjs";
import { ConfirmationModalComponent } from "../../modals/confirmation-modal/confirmation-modal.component";

import { QuestionPanelComponent } from "../../question-panel/question-panel.component";

@Injectable({
	providedIn: "root"
})
export class QuestionsDeactivateGaurd implements CanDeactivate<QuestionPanelComponent> {

	constructor(private matDialog: MatDialog, private router: Router) {}

	canDeactivate(component: QuestionPanelComponent, activatedRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
		return new Promise<boolean>((resolve, reject) => {
			this.matDialog.open(ConfirmationModalComponent, {
				data: {
					message: "Do you want to Submit?",
					redirect: () => {
						resolve(true);
					}
				},
				width: "500px",
				disableClose: true
			});
		});
	}
}