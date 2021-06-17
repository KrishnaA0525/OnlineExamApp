import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoadingModalComponent } from "../modals/loading-modal/loading-modal.component";

import { Login } from "../model/login";
import { LoginService } from "../service/login.service";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    login = {
        hallticketNumber: undefined
    };
    errorMsg!: string;
    fetchingResponse: boolean = false;

    constructor(private router: Router, private loginService: LoginService, private matDialog: MatDialog) {}

    submitLogin(loginData: NgForm): void {
        this.openLoadingModal();
        this.fetchingResponse = true;
        this.errorMsg = "";
        this.loginService.getLoginDetails(+loginData.value.hallticketNumber).pipe(catchError((errorResponse: HttpErrorResponse) => {
            this.errorMsg = "Unable to Connect to the Server!";
            this.fetchingResponse = false;
            this.matDialog.closeAll();
            return throwError("Unable to Connect to the Server!");
        })).subscribe(
            (response: HttpResponse<Login>) => {
                this.fetchingResponse = false;
                this.matDialog.closeAll();
                if (+loginData.value.hallticketNumber === response.body?.hallticket) {
                    this.router.navigate(["testinfo"]);
                } else {
                    this.errorMsg = "Invalid Hallticket number. Please try again.";
                }
            }
        );
    }

    openLoadingModal() {
        this.matDialog.open(LoadingModalComponent, {
            width: "500px"
        });
    }
}