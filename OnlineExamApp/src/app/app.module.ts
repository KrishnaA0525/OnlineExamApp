import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from './modals/modal.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TestInfoComponent } from './test-info/test-info.component';
import { HomeComponent } from './home/home.component';
import { QuestionNumbersComponent } from './question-numbers/question-numbers.component';
import { QuestionPanelComponent } from './question-panel/question-panel.component';
import { BtnHighlightDirective } from './directives/btn-highlight.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestInfoComponent,
    HomeComponent,
    QuestionNumbersComponent,
    QuestionPanelComponent,
    ResultsComponent,
    BtnHighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
