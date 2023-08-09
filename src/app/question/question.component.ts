import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../model/question.model';
import { FormArray, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() questions!: Question[];
  @Input() formArray: FormArray = this.fb.array([]);
  @Input() isResult!: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initFormArray();
  }

  getFormArrayControl(index: number): FormControl {
    return this.formArray.controls[index] as FormControl;
  }

  private initFormArray() {
    this.questions.forEach((q) => {
      this.formArray.push(
        this.fb.control(
           q.selectedAnswer,
          Validators.required
        )
      );
    });
  }
}
