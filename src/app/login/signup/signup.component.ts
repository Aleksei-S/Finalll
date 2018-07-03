import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private errorMessage: string;
  private signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.signupForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z][a-zA-Z0-9._]+$/)]
      ],
      photoUrl: ['https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png'],
      password: ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z][a-zA-Z0-9._]+$/)]
      ]
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.signupForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit() {
    const controls = this.signupForm.controls;
    if (this.signupForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    ///////// * Обработка данных формы * //////////
    console.log(this.signupForm.value);
    this.loginService.signup(this.signupForm.value)
    .subscribe(
      (results: any) => {
        if (!!results.success) {
          console.log('success');
        } else {
          this.errorMessage = results.message;
        }
        console.log(results);
      });
  }







}
