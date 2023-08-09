import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category, TriviaCategory } from './model/category.model';
import { HttpClient } from '@angular/common/http';
import { Question, QuestionRes } from './model/question.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  result$ = new BehaviorSubject<Question[]>([]);
  constructor(private http: HttpClient) {}

  getCategories(): Observable<TriviaCategory[]> {
    return this.http
      .get<Category>('https://opentdb.com/api_category.php')
      .pipe(map((res) => res.trivia_categories));
  }

  getQuestions(
    category: number | null | undefined,
    difficulty: string | null | undefined
  ): Observable<Question[]> {
    return this.http
      .get<QuestionRes>(
        `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
      )
      .pipe(
        map((res) =>
          (res.results || []).map((r) => ({
            ...r,
            answers: [...r.incorrect_answers, r.correct_answer].sort(
              () => 0.5 - Math.random()
            ),
          }))
        )
      );
  }
}
