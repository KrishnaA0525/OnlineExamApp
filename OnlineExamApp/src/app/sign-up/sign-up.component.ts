import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

	signupForm!: FormGroup;
	gender: string = "male";
	constructor() { }

	ngOnInit(): void {
		this.signupForm = new FormGroup({
			name: new FormControl(null, Validators.required),
			email: new FormControl(null, [Validators.required, Validators.email]),
			mobile: new FormControl(null),
			dob: new FormControl(null),
			gender: new FormControl("male")
		})
	}

	onSignupSubmit() {
		console.log(this.signupForm);
	}

}
