import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { HttpClientModule } from  '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChoiceButtonsComponent } from './choice-buttons/choice-buttons.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizMakerComponent,
    QuizResultComponent,
    ChoiceButtonsComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
