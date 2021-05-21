import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'; 
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
	declarations: [
		ConfirmationModalComponent
	],
	imports: [
		MatDialogModule,
		MatIconModule
	],
	exports: [
		ConfirmationModalComponent
	]
})
export class ModalModule { }