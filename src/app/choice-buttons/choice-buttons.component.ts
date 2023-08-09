import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-choice-buttons',
  templateUrl: './choice-buttons.component.html',
  styleUrls: ['./choice-buttons.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChoiceButtonsComponent),
      multi: true,
    },
  ],
})
export class ChoiceButtonsComponent implements ControlValueAccessor {
  @Input() options!: string[];
  @Input() isResult!: boolean;
  @Input() correctAnswer!: string;
  value: string | null = null;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  selectOption(option: string): void {
    this.value = option;
    this.onChange(option);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
