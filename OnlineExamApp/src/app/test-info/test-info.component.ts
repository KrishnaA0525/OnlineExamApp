import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: '.app-test-info',
    templateUrl: 'test-info.component.html',
    styleUrls: ['test-info.component.css']
})
export class TestInfoComponent {
    readInstrutions: boolean = false;

    constructor(private router: Router) {}

    continue() {
        this.router.navigate(["home"]);
    }
}