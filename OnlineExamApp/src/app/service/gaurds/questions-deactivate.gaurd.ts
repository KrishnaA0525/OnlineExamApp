import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ConfirmationModalComponent } from "../../modals/confirmation-modal/confirmation-modal.component";
import { QuestionPanelComponent } from "../../question-panel/question-panel.component";
import { QuestionsService } from "../questions.service";

@Injectable({
	providedIn: "root"
})
export class QuestionsDeactivateGaurd implements CanDeactivate<QuestionPanelComponent> {

	constructor(private matDialog: MatDialog, private router: Router, private questionsService: QuestionsService) {}

	canDeactivate(component: QuestionPanelComponent, activatedRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
		if (this.questionsService.isAutoSubmit) {
			return true;
		}
		return new Promise<boolean>((resolve, reject) => {
			this.matDialog.open(ConfirmationModalComponent, {
				data: {
					reviewCount: this.questionsService.inReviewCount,
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