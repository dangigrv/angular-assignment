import { Component, OnDestroy, OnInit } from '@angular/core';
import { Question } from '../model/question.model';
import { QuizService } from '../quiz.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit, OnDestroy {
  questions!: Question[];
  correctAnswers = 0;
  private subscription!: Subscription
  constructor(private quiz: QuizService, private router: Router) {}

  ngOnInit(): void {
   this.subscription = this.quiz.result$.subscribe((res) => {
      this.questions = res;
      if(!res.length) {
        this.router.navigate(['maker']);
      } else {
        res.forEach((r) => {
          if (r.selectedAnswer === r.correct_answer) {
            ++this.correctAnswers;
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
