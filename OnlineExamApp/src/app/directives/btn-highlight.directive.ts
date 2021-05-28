import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
	selector: '[appBtnHighlight]'
})
export class BtnHighlightDirective implements OnInit {

	constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
	
	@Input() set btnActiveColor(active: boolean) {
		if (active) {
			this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "rgb(240, 215, 182)");
		} else {
			this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "");
		}
	}
	@Input() set btnAnsweredColor(answered: boolean) {
		if (answered) {
			this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "rgb(106, 202, 10)");
		}
	}
	@Input() set btnReviewColor(review: boolean) {
		if (review) {
			this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "orange");
		}
	}

	ngOnInit() {
	}
}