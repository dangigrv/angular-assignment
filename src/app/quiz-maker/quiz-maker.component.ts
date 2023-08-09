import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { TriviaCategory } from '../model/category.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Question } from '../model/question.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.scss'],
})
export class QuizMakerComponent implements OnInit, OnDestroy {
  categories: TriviaCategory[] = [];

  difficulties = [{
    label: 'Easy',
    value:'easy'
  },
  {
    label: 'Medium',
    value:'medium'
  },
  {
    label: 'Hard',
    value:'hard'
  }];

  quizForm = this.fb.group({
    category: [null, Validators.required],
    difficulty: [null, Validators.required],
  });
  questions: Question[] = [];

  formArray = this.fb.array([]);
  private subscription!: Subscription;
  constructor(
    private quizService: QuizService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.quizService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  create() {
    const { category, difficulty } = this.quizForm.value;
    this.quizService.getQuestions(category, difficulty).subscribe((res) => {
      this.questions = res;
    });
  }

  submit() {
    const result = this.questions.map((q, i) => {
      return {
        ...q,
        selectedAnswer: this.formArray.value[i],
      } as Question;
    });
    this.quizService.result$.next(result);
    this.router.navigate(['result']);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
}

}
