import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AgGridModule } from 'ag-grid-angular';
import { ResultsComponent } from './results/results.component';
import { QuestionsService } from './service/questions.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { TimeFormatterPipe } from './pipes/time-formatter.pipe';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './question-panel/qp-store/questions.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestInfoComponent,
    HomeComponent,
    QuestionNumbersComponent,
    QuestionPanelComponent,
    ResultsComponent,
    BtnHighlightDirective,
    HeaderComponent,
    TimeFormatterPipe,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule,
    AgGridModule.withComponents([]),
    MatDialogModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ questions: reducer })
  ],
  providers: [
    QuestionsService
    /* { provide: "QuestionsService", useClass: QuestionsService } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
