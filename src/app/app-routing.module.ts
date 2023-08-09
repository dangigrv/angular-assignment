import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';

const routes: Routes = [
  {
    path: 'maker',
    component: QuizMakerComponent,
  },
  {
    path: 'result',
    component: QuizResultComponent,
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'maker',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
