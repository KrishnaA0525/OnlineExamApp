import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
	selector: '[appBtnHighlight]'
})
export class BtnHighlightDirective implements OnInit {

	constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
	
	@Input() set btnActive(active: boolean) {
		if (active) {
			this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "rgb(240, 215, 182)");
		} else if (!this.btnR) {
			this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "");
		}
	}
	@Input() set btnAnswered(answered: boolean) {
		if (answered && !this.btnR) {
			this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "rgb(106, 202, 10)");
		}
	}
	/* @Input() set btnReview(review: boolean) {
		if (review) {
			this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "orange");
		}
	} */

	btnR: boolean = false;
	@Input() set btnReview(review: boolean) {
		this.btnR = review;
		if (review) {
			this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "orange");
		}
	}

	ngOnInit() {
	}
}