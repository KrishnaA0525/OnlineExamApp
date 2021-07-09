import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { QuestionPanelComponent } from './question-panel/question-panel.component';
import { ResultsComponent } from './results/results.component';
import { QuestionsDeactivateGaurd } from './service/gaurds/questions-deactivate.gaurd';
import { ResultsDeactivateGaurd } from './service/gaurds/results-deactivate.gaurd';
import { QuestionsResolver } from './service/resolver/questions-resolver.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TestInfoComponent } from './test-info/test-info.component';


const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignUpComponent
    },
    {
        path: "testinfo",
        component: TestInfoComponent
    },
    {
        path: "home",
        component: HomeComponent,
        resolve: {
            questions: QuestionsResolver
        },
        canDeactivate: [QuestionsDeactivateGaurd],
        children: [
            {
                path: ":id",
                component: QuestionPanelComponent
            }/* ,
            {
                path: "",
                redirectTo: "/:id",
                pathMatch: "full"
            } */
        ]
    },
    {
        path: "results",
        component: ResultsComponent,
        canDeactivate: [ResultsDeactivateGaurd]
    },
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
