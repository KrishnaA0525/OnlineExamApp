import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "timeFormatter"
})
export class TimeFormatterPipe implements PipeTransform {
	transform(timeInput: number): string {
		if (timeInput.toString().length === 2) {
			return timeInput.toString();
		} else {
			return "0" + timeInput;
		}
	}
}