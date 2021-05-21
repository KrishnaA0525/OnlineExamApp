import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Data, Router } from "@angular/router";
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

    constructor(private router: Router, private loginService: LoginService) {}

    submitLogin(loginData: NgForm): void {

        this.loginService.getLoginDetails(+loginData.value.hallticketNumber).subscribe(
            (data: Login) => {
                if (+loginData.value.hallticketNumber === data?.hallticket) {
                    this.router.navigate(["testinfo"]);
                } else {
                    this.errorMsg = "Invalid Hallticket number. Please try again.";
                }
            }
        );
    }
}