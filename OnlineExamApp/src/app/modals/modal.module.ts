import { NgModule } from "@angular/core";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from "@angular/platform-browser";
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { LoadingModalComponent } from './loading-modal/loading-modal.component';

@NgModule({
	declarations: [
		ConfirmationModalComponent,
		LoadingModalComponent
	],
	imports: [
		BrowserModule,
		MatDialogModule,
		MatIconModule
	],
	exports: [
		ConfirmationModalComponent,
		LoadingModalComponent
	]
})
export class ModalModule { }