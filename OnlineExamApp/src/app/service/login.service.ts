import { HttpClient, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Login } from "../model/login";

@Injectable({
	providedIn: "root"
})
export class LoginService {

	constructor(private http: HttpClient) {}

	getLoginDetails(hallticketNumber: number): any {
		let loginReq = {
			hallticket: hallticketNumber
		};
		return this.http.post<Login>("http://localhost:8082/loginservice/login", loginReq, {
			observe: "response"
		});
	}
}